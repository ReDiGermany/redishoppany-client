import React, { Component } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native'
import ListHeader from '../ListHeader'
import Moveable from '../components/Moveable/Moveable'
import Navigation from '../Navigation'
import QRCode from '../QRCode'
import GlobalStyles from '../styles/GlobalStyles'
import IPageProps from '../interfaces/IPageProps'

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
          label="Friends"
          // badge="10"
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
            <QRCode
              onFail={() => {
                // eslint-disable-next-line no-alert
                alert('Das hat leider nicht funktioniert.')
              }}
              onSuccess={email => console.log(email)}
            />
            <ListHeader text="Freunde" />
            <Moveable name="Freund N." onDelete={() => {}} />
            <Moveable name="Alie N." onDelete={() => {}} />
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
        </SafeAreaView>
      </View>
    )
  }
}
