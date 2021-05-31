import { StyleSheet } from 'react-native'
import WebStyle from '../helper/WebStyle'
import GlobalStyles from './GlobalStyles'

const loginStyles = () =>
  StyleSheet.create({
    body: {
      paddingTop: GlobalStyles().statusbarHeight,
      height: GlobalStyles().appHeight,
      backgroundColor: '#202020',
      zIndex: 1,
    },
    input: {
      textAlign: 'center',
      borderColor: 'rgba(0,0,0,.3)',
      borderWidth: 1,
      backgroundColor: '#111',
      minHeight: GlobalStyles().barHeight,
      width: GlobalStyles().appWidth - 40,
      marginLeft: 20,
      borderRadius: 10,
      marginTop: 30,
      color: '#fff',
    },
    vendorLogin: {
      height: GlobalStyles().lineHeight,
      // marginLeft: 20,
      borderRadius: 10,
      marginTop: 10,
      flex: 1,
      ...WebStyle({ cursor: 'pointer' }),
      marginHorizontal: 20,
    },
    longButton: {
      height: GlobalStyles().lineHeight / 2,
      width: GlobalStyles().appWidth / 2 - 25,
      marginLeft: 20,
      marginTop: 10,
      ...WebStyle({ cursor: 'pointer' }),
    },
    vendorLoginIcon: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 20,
      color: '#fff',
      // width: width / 4 - 25,
      height: GlobalStyles().lineHeight,
      ...WebStyle({ lineHeight: GlobalStyles().lineHeight }),
    },
    LongButtonIcon: {
      width: GlobalStyles().lineHeight / 2,
      height: GlobalStyles().lineHeight / 2,
      ...WebStyle({ lineHeight: GlobalStyles().lineHeight / 2 }),
      fontSize: 15,
    },
    valid: {
      borderColor: '#0f0',
    },
    invalid: {
      borderColor: '#f00',
    },
    unknown: {},
    loginButton: {
      ...WebStyle({ cursor: 'pointer' }),
      borderColor: '#111',
      borderWidth: 1,
      height: GlobalStyles().barHeight,
      width: GlobalStyles().appWidth - 40,
      left: 20,
      borderRadius: 10,
      paddingLeft: 10,
      marginTop: 30,
      backgroundColor: GlobalStyles().color.accent,
    },
    vendorLoginText: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#fff',
    },
    loginButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      ...WebStyle({ lineHeight: GlobalStyles().barHeight }),
    },
  })

export default loginStyles
