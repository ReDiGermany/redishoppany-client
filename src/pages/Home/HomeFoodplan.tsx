import React, { Component } from 'react'
import {
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

export default class Foodplan extends Component<
  IPageProps,
  IFoodplanPageState
> {
  state = {
    plan: [],
    recipes: [],
    refreshing: false,
    isTop: true,
    redirect: '',
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
    const plan = await APIFoodplan.list()
    const recipes = await APIRecipe.list()
    this.setState({ plan, recipes })
    await AsyncStorage.setItem('recipeList', JSON.stringify(recipes))
    await AsyncStorage.setItem('foodplanList', JSON.stringify(plan))
  }

  remove(item: IFoodplanItem) {
    ;(async () => {
      await APIFoodplan.remove(item.id)
      const { plan } = this.state
      plan.forEach((itm: IFoodplanItem, idx) => {
        if (itm.id === item.id) plan.splice(idx, 1)
      })
      this.setState({ plan })
    })()
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const nextDay = this.state.plan.length
      ? this.state.plan[this.state.plan.length - 1]
      : Language.get('tomorrow')

    const buttons = [
      {
        icon: 'plus',
        name: 'add',
        onClick: () => {
          console.log('add')
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

    return (
      <View>
        <Navigation
          solid={this.state.isTop}
          label={Language.get('foodlist')}
          simple={true}
          buttons={buttons}
        />
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
          {this.state.plan.map((item: IFoodplanItem) => (
            <Moveable
              key={item.id}
              onDelete={() => this.remove(item)}
              prefix={item.date}
              name={item.recipe.name}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
