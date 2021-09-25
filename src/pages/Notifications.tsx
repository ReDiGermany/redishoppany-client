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
import InfoMoveable from '../components/Moveable/InfoMoveable'
import IMoveableButtonProps from '../interfaces/IMoveableButtonProps'
import APIFriends from '../helper/API/APIFriends'
import APIShareShoppinglist from '../helper/API/APIShareShoppinglist'
import { DefAlert, DefPreSuccessAlert } from '../helper/DefinedAlerts'

export default class Notifications extends SafeComponent<
  IPageProps,
  INotificationPageState
> {
  state: INotificationPageState = {
    notifications: [],
    refreshing: false,
    alert: DefAlert,
  }

  notificationButtons: {
    [key: string]: (_item: IAPINotification) => IMoveableButtonProps[]
  } = {
    'language.changed': () => [],
    'friend_add': item => [
      {
        color: '#fff',
        icon: 'external-link-alt',
        name: 'goto',
        onPress: async () => {
          await APIFriends.accept(parseInt(item.info, 10), async () => {
            await APIFriends.list(async () => {
              await APINotification.delete(item.id, () => {
                this.refresh()
              })
            })
          })
        },
      },
    ],
    'friend_deleted': () => [],
    'friend_denied': () => [],
    'foodplan_accepted': () => [],
    'foodplan_denied': () => [],
    'foodplan_invite': () => [],
    'foodplan_revoked': () => [],
    'recipe_accepted': () => [],
    'recipe_invite': () => [],
    'recipe_revoked': () => [],
    'list_accepted': () => [],
    'shoppinglist_invite': item => [
      {
        color: GlobalStyles().color.red,
        icon: 'times',
        name: 'deny',
        onPress: () => this.delete(item),
      },
      {
        color: GlobalStyles().color.accent,
        icon: 'check',
        name: 'accept',
        onPress: () => {
          APIShareShoppinglist.accept(item.id, () => {
            this.setState({
              alert: DefPreSuccessAlert(
                'notifications.shoppinglist_invite.accept'
              ),
            })
            this.refresh()
          })
        },
      },
    ],
  }

  async refresh() {
    APINotification.list(notifications => {
      this.setState({ refreshing: false, notifications })
      this.props.onReload?.()
    })
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
          {this.state.notifications.length === 0 && (
            <InfoMoveable name="notifications.empty" />
          )}
          {this.state.notifications.map(item => {
            if (!(item.name in this.notificationButtons)) {
              console.log("Notifications: Didn't find", item.name!)
            }

            return (
              <Moveable
                key={item.id}
                large={true}
                onDelete={() => this.delete(item)}
                name={Language.getOrText(`notification.${item.name}`)}
                // name={item.name}
                secondText={item.info}
                secondTextOpacity={0.5}
                buttons={
                  item.name in this.notificationButtons
                    ? this.notificationButtons[item.name](item)
                    : undefined
                }
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}
