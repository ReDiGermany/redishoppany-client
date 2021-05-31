import React, { Component } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native'
import Moveable from '../components/Moveable/Moveable'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'
import IPageProps from '../interfaces/IPageProps'

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
    const onRefresh = () => {
      this.setState({ refreshing: true })
      setTimeout(() => {
        this.setState({ refreshing: false })
      }, 1000)
    }

    return (
      <View>
        <Navigation
          user={this.props.user}
          label="Essensplan"
          // badge="10"
          buttons={[
            {
              name: 'deleteAll',
              onClick: () => {
                console.log('deleteAll')
              },
              icon: 'trash',
            },
          ]}
        />
        <SafeAreaView
          style={{
            height:
              GlobalStyles().appHeight -
              GlobalStyles().barHeight -
              GlobalStyles().statusbarHeight,
          }}
        >
          <ScrollView
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
          >
            {this.state.notifications.map(item => {
              if (item.empty) {
                return (
                  <Moveable
                    key={item.name}
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
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
