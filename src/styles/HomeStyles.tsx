import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const HomeStyles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
    opacity: 0.5,
  },
  outerView: { backgroundColor: '#111' },
  innerView: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    height: GlobalStyles().contentHeight - GlobalStyles().lineHeight,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
})

export default HomeStyles
