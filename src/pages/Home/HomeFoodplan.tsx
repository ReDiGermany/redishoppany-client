import React, { Component } from 'react'
import {
  // RefreshControl, SafeAreaView,
  ScrollView,
  View,
} from 'react-native'
import Moveable from '../../components/Moveable/Moveable'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import UserProfileSmall from '../../components/UserProfileSmall'

export default class Foodplan extends Component<IPageProps> {
  state = {
    notifications: [
      { prefix: 'heute', name: 'Curlybleu', empty: false },
      { prefix: 'DO', name: 'Curry', empty: false },
      { prefix: 'FR', name: 'Curry2', empty: false },
      { prefix: 'SA', name: '', empty: true },
      { prefix: 'SO', name: 'Curry3', empty: false },
      { prefix: 'MO', name: '', empty: true },
    ],
    refreshing: false,
  }

  render() {
    // const onRefresh = () => {
    //   this.setState({ refreshing: true })
    //   setTimeout(() => {
    //     this.setState({ refreshing: false })
    //   }, 1000)
    // }

    return (
      <ScrollView style={{ height: GlobalStyles().contentHeight }}>
        <View>
          <UserProfileSmall user={this.props.user} />
          {/* <SafeAreaView
            style={{
              height: GlobalStyles().contentHeight,
            }}
          > */}
          {/* <ScrollView
              onScrollBeginDrag={() => {
                this.setState({ scrolling: true })
                console.log('scroll start')
              }}
              onScrollEndDrag={() => {
                this.setState({ scrolling: false })
                console.log('scroll stop')
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={onRefresh}
                />
              }
            > */}
          {this.state.notifications.map(item => {
            if (item.empty) {
              return (
                <Moveable
                  key={`${item.name}-${item.prefix}`}
                  prefix={item.prefix}
                  dropdownItems={[
                    { label: 'Schnitzel', value: '1' },
                    { label: 'nix', value: '2' },
                  ]}
                  dropdownSelected={() => {}}
                  // to="/settings"
                />
              )
            }

            return (
              <Moveable
                key={item.name}
                onDelete={() => {}}
                prefix={item.prefix}
                name={item.name}
                // to="/settings"
              />
            )
          })}
          {/* </ScrollView> */}
          {/* </SafeAreaView> */}
        </View>
      </ScrollView>
    )
  }
}
