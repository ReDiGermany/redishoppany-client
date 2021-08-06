import { StyleSheet } from 'react-native'

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

export default QRCodeStyles
