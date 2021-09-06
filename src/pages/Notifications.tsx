import React from 'react'
import { View } from 'react-native'
import Moveable from '../components/Moveable/Moveable'
import APINotification from '../helper/API/APINotification'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../components/Navigation'
import { INotificationPageState } from '../interfaces/INotificationPageState'
import IAPINotification from '../interfaces/IAPINotification'
import SafeComponent from '../components/SafeComponent'
import GlobalStyles from '../styles/GlobalStyles'
import Language from '../language/Language'
import ScrollView from '../components/ScrollView'

export default class Notifications extends SafeComponent<
  IPageProps,
  INotificationPageState
> {
  state: INotificationPageState = {
    notifications: [],
    refreshing: false,
  }

  async refresh() {
    APINotification.list(notifications =>
      this.setState({ refreshing: false, notifications })
    )
  }

  constructor(props: IPageProps) {
    super(props)
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
    return (
      <View
        style={{
          height: GlobalStyles().contentHeight - GlobalStyles().barHeight,
        }}
      >
        <Navigation
          user={this.props.user}
          label="notifications"
          buttons={[
            {
              name: 'deleteAll',
              onClick: () => this.deleteAll(),
              icon: 'trash',
            },
          ]}
        />
        <ScrollView
          hasNavi={true}
          onRefresh={async () => {
            this.setState({ refreshing: true })
            await this.refresh()
          }}
        >
          {this.state.notifications.map(item => (
            <Moveable
              key={item.id}
              onDelete={() => this.delete(item)}
              name={Language.getOrText(`notification.${item.name}`)}
              secondText={item.info}
              secondTextOpacity={0.5}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}
