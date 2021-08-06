import React, { Component } from 'react'
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

export default class Friends extends Component<IPageProps, IPageState> {
  state = {
    refreshing: false,
    isTop: false,
    qr: false,
    add: false,
    list: {
      friends: [],
      incomming: [],
      outgoing: [],
    },
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
    console.log({
      outgoing: this.state.list.outgoing.length,
      incomming: this.state.list.incomming.length,
      friends: this.state.list.friends.length,
    })

    return (
      <View>
        <Navigation
          label={this.props.user?.profile.firstName ?? 'User'}
          subTitle={this.props.user?.profile.email ?? 'someone@email.tld'}
          simple={true}
          solid={this.state.isTop}
          buttons={[
            {
              icon: this.state.qr ? 'chevron-up' : 'qrcode',
              name: 'qr',
              onClick: () => {
                this.setState({ qr: !this.state.qr, add: false })
              },
            },
            {
              icon: this.state.add ? 'chevron-up' : 'plus',
              name: 'add',
              onClick: () => {
                this.setState({ add: !this.state.add, qr: false })
              },
            },
          ]}
        />

        <ScrollView
          onScroll={e =>
            this.setState({
              isTop: e.nativeEvent.contentOffset.y <= 0,
            })
          }
          style={{
            height: GlobalStyles().contentHeight - GlobalStyles().barHeight,
          }}
        >
          <AddBar
            onChange={this.addFriend}
            placeholder="E-Mail"
            type="email"
            visible={this.state.add}
          />
          {this.state.qr && (
            <QRCode
              onFail={() => {
                console.log('Das hat leider nicht funktioniert.')
              }}
              onSuccess={this.addFriend}
            />
          )}
          {this.state.list.friends.length > 0 && (
            <>
              <ListHeader color="#111" text={Language.get('friends')} />
              {this.state.list.friends.map((friend: IFriend, index) => (
                <Moveable
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
