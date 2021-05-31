import React, { Component } from 'react'
import { View, RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import Moveable from '../components/Moveable/Moveable'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'

export default class Notifications extends Component<IPageProps> {
  state = {
    notifications: [
      { name: 'Freundschaftsanfrage von Max K.', disabled: false },
      { name: 'test notification', disabled: true },
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
          label="Benachrichtigungen"
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
            {this.state.notifications.map(item => (
              <Moveable
                key={item.name}
                onDelete={() => {}}
                name={item.name}
                // to="/settings"
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
