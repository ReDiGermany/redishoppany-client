/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { Pressable, View, Text } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import APIFriends from './helper/API/APIFriends'
import QRScanner from './pages/QRScanner'

interface IQRCodeScanned {
  onSuccess: (_email: string) => void
  onFail: () => void
}

export default class QRCode extends Component<IQRCodeScanned> {
  state = {
    scanner: false,
    qrcode: '',
  }

  async componentDidMount() {
    const qrcode = await APIFriends.qr()
    this.setState({ qrcode })
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', width: '100%', height: 200 }}>
        {
          this.state.scanner ? (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 200,
              }}
            >
              <QRScanner
                onScan={text => {
                  if (
                    text.match(
                      /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z0-9_.-]{2,4})$/
                    )
                  ) {
                    this.props.onSuccess(text)
                  } else {
                    this.props.onFail()
                  }
                  // console.log(text);
                  this.setState({ scanner: false })
                }}
              />
            </View>
          ) : this.state.qrcode !== '' ? (
            <SvgXml xml={this.state.qrcode} width="100%" height="100%" />
          ) : (
            <Text>Loading</Text>
          )
          // <Text>{this.state.qrcode}</Text>
          // <ImageBackground
          //   source={{ uri: this.state.qrcode }}
          //   style={{ width: 100, height: 100, backgroundColor: '#eee' }}
          // />
        }
        <Pressable
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 50,
            width: 50,
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 25,
          }}
          //   to="/qrscanner"
          onPress={() => {
            this.setState({ scanner: true })
            setTimeout(() => {
              if (this.state.scanner) {
                this.setState({ scanner: false })
              }
            }, 10 * 1000)
          }}
        >
          <Icon
            style={{
              height: 50,
              width: 50,
              lineHeight: 50,
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 25,
            }}
            name="camera"
          />
        </Pressable>
      </View>
    )
  }
}
