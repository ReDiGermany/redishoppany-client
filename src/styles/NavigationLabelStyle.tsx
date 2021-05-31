import { StyleSheet } from 'react-native'
import WebStyle from '../helper/WebStyle'
import GlobalStyles from './GlobalStyles'

export default StyleSheet.create({
  row: {
    color: GlobalStyles().color.light,
    paddingLeft: 15,
    height: GlobalStyles().barHeight,
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    ...WebStyle({ lineHeight: GlobalStyles().barHeight }),
  },
}).row
