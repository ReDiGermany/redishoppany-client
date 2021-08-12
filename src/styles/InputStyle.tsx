import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

export const { box, prefixBlock, textBlock, button, icon, textBlockNoPrefix } =
  StyleSheet.create({
    textBlockNoPrefix: {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      width: GlobalStyles().appWidth - 20 - 2 - 30,
    },
    icon: {
      height: 30,
      width: 30,
      textAlign: 'center',
      lineHeight: 30,
      color: '#fff',
    },
    button: {
      height: 30,
      marginTop: 10,
      backgroundColor: GlobalStyles().color.accent,
      width: 30,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    box: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      flexDirection: 'row',
      backgroundColor: '#111',
      height: 50,
      width: GlobalStyles().appWidth,
      paddingHorizontal: 10,
      zIndex: 999,
    },
    prefixBlock: {
      height: 30,
      marginTop: 10,
      color: '#fff',
      backgroundColor: '#202020',
      width: 50,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      marginRight: 2,
      paddingLeft: 10,
    },
    textBlock: {
      paddingLeft: 10,
      height: 30,
      marginTop: 10,
      color: '#fff',
      backgroundColor: '#202020',
      width: GlobalStyles().appWidth - 20 - 2 - 50 - 30,
    },
  })
