import React from 'react'
import { ScrollView, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListHeader from '../../ListHeader'
import Moveable from '../../components/Moveable/Moveable'
import QRCode from '../../QRCode'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import AddBar from '../../components/AddBar'
import APIFriends from '../../helper/API/APIFriends'
import IPageState from '../../interfaces/IPageState'
import IFriend from '../../interfaces/IFriend'
import Language from '../../language/Language'
import IAPIFriendsList from '../../interfaces/IAPIFriendsList'
import { Redirect } from '../../Router/react-router'
import SafeComponent from '../../components/SafeComponent'

export default class Friends extends SafeComponent<IPageProps, IPageState> {
  state = {
    refreshing: false,
    isTop: true,
    add: false,
    list: {
      friends: [],
      incomming: [],
      outgoing: [],
    },
    redirect: '',
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const list = await AsyncStorage.getItem('friendlist')
      if (list != null) this.setState({ list: JSON.parse(list) })
    })()
  }

  async componentDidMount() {
    const list = await APIFriends.list()
    this.update(list)
  }

  update(list: IAPIFriendsList) {
    this.setState({ list })
    ;(async () => {
      await AsyncStorage.setItem('friendlist', JSON.stringify(list))
    })()
  }

  removePending(friend: IFriend) {
    const { list } = this.state

    list.incomming.forEach((value: IFriend, idx) => {
      if (value.id === friend.id) list.incomming.splice(idx, 1)
    })

    list.outgoing.forEach((value: IFriend, idx) => {
      if (value.id === friend.id) list.outgoing.splice(idx, 1)
    })

    return list
  }

  cancleInvite(friend: IFriend) {
    const list = this.removePending(friend)

    ;(async () => {
      await APIFriends.cancel(friend.id)
    })()
    this.update(list)
  }

  denyInvite(friend: IFriend) {
    const list = this.removePending(friend)

    ;(async () => {
      await APIFriends.deny(friend.id)
    })()
    this.update(list)
  }

  acceptFriend(friend: IFriend) {
    const list = this.removePending(friend)
    // @ts-ignore should be possible #never
    list.friends.push(friend)
    ;(async () => {
      await APIFriends.accept(friend.id)
    })()
    this.update(list)
  }

  removeFriend(friend: IFriend) {
    const { list } = this.state

    list.friends.forEach((item: IFriend, idx) => {
      if (item.id === friend.id) {
        list.friends.splice(idx, 1)
      }
    })
    ;(async () => {
      await APIFriends.delete(friend.id)
    })()
    this.update(list)
  }

  addFriend(email: string) {
    ;(async () => {
      await APIFriends.add(email)
    })()
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const buttons = [
      {
        icon: this.state.add ? 'chevron-up' : 'plus',
        name: 'add',
        onClick: () => this.setState({ add: !this.state.add }),
      },
    ]
    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        // @ts-ignore
        badge: { color: '#900000', text: this.props.user?.notificationCount },
      })

    const navigation = {
      label: this.props.user?.profile.firstName ?? 'User',
      subTitle: this.props.user?.profile.email ?? 'someone@email.tld',
      simple: true,
      solid: this.state.isTop,
      buttons,
    }

    const scrollView = {
      onScroll: (e: any) =>
        this.setState({
          isTop: e.nativeEvent.contentOffset.y <= 0,
        }),
      style: {
        height: GlobalStyles().contentHeight - GlobalStyles().barHeight,
      },
    }

    const addBar = {
      onChange: this.addFriend,
      placeholder: 'E-Mail',
      visible: this.state.add,
    }

    const qrCode = {
      // onFail: () => console.log('Das hat leider nicht funktioniert.'),
      onFail: () => {},
      onSuccess: this.addFriend,
    }

    return (
      <View>
        <Navigation {...navigation} />
        <ScrollView {...scrollView}>
          <AddBar {...addBar} type="email" />
          <QRCode {...qrCode} />

          {this.state.list.friends.length > 0 && (
            <>
              <ListHeader color="#111" text={Language.get('friends')} />
              {this.state.list.friends.map((friend: IFriend, index) => (
                <Moveable
                  key={`friend_${friend.id}`}
                  name={`${friend.firstName} ${friend.lastName}`}
                  onDelete={() => this.removeFriend(friend)}
                  last={index === this.state.list.friends.length - 1}
                />
              ))}
            </>
          )}

          {this.state.list.incomming.length > 0 && (
            <>
              <ListHeader
                color="#111"
                text={Language.get('friends.incomming')}
              />
              {this.state.list.incomming.map((friend: IFriend, index) => (
                <Moveable
                  key={`inc_${friend.id}`}
                  name={`${friend.firstName} ${friend.lastName}`}
                  onDelete={() => this.denyInvite(friend)}
                  last={index === this.state.list.incomming.length - 1}
                  buttons={[
                    {
                      name: 'accept',
                      color: '#0F0',
                      icon: 'check',
                      onPress: () => this.acceptFriend(friend),
                    },
                  ]}
                />
              ))}
            </>
          )}

          {this.state.list.outgoing.length > 0 && (
            <>
              <ListHeader
                color="#111"
                text={Language.get('friends.outgoing')}
              />
              {this.state.list.outgoing.map((friend: IFriend, index) => (
                <Moveable
                  key={`out_${friend.id}`}
                  name={`${friend.firstName} ${friend.lastName}`}
                  onDelete={() => this.cancleInvite(friend)}
                  last={index === this.state.list.outgoing.length - 1}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    )
  }
}
