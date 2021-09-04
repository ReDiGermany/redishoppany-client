import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moveable from '../../components/Moveable/Moveable'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import Language from '../../language/Language'
import APIFoodplan from '../../helper/API/APIFoodplan'
import IFoodplanItem from '../../interfaces/IFoodplanItem'
import IFoodplanPageState from '../../interfaces/IFoodplanPageState'
import { Redirect } from '../../Router/react-router'
import ListHeader from '../../ListHeader'
import IFoodplanKw from '../../interfaces/IFoodplanKw'
import IMoveableProps from '../../interfaces/IMoveableProps'
import INavigationPropsButton from '../../interfaces/INavigationPropsButton'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import GlobalStyles from '../../styles/GlobalStyles'
import PhoneNotConnected from '../../components/PhoneNotConnected'

// TODO: Add recipe to cart
export default class Foodplan extends SafeComponent<
  IPageProps,
  IFoodplanPageState
> {
  state: IFoodplanPageState = {
    plan: [],
    refreshing: false,
    suspendFirstRefresh: false,
    isTop: true,
    redirect: '',
    item: undefined,
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const plan = await AsyncStorage.getItem('foodplanList')
      if (plan !== null) this.setState({ plan: JSON.parse(plan) })
    })()
  }

  async componentDidMount() {
    await this.refresh()
  }

  remove(item: IFoodplanItem) {
    ;(async () => {
      await APIFoodplan.remove(item.id)
      const { plan } = this.state
      plan.forEach((grp: IFoodplanKw, gidx) => {
        grp.items.forEach((itm: IFoodplanItem, idx) => {
          if (itm.id === item.id) plan.splice(idx, 1)
        })
        if (grp.items.length === 0) plan.splice(gidx, 1)
      })
      this.setState({ plan })
      await this.refresh()
    })()
  }

  parseDate(date: string) {
    return Language.get(
      ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'][
        new Date(date).getDay()
      ].toLowerCase()
    )
  }

  async refresh() {
    this.setState({ refreshing: true })
    const plan = await APIFoodplan.list()
    this.setState({ plan })
    await AsyncStorage.setItem('foodplanList', JSON.stringify(plan))
    this.setState({ refreshing: false, suspendFirstRefresh: true })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const buttons: INavigationPropsButton[] = [
      {
        icon: 'plus',
        name: 'add',
        onClick: () => {
          this.setState({ redirect: '/foodplan/add' })
        },
      },
    ]
    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        badge: {
          color: '#900000',
          text: this.props.user?.notificationCount.toString(),
        },
      })

    const currentDate = new Date()

    return (
      <View>
        <Navigation
          solid={this.state.isTop}
          label={Language.get('foodlist')}
          simple={true}
          buttons={buttons}
        />
        <ScrollView
          hasBottomBar={true}
          hasNavi={true}
          refreshing={this.state.refreshing && this.state.suspendFirstRefresh}
          onRefresh={() => this.refresh()}
          isTop={isTop => this.setState({ isTop })}
        >
          <PhoneNotConnected connected={this.props.connected} />
          {this.state.plan.length === 0 && (
            <Moveable
              name="OOPs! Hier scheint nichts zu sein!"
              large={true}
              centerText={true}
              boldText={true}
              disabled={true}
            />
          )}
          {this.state.plan.map((kw: IFoodplanKw) => (
            <View key={kw.name}>
              <ListHeader
                color="#111111"
                text={`KW ${kw.name.split('-')[1]}`}
              />
              {kw.items.map((item: IFoodplanItem, idx) => {
                if (item.recipe === null) {
                  return (
                    <Moveable
                      key={`add_${item.date}`}
                      name={`ADD RECIPE for ${this.parseDate(item.date)}`}
                      centerText={true}
                      boldText={true}
                    />
                  )
                }

                const mbuttons: any[] = []

                if (!item.inCart)
                  mbuttons.push({
                    color: GlobalStyles().color.accent,
                    icon: 'shopping-basket',
                    name: 'cart',
                    onPress: () => {
                      this.setState({ item })
                      // APIFoodplan.addToCart(item.id)
                    },
                  })
                const disabled = new Date(item.date) < currentDate
                if (disabled) mbuttons.splice(0)

                const moveable: IMoveableProps = {
                  onDelete: undefined,
                  prefix: this.parseDate(item.date),
                  name: item.recipe.name ?? '?',
                  last: idx === kw.items.length - 1,
                  buttons: mbuttons,
                  disabled,
                }

                if (!disabled) {
                  moveable.onDelete = () => this.remove(item)
                }

                return <Moveable key={item.id} {...moveable} />
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}
