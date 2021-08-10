import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const SplashScreenStyles = StyleSheet.create({
  container: { width: '100%', height: '100%', backgroundColor: '#202020' },
  image: { width: '100%', height: '100%' },
  text: {
    position: 'absolute',
    bottom: GlobalStyles().appHeight / 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: GlobalStyles().appWidth,
    left: 0,
    color: '#fff',
  },
})
export default SplashScreenStyles
