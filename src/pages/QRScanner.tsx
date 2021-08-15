import React, { Component } from 'react'
import { Text, View, Button, Dimensions } from 'react-native'
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera'
import IQRScannerProps from '../interfaces/IQRScannerProps'
import QRScannerStyles from '../styles/QRScannerStyles'

export default class QRScanner extends Component<IQRScannerProps> {
  state = {
    scanned: false,
    hasPermission: null,
  }

  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    this.setState({ hasPermission: status === 'granted' })
  }

  render() {
    const handleBarCodeScanned: BarCodeScannedCallback = (info: any) => {
      if (!this.state.scanned) {
        this.setState({ scanned: true })
        this.props.onScan(info.data)
      }
    }

    if (this.state.hasPermission !== true) {
      return (
        <Text style={QRScannerStyles.text}>
          {this.state.hasPermission === null
            ? 'Requesting for camera permission'
            : 'No access to camera'}
        </Text>
      )
    }

    const { width } = Dimensions.get('window')
    const [x, y] = (Camera.defaultProps.ratio ?? '4:3').split(':')

    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          removeClippedSubviews={true}
          style={{
            height: (width / parseInt(y, 10)) * parseInt(x, 10),
            width,
          }}
        />
        {this.state.scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
        <Text style={{ color: '#f00' }}>Yes access to camera</Text>
      </View>
    )
  }
}
