import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import ListHeader from '../../ListHeader'
import Moveable from '../../components/Moveable/Moveable'
import QRCode from '../../QRCode'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import AddBar from '../../components/AddBar'

export default class Friends extends Component<IPageProps> {
  state = {
    refreshing: false,
    isTop: false,
    qr: false,
    add: false,
  }

  render() {
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
            onChange={email => {}}
            placeholder="E-Mail"
            type="email"
            visible={this.state.add}
          />
          {this.state.qr && (
            <QRCode
              onFail={() => {
                console.log('Das hat leider nicht funktioniert.')
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
    )
  }
}
