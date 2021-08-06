import React, { Component } from 'react'
import {
  // RefreshControl, SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import ListHeader from '../../ListHeader'
import Moveable from '../../components/Moveable/Moveable'
import QRCode from '../../QRCode'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'

export default class Friends extends Component<IPageProps> {
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
    isTop: false,
    qr: false,
    add: false,
  }

  render() {
    // const onRefresh = () => {
    //   this.setState({ refreshing: true })
    //   setTimeout(() => {
    //     this.setState({ refreshing: false })
    //   }, 1000)
    // }

    return (
      <View>
        {/* <SafeAreaView
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
          > */}
        {/* <UserProfileSmall solid={this.state.isTop} user={this.props.user} /> */}
        <Navigation
          label={this.props.user?.profile.firstName ?? 'User'}
          subTitle={this.props.user?.profile.email ?? 'someone@email.tld'}
          simple={true}
          solid={this.state.isTop}
          buttons={[
            {
              icon: 'qrcode',
              name: 'qr',
              onClick: () => {
                this.setState({ qr: !this.state.qr })
              },
            },
            {
              icon: 'plus',
              name: 'add',
              onClick: () => {
                this.setState({ add: !this.state.add })
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
          {this.state.add && (
            <TextInput
              placeholder="E-Mail"
              placeholderTextColor="#ffffff30"
              style={{
                margin: 10,
                backgroundColor: '#11111180',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            />
          )}
          {this.state.qr && (
            <QRCode
              onFail={() => {
                // eslint-disable-next-line no-alert
                alert('Das hat leider nicht funktioniert.')
              }}
              onSuccess={email => console.log(email)}
            />
          )}
          <ListHeader text="Freunde" />
          <Moveable name="Freund N." onDelete={() => {}} />
          <Moveable name="Alie N." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <Moveable name="Attacke R." onDelete={() => {}} />
          <ListHeader text="Eingehende Anfragen" />
          <Moveable
            name="Zalam I."
            onDelete={() => {}}
            buttons={[{ name: 'accept', color: '#0F0', icon: 'check' }]}
          />
          <ListHeader text="Gesendete Anfragen" />
          <Moveable name="Tschink N." onDelete={() => {}} />
        </ScrollView>
      </View>
      // </SafeAreaView>
      // </View>
    )
  }
}
