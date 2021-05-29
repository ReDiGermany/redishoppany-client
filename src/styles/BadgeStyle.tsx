import { StyleSheet } from 'react-native'

export default (color: string) =>
  StyleSheet.create({
    row: {
      height: 25,
      width: 25,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: color,
      position: 'absolute',
      top: 5,
      right: 5,
      borderRadius: 3,
    },
  }).row
