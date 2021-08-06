import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import APIFriends from './helper/API/APIFriends'
import { mailRegex } from './helper/Constants'
import QRScanner from './pages/QRScanner'

interface IQRCodeScanned {
  onSuccess: (_email: string) => void
  onFail: () => void
}

const QRCodeStyles = StyleSheet.create({
  container: { backgroundColor: '#fff', width: '100%', height: 200 },
  scannerBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 25,
  },
  icon: {
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
  },
})

export default class QRCode extends Component<IQRCodeScanned> {
  state = {
    scanner: false,
    qrcode: '',
  }

  constructor(props: IQRCodeScanned) {
    super(props)
    ;(async () => {
      this.setState({ qrcode: await AsyncStorage.getItem('qrcode') })
    })()
  }

  async componentDidMount() {
    const qrcode = await APIFriends.qr()
    this.setState({ qrcode })
    await AsyncStorage.setItem('qrcode', qrcode)
  }

  render() {
    let QRContent = <></>

    if (this.state.qrcode !== '')
      QRContent = <SvgXml xml={this.state.qrcode} width="100%" height="100%" />

    if (this.state.scanner)
      QRContent = (
        <View style={QRCodeStyles.scannerBox}>
          <QRScanner
            onScan={text => {
              if (text.match(mailRegex)) this.props.onSuccess(text)
              else this.props.onFail()
              this.setState({ scanner: false })
            }}
          />
        </View>
      )

    const pressable = {
      style: QRCodeStyles.button,
      onPress: () => {
        this.setState({ scanner: true })
        setTimeout(() => {
          if (this.state.scanner) this.setState({ scanner: false })
        }, 10 * 1000)
      },
    }

    return (
      <View style={QRCodeStyles.container}>
        {QRContent}
        <Pressable {...pressable}>
          <Icon style={QRCodeStyles.icon} name="camera" />
        </Pressable>
      </View>
    )
  }
}
