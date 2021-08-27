import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Pressable, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SafeComponent from './components/SafeComponent'
import APIFriends from './helper/API/APIFriends'
import { mailRegex, uuidRegex } from './helper/Constants'
import IQRCodeScanned from './interfaces/IQRCodeScanned'
import QRScanner from './pages/QRScanner'
import QRCodeStyles from './styles/QRCodeStyles'

export default class QRCode extends SafeComponent<IQRCodeScanned> {
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
              const isMail = text.match(mailRegex)
              if (isMail || text.match(uuidRegex))
                this.props.onSuccess(text, (isMail ?? []).length > 0)
              else this.props.onFail()
              this.setState({ scanner: false })
            }}
          />
        </View>
      )
    let timeout: any = null
    const pressable = {
      style: {
        ...QRCodeStyles.button,
        ...(this.state.scanner && { borderColor: '#fff' }),
      },
      onPress: () => {
        if (this.state.scanner) {
          clearTimeout(timeout)
          this.setState({ scanner: false })
        } else {
          this.setState({ scanner: true })
          timeout = setTimeout(() => {
            if (this.state.scanner) this.setState({ scanner: false })
          }, 10 * 1000)
        }
      },
    }

    const style = {
      ...QRCodeStyles.icon,
      ...(this.state.scanner ? { color: '#fff' } : { color: '#000' }),
    }

    return (
      <View style={QRCodeStyles.container}>
        {QRContent}
        <Pressable {...pressable}>
          <Icon style={style} name={this.state.scanner ? 'times' : 'camera'} />
        </Pressable>
      </View>
    )
  }
}
