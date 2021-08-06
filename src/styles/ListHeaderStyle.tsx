import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'
// GlobalStyles().dark.light
export default StyleSheet.create({
  row: {
    left: 10,
    width: GlobalStyles().appWidth - 20,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: '#ffffff80',
    height: 25,
    lineHeight: 25,
    textAlignVertical: 'center',
    paddingLeft: 10,
    fontSize: 15,
    textAlign: 'center',
  },
}).row
