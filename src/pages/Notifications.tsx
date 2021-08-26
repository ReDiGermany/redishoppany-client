import React from 'react'
import { View, RefreshControl, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moveable from '../components/Moveable/Moveable'
import APINotification from '../helper/API/APINotification'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'
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
    const notifications = await APINotification.list()
    this.setState({ refreshing: false, notifications })
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications))
  }

  async componentDidMount() {
    const notifications = await AsyncStorage.getItem('notifications')
    if (notifications)
      this.setState({ notifications: JSON.parse(notifications) })
    this.refresh()
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
    const navigation = {
      user: this.props.user,
      label: 'Benachrichtigungen',
      buttons: [
        {
          name: 'deleteAll',
          onClick: () => this.deleteAll(),
          icon: 'trash',
        },
      ],
    }

    const refreshControl = {
      refreshing: this.state.refreshing,
      onRefresh: async () => {
        this.setState({ refreshing: true })
        await this.refresh()
      },
    }

    const scrollView = {
      refreshControl: <RefreshControl {...refreshControl} />,
    }

    return (
      <View>
        <Navigation {...navigation} />
        <ScrollView {...scrollView}>
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
