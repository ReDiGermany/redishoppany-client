import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const MainWindowStyles = StyleSheet.create({
  container: {
    height: GlobalStyles().appHeight,
    backgroundColor: '#202020',
    paddingTop: GlobalStyles().statusbarHeight,
  },
})

export default MainWindowStyles
