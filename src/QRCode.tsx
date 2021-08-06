import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import APIFriends from './helper/API/APIFriends'
import { mailRegex } from './helper/Constants'
import IQRCodeScanned from './interfaces/IQRCodeScanned'
import QRScanner from './pages/QRScanner'
import QRCodeStyles from './styles/QRCodeStyles'

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
