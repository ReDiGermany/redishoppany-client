import React, { Component } from 'react'
import { Text, View, Button, Dimensions } from 'react-native'
import { BarCodeReadEvent } from 'react-native-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { Camera } from 'expo-camera'
import IPageProps from '../interfaces/IPageProps'

interface IQRScannerProps extends IPageProps {
  onScan: (_text: string) => void
}

export default class QRScanner extends Component<IQRScannerProps> {
  onSuccess = (e: BarCodeReadEvent) => {
    // console.log(e)
    // Linking.openURL(e.data).catch((err) =>
    //   console.error("An error occured", err)
    // );
  }

  state = {
    scanned: false,
    hasPermission: null,
  }

  componentDidMount() {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      this.setState({ hasPermission: status === 'granted' })
    })()
  }

  render() {
    const handleBarCodeScanned = (info: any) => {
      this.setState({ scanned: true })
      this.props.onScan(info.data)
    }

    if (this.state.hasPermission !== true) {
      return (
        <Text
          style={{
            color: '#f00',
            fontWeight: 'bold',
            fontSize: 18,
            height: 200,
            width: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}
        >
          {this.state.hasPermission === null
            ? 'Requesting for camera permission'
            : 'No access to camera'}
        </Text>
      )
    }

    const { width } = Dimensions.get('window')
    const [x, y] = (Camera.defaultProps.ratio ?? '4:3').split(':')
    // console.log(test);

    return (
      <View>
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? undefined : handleBarCodeScanned
          }
          onLayout={async ({ nativeEvent: { layout } }) => {
            // console.log('QR Scanner layout', layout)
          }}
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
