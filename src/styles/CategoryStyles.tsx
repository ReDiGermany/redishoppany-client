import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const width = GlobalStyles().appWidth / 4 - 20

const CategoryStyles = StyleSheet.create({
  mainColors: {
    margin: 10,
    width,
    height: width,
    borderRadius: GlobalStyles().appWidth / 8,
  },
  row: { width: GlobalStyles().appWidth },
  customColorText: {
    width,
    height: width,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 10,
    opacity: 0.5,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default CategoryStyles
