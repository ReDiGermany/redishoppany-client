import React, { Component } from 'react'
import {
  RefreshControl,
  // RefreshControl, SafeAreaView,
  ScrollView,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moveable from '../../components/Moveable/Moveable'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import Language from '../../language/Language'
import APIFoodplan from '../../helper/API/APIFoodplan'
import IFoodplanItem from '../../interfaces/IFoodplanItem'
import APIRecipe from '../../helper/API/APIRecipe'
import IFoodplanPageState from '../../interfaces/IFoodplanPageState'
import { Redirect } from '../../Router/react-router'
import ListHeader from '../../ListHeader'
import IFoodplanKw from '../../interfaces/IFoodplanKw'
import IMoveableProps from '../../interfaces/IMoveableProps'

export default class Foodplan extends Component<
  IPageProps,
  IFoodplanPageState
> {
  state: IFoodplanPageState = {
    plan: [],
    recipes: [],
    refreshing: false,
    isTop: true,
    redirect: '',
    item: undefined,
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const plan = await AsyncStorage.getItem('foodplanList')
      if (plan !== null) this.setState({ plan: JSON.parse(plan) })

      const recipes = await AsyncStorage.getItem('recipeList')
      if (recipes !== null) this.setState({ recipes: JSON.parse(recipes) })
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
    return ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'][new Date(date).getDay()]
  }

  async refresh() {
    this.setState({ refreshing: true })
    const plan = await APIFoodplan.list()
    const recipes = await APIRecipe.list()
    this.setState({ plan, recipes })
    await AsyncStorage.setItem('recipeList', JSON.stringify(recipes))
    await AsyncStorage.setItem('foodplanList', JSON.stringify(plan))
    // console.log(plan)
    this.setState({ refreshing: false })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const buttons = [
      {
        icon: 'plus',
        name: 'add',
        onClick: () => {
          // console.log('add')
          this.setState({ redirect: '/foodplan/add' })
        },
      },
    ]
    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        // @ts-ignore
        badge: { color: '#900000', text: this.props.user?.notificationCount },
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
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => this.refresh()}
        >
          <ScrollView
            onScroll={e =>
              this.setState({
                isTop: e.nativeEvent.contentOffset.y <= 0,
              })
            }
            style={{
              height: GlobalStyles().contentHeight - GlobalStyles().barHeight,
            }}
          >
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

                  if (idx === 1)
                    mbuttons.push({
                      color: '#80dfad',
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
        </RefreshControl>
      </View>
    )
  }
}
