import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native'
import BottomBox from '../BottomBox'
import Moveable from '../components/Moveable/Moveable'
import APIFoodplan from '../helper/API/APIFoodplan'
import APIShareFoodplan from '../helper/API/APIShareFoodplan'
import IFoodplanPlan from '../interfaces/IFoodplanPlan'
import IPageProps from '../interfaces/IPageProps'
import Language from '../language/Language'
import ListHeader from '../ListHeader'
import Navigation from '../Navigation'
import { Redirect } from '../Router/react-router'
import GlobalStyles from '../styles/GlobalStyles'
import ISettingsState from '../interfaces/ISettingsState'
import SafeComponent from '../components/SafeComponent'

// TODO: fill content!
// TODO: Active Foodplan => BottomBox
export default class Settings extends SafeComponent<
  IPageProps,
  ISettingsState
> {
  state: ISettingsState = {
    plans: [],
    foodplanFriends: [],
    shareFoodplanBox: false,
    activeFoodplanBox: false,
    redirect: '',
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const plans = await AsyncStorage.getItem('settings-plans')
      if (plans) this.setState({ plans: JSON.parse(plans) })
      const foodplanFriends = await AsyncStorage.getItem(
        'settings-foodplanFriends'
      )
      if (foodplanFriends)
        this.setState({ foodplanFriends: JSON.parse(foodplanFriends) })
    })()
  }

  async componentDidMount() {
    const plans = await APIFoodplan.listPlans()
    const foodplanFriends = await APIShareFoodplan.list()
    this.setState({ plans, foodplanFriends })
    await AsyncStorage.setItem('settings-plans', JSON.stringify(plans))
    await AsyncStorage.setItem(
      'settings-foodplanFriends',
      JSON.stringify(foodplanFriends)
    )
  }

  setFoodplan(item: { label: string; value: string }) {}

  shareFoodplan() {
    this.setState({ shareFoodplanBox: !this.state.shareFoodplanBox })
  }

  inviteToFoodplan(friend: {
    id: number
    firstName: string
    lastName: string
  }): any {}

  async setActiveFoodplan(id: number) {
    await APIFoodplan.changePlan(id)
    const { plans } = this.state
    plans.forEach((item, idx) => {
      plans[idx].active = item.id === id
    })
    this.setState({ plans, activeFoodplanBox: false })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />
    const activeFoodplanName =
      this.state.plans
        .filter(item => item.active)
        .map(item => item.name)
        .shift() ?? 'Loading...'

    return (
      <>
        <View
          style={{
            height: GlobalStyles().appHeight - GlobalStyles().statusbarHeight,
          }}
        >
          <Navigation user={this.props.user} label="Einstellungen" />
          {(this.state.foodplanFriends.length > 0 ||
            this.state.plans.length > 1) && (
            <ListHeader color="#111" text={Language.get('foodlist')} />
          )}
          {this.state.plans.length > 1 && (
            <Moveable
              prefix="Active Foodplan:"
              name={activeFoodplanName}
              onClick={() => this.setState({ activeFoodplanBox: true })}
            />
          )}
          {this.state.foodplanFriends.length > 0 && (
            <Moveable
              name="Share Foodplan"
              boldText={true}
              onClick={() => this.shareFoodplan()}
              last={true}
            />
          )}
          <Moveable
            style={{ marginTop: 10 }}
            name={'Backgrounds'}
            icon="images"
            large={true}
            onClick={() => this.setState({ redirect: '/backgrounds' })}
          />
          <Moveable
            name="Logout"
            boldText={true}
            icon="sign-out-alt"
            onClick={() => this.setState({ redirect: '/logout' })}
            large={true}
          />
        </View>
        <BottomBox
          title="Share Foodplan"
          onClose={() => this.setState({ shareFoodplanBox: false })}
          items={this.state.foodplanFriends.map(item => ({
            name: `${item.friend.firstName} ${item.friend.lastName}`,
            active: item.inList,
            onClick: () => this.inviteToFoodplan(item.friend),
            onDelete: item.inList ? () => {} : undefined,
          }))}
          open={this.state.shareFoodplanBox}
        />
        <BottomBox
          title="Set Active Foodplan"
          onClose={() => this.setState({ activeFoodplanBox: false })}
          items={this.state.plans.map((item: IFoodplanPlan) => ({
            name: item.name,
            active: item.active,
            onClick: () => this.setActiveFoodplan(item.id),
          }))}
          open={this.state.activeFoodplanBox}
        />
      </>
    )
  }
}
