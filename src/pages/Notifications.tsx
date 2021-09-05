import React from 'react'
import { View, RefreshControl, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moveable from '../components/Moveable/Moveable'
import APINotification from '../helper/API/APINotification'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../components/Navigation'
import { INotificationPageState } from '../interfaces/INotificationPageState'
import IAPINotification from '../interfaces/IAPINotification'
import SafeComponent from '../components/SafeComponent'

export default class Notifications extends SafeComponent<
  IPageProps,
  INotificationPageState
> {
  state: INotificationPageState = {
    notifications: [],
    refreshing: false,
  }

  async refresh() {
    APINotification.list(notifications => {
      this.setState({ refreshing: false, notifications })
      AsyncStorage.setItem('notifications', JSON.stringify(notifications))
    })
  }

  async componentDidMount() {
    const notifications = await AsyncStorage.getItem('notifications')
    if (notifications) {
      this.setState({ notifications: JSON.parse(notifications) })
      this.refresh()
    }
  }

  async delete(item: IAPINotification) {
    await APINotification.delete(item.id)
    await this.refresh()
  }

  async deleteAll() {
    await APINotification.deleteAll()
    await this.refresh()
  }

  render() {
    return (
      <View>
        <Navigation
          user={this.props.user}
          label={'Benachrichtigungen'}
          buttons={[
            {
              name: 'deleteAll',
              onClick: () => this.deleteAll(),
              icon: 'trash',
            },
          ]}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                this.setState({ refreshing: true })
                await this.refresh()
              }}
            />
          }
        >
          {this.state.notifications.map(item => (
            <Moveable
              key={item.name}
              onDelete={() => this.delete(item)}
              name={item.name}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
