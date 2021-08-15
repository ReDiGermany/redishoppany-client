import React, { Component } from 'react'
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

// TODO: fill content!
// TODO: Active Foodplan => BottomBox
export default class Settings extends Component<IPageProps, ISettingsState> {
  state: ISettingsState = {
    plans: [],
    foodplanFriends: [],
    shareFoodplanBox: false,
    redirect: '',
  }

  async componentDidMount() {
    const plans = await APIFoodplan.listPlans()
    const foodplanFriends = await APIShareFoodplan.list()
    this.setState({ plans, foodplanFriends })
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

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    let activeFoodplan = '0'
    const foodplanDropdown = this.state.plans.map((item: IFoodplanPlan) => {
      const data = {
        value: item.id.toString(),
        label: item.name,
      }

      if (item.active) {
        activeFoodplan = item.id.toString()
      }

      return data
    })

    return (
      <>
        <View
          style={{
            height: GlobalStyles().appHeight - GlobalStyles().statusbarHeight,
            // transform: [{ scale: this.state.shareFoodplanBox ? 0.9 : 1 }],
          }}
        >
          <Navigation user={this.props.user} label="Einstellungen" />
          <ListHeader color="#111" text={Language.get('foodlist')} />
          <Moveable
            prefix="Active Foodplan"
            dropdownSelected={item => this.setFoodplan(item)}
            selectedItem={activeFoodplan}
            dropdownItems={foodplanDropdown}
          />
          <Moveable
            name="Share Foodplan"
            boldText={true}
            onClick={() => this.shareFoodplan()}
            last={true}
          />
          <Moveable
            name="Logout"
            boldText={true}
            style={{ marginTop: 10 }}
            onClick={() => {
              this.setState({ redirect: '/logout' })
            }}
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
      </>
    )
  }
}
