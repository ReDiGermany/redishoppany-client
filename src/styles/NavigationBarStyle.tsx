import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

export default StyleSheet.create({
  container: {
    minHeight: GlobalStyles().barHeight,
    flexDirection: 'row',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    zIndex: 1,
    fontSize: 10,
  },
})
