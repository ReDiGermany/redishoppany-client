import { StyleSheet } from 'react-native'
import WebStyle from '../helper/WebStyle'
import GlobalStyles from './GlobalStyles'

export default StyleSheet.create({
  row: {
    height: GlobalStyles().barHeight,
    lineHeight: GlobalStyles().barHeight,
    width: GlobalStyles().barHeight,
    ...WebStyle({ cursor: 'pointer' }),
  },
}).row
