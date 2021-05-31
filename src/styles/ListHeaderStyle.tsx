import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

export default StyleSheet.create({
  row: {
    backgroundColor: GlobalStyles().dark.light,
    color: GlobalStyles().dark.bright,
    height: GlobalStyles().barHeight,
    lineHeight: GlobalStyles().barHeight,
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 20,
  },
}).row
