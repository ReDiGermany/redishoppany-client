import React from 'react'
import { View } from 'react-native'
import BottomBox from '../components/BottomBox'
import Moveable from '../components/Moveable/Moveable'
import APIFoodplan from '../helper/API/APIFoodplan'
import APIShareFoodplan from '../helper/API/APIShareFoodplan'
import IFoodplanPlan from '../interfaces/IFoodplanPlan'
import IPageProps from '../interfaces/IPageProps'
import Language from '../language/Language'
import ListHeader from '../components/ListHeader'
import Navigation from '../components/Navigation'
import { RedirectIfPossible } from '../Router/react-router'
import GlobalStyles from '../styles/GlobalStyles'
import ISettingsState from '../interfaces/ISettingsState'
import SafeComponent from '../components/SafeComponent'
import { DefAlert, DefPreErrorAlert, ErrorAlert } from '../helper/DefinedAlerts'
import Alert from '../components/Alert'

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
    alert: DefAlert,
  }

  constructor(props: IPageProps) {
    super(props)
    APIFoodplan.listPlans(async plans => {
      this.setState({ plans })
    })
    APIShareFoodplan.list(async foodplanFriends => {
      this.setState({ foodplanFriends })
    })
  }

  setFoodplan(item: { label: string; value: string }) {}

  shareFoodplan() {
    this.setState({ shareFoodplanBox: !this.state.shareFoodplanBox })
  }

  async inviteToFoodplan({ id, name }: { id: number; name: string }) {
    await APIShareFoodplan.invite(id, t => {
      console.log('invite', id, name, t)
      if (!t)
        this.setState({ alert: DefPreErrorAlert('foodlist.invite.error') })

      const { foodplanFriends } = this.state
      foodplanFriends.forEach((item, idx) => {
        if (item.id === id) foodplanFriends[idx].inList = true
      })
      this.setState({ foodplanFriends, shareFoodplanBox: false })
    })
  }

  async setActiveFoodplan(id: number) {
    APIFoodplan.changePlan(id)
    const { plans } = this.state
    plans.forEach((item, idx) => {
      plans[idx].active = item.id === id
    })
    this.setState({ plans, activeFoodplanBox: false })
  }

  render() {
    const activeFoodplanName =
      this.state.plans
        .filter(item => item.active)
        .map(item => item.name)
        .shift() ?? 'Loading...'

    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        <View style={{ height: GlobalStyles().contentHeight }}>
          {this.state.alert.text !== '' && (
            <Alert
              {...this.state.alert}
              onClose={() => this.setState({ alert: DefAlert })}
            />
          )}
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
          <BottomBox
            title="Share Foodplan"
            onClose={() => this.setState({ shareFoodplanBox: false })}
            items={this.state.foodplanFriends.map(item => ({
              name: item.user.name,
              active: item.inList,
              onClick: () => this.inviteToFoodplan(item.user),
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
        </View>
      </>
    )
  }
}
