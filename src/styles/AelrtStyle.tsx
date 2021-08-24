import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

export const {
  box,
  errorColor,
  warningColor,
  infoColor,
  successColor,
  text,
  info,
  animateAble,
} = StyleSheet.create({
  animateAble: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: GlobalStyles().appWidth,
    zIndex: 1000000,
  },
  box: {
    backgroundColor: '#111',
    padding: 20,
    paddingTop: 20 + GlobalStyles().statusbarHeight,
    marginTop: GlobalStyles().statusbarHeight * -1,
    borderBottomWidth: 2,
  },
  errorColor: { borderBottomColor: '#f00' },
  warningColor: { borderBottomColor: '#ff6600' },
  infoColor: { borderBottomColor: '#0ff' },
  successColor: { borderBottomColor: '#0f0' },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  info: { color: '#fff', opacity: 0.5 },
})
