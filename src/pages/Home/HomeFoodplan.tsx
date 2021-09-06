import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IPageProps from '../../interfaces/IPageProps'
import APIFoodplan from '../../helper/API/APIFoodplan'
import IFoodplanItem from '../../interfaces/IFoodplanItem'
import IFoodplanPageState from '../../interfaces/IFoodplanPageState'
import { RedirectIfPossible } from '../../Router/react-router'
import IFoodplanKw from '../../interfaces/IFoodplanKw'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import PhoneNotConnected from '../../components/PhoneNotConnected'
import AnonAlert from '../../components/AnonAlert'
import InfoMoveable from '../../components/Moveable/InfoMoveable'
import HomeNavigation from '../../components/HomeNavigation'
import HomeFoodplanItem from '../../components/HomeFoodplanItem'

export default class Foodplan extends SafeComponent<
  IPageProps,
  IFoodplanPageState
> {
  state: IFoodplanPageState = {
    plan: [],
    refreshing: false,
    suspendFirstRefresh: false,
    isTop: false,
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

  async refresh() {
    this.setState({ refreshing: true })
    APIFoodplan.list(plan => {
      this.setState({ plan })
      AsyncStorage.setItem('foodplanList', JSON.stringify(plan))
      this.setState({ refreshing: false, suspendFirstRefresh: true })
    })
  }

  render() {
    return (
      <View>
        <RedirectIfPossible to={this.state.redirect} />
        <HomeNavigation
          user={this.props.user}
          isTop={this.state.isTop}
          name="foodlist"
          buttons={[
            {
              icon: 'plus',
              name: 'add',
              onClick: () => {
                this.setState({ redirect: '/foodplan/add' })
              },
            },
          ]}
        />
        <ScrollView
          hasBottomBar={true}
          hasNavi={true}
          refreshing={this.state.refreshing && this.state.suspendFirstRefresh}
          onRefresh={() => this.refresh()}
          notTop={isTop => this.setState({ isTop })}
        >
          <PhoneNotConnected connected={this.props.connected} />
          <AnonAlert user={this.props.user} />
          <InfoMoveable
            show={this.state.plan.length === 0}
            name="OOPs! Hier scheint nichts zu sein!"
          />
          {this.state.plan.map(kw => (
            <HomeFoodplanItem
              remove={async item => this.remove(item)}
              key={kw.name}
              kw={kw}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
