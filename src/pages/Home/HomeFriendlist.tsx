import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import Moveable from '../../components/Moveable/Moveable'
import QRCode from '../../components/QRCode'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../components/Navigation'
import AddBar from '../../components/AddBar'
import APIFriends from '../../helper/API/APIFriends'
import IPageState from '../../interfaces/IPageState'
import IFriend from '../../interfaces/IFriend'
import IAPIFriendsList from '../../interfaces/IAPIFriendsList'
import { RedirectIfPossible } from '../../Router/react-router'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import INavigationPropsButton from '../../interfaces/INavigationPropsButton'
import Alert from '../../components/Alert'
import INotification from '../../interfaces/INotification'
import HomeFriendlistListItem from '../../components/HomeFriendlistListItem'
import RestrictedAnon from '../../components/RestrictedAnon'
import PhoneNotConnected from '../../components/PhoneNotConnected'
import AnonAlert from '../../components/AnonAlert'

export default class Friends extends SafeComponent<IPageProps, IPageState> {
  state: IPageState = {
    refreshing: false,
    isTop: true,
    add: false,
    list: {
      friends: [],
      incomming: [],
      outgoing: [],
    },
    redirect: '',
    alert: { text: '', type: 'error' },
  }

  constructor(props: IPageProps) {
    super(props)
    AsyncStorage.getItem('friendlist').then(list => {
      if (list != null) this.setState({ list: JSON.parse(list) })
    })
  }

  async componentDidMount() {
    this.onRefresh()
    Notifications.addNotificationReceivedListener(this.handleNotification)
  }

  handleNotification = (notification: Notifications.Notification) => {
    // eslint-disable-next-line prefer-destructuring
    const data: INotification = notification.request.content.data
    if (data?.reload === 'friendlist') {
      this.onRefresh()
    }
    if (data.alert) {
      this.setState({ alert: data.alert })
    }
  }

  async onRefresh() {
    APIFriends.list(list => this.update(list))
  }

  async update(list: IAPIFriendsList) {
    this.setState({ list })
    await AsyncStorage.setItem('friendlist', JSON.stringify(list))
  }

  removePending(friend: IFriend): IAPIFriendsList {
    const { list } = this.state

    list.incomming?.forEach((value: IFriend, idx) => {
      if (value.id === friend.id) list.incomming?.splice(idx, 1)
    })

    list.outgoing?.forEach((value: IFriend, idx) => {
      if (value.id === friend.id) list.outgoing?.splice(idx, 1)
    })

    return list
  }

  async cancleInvite(friend: IFriend) {
    const list = this.removePending(friend)

    await APIFriends.cancel(friend.id)
    this.update(list)
  }

  async denyInvite(friend: IFriend) {
    const list = this.removePending(friend)
    await APIFriends.deny(friend.id)
    this.update(list)
  }

  async acceptFriend(friend: IFriend) {
    const list = this.removePending(friend)
    list.friends.push(friend)
    await APIFriends.accept(friend.id)
    this.update(list)
  }

  async removeFriend(friend: IFriend) {
    const { list } = this.state

    list.friends.forEach((item: IFriend, idx) => {
      if (item.id === friend.id) {
        list.friends.splice(idx, 1)
      }
    })
    await APIFriends.delete(friend.id)
    this.update(list)
  }

  async addFriend(email: string, isMail: boolean) {
    const added = await APIFriends.add(email, isMail)
    if (added) {
      this.setState({
        alert: { type: 'success', text: 'Freund hinzugefügt' },
      })
      APIFriends.list(list => this.update(list))
    } else {
      this.setState({
        alert: {
          type: 'error',
          text: 'Fehler!',
          info: 'Freund konnte nicht hinzugefügt werden',
        },
      })
    }
  }

  render() {
    const allowed =
      (this.props.user?.profile.isAnon && this.props.user?.profile.confirmed) ??
      false

    const buttons: INavigationPropsButton[] = []
    if (allowed)
      buttons.push({
        icon: this.state.add ? 'chevron-up' : 'plus',
        name: 'add',
        onClick: () => this.setState({ add: !this.state.add }),
      })
    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        badge: {
          color: '#900000',
          text: this.props.user?.notificationCount.toString() ?? '',
        },
      })

    const navigation = {
      label: this.props.user?.profile.firstName ?? 'User',
      subTitle: allowed
        ? this.props.user?.profile.email ?? 'someone@email.tld'
        : undefined,
      simple: true,
      solid: this.state.isTop,
      buttons,
    }

    const addBar = {
      onChange: (email: string) => this.addFriend(email, true),
      placeholder: 'E-Mail',
      visible: this.state.add,
    }

    const qrCode = {
      scanAllowed: allowed,
      onFail: () =>
        this.setState({
          alert: {
            text: 'Fehler',
            info: 'Es gab einen Fehler beim hinzufügen.',
            type: 'error',
          },
        }),
      onSuccess: (a: string, b: boolean) => this.addFriend(a, b),
    }

    const { list } = this.state

    return (
      <View>
        <RedirectIfPossible to={this.state.redirect} />
        {this.state.alert.text !== '' && (
          <Alert
            onClose={() =>
              this.setState({ alert: { text: '', type: 'error' } })
            }
            {...this.state.alert}
          />
        )}
        <Navigation {...navigation} />
        <ScrollView
          dark={true}
          hasBottomBar={true}
          hasNavi={true}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          isTop={isTop => this.setState({ isTop })}
        >
          <AddBar {...addBar} type="email" />
          <PhoneNotConnected connected={this.props.connected} />
          <AnonAlert user={this.props.user} />
          <QRCode {...qrCode} />
          {allowed ? (
            <>
              {list.friends.length <= 0 &&
                list.incomming.length <= 0 &&
                list.outgoing.length <= 0 && (
                  <Moveable
                    name="Nichts vorhanden!"
                    large={true}
                    style={{ marginTop: 10 }}
                    centerText={true}
                    boldText={true}
                    disabled={true}
                    bgColor="rgba(255,0,0,.1)"
                  />
                )}
              <HomeFriendlistListItem
                title="friends"
                list={this.state.list.friends}
                removeFriend={this.removeFriend}
              />
              <HomeFriendlistListItem
                title="friends.incomming"
                list={this.state.list.incomming}
                denyInvite={this.denyInvite}
                acceptFriend={this.acceptFriend}
              />
              <HomeFriendlistListItem
                title="friends.outgoing"
                list={this.state.list.outgoing}
                cancleInvite={this.cancleInvite}
              />
            </>
          ) : (
            <RestrictedAnon />
          )}
        </ScrollView>
      </View>
    )
  }
}
