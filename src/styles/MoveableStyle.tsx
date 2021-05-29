import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const box = (visible?: boolean) =>
  StyleSheet.create({
    box: {
      height: 50,
      lineHeight: 50,
      flexDirection: 'row',
      display: visible ? 'flex' : 'none' ?? 'flex',
    },
  }).box

const textBox = (x: number) =>
  StyleSheet.create({
    box: {
      marginLeft: x < 0 ? x : 0,
      backgroundColor: GlobalStyles.dark.deep,
      width: '100%',
      borderBottomColor: GlobalStyles.dark.bright,
      borderBottomWidth: 1,
      // backgroundColor: "#4ae53a",
    },
  }).box

const iconBoxIcon = (width: number) =>
  StyleSheet.create({
    row: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: (width / 50) * 20,
      opacity: width / 50,
      height: GlobalStyles.lineHeight,
      lineHeight: GlobalStyles.lineHeight,
    },
  }).row

const deleteIcon = (x: number) =>
  StyleSheet.create({
    row: {
      textAlign: 'center',
      textAlignVertical: 'center',
      height: GlobalStyles.lineHeight,
      lineHeight: GlobalStyles.lineHeight,
      fontSize: (x / GlobalStyles.lineHeight) * 20,
      fontWeight: 'bold',
      opacity: x / GlobalStyles.lineHeight,
    },
  }).row

const deleteBox = (x: number) =>
  StyleSheet.create({
    row: {
      height: GlobalStyles.lineHeight,
      width: x,
      backgroundColor: GlobalStyles.color.red,
    },
  }).row

const buttonIcon = (color: string) =>
  StyleSheet.create({
    box: {
      borderRadius: 5,
      height: 30,
      lineHeight: 30,
      marginTop: 10,
      marginLeft: 10,
      width: 40,
      backgroundColor: color,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  }).box

const iconBox = (width: number, right: number, color: string) =>
  StyleSheet.create({
    row: {
      height: GlobalStyles.lineHeight,
      width,
      backgroundColor: color,
      position: 'absolute',
      top: 0,
      right,
    },
  }).row

const textBoxText = StyleSheet.create({
  text: {
    height: 50,
    textAlignVertical: 'center',
    paddingLeft: 10,
    color: '#fff',
    lineHeight: 50,
  },
}).text

const textPrefix = StyleSheet.create({
  row: {
    color: GlobalStyles.color.dimmed,
    height: GlobalStyles.lineHeight,
    lineHeight: GlobalStyles.lineHeight,
    textAlignVertical: 'center',
    paddingLeft: 10,
    // opacity: 0.5,
  },
}).row

const textBoxCheckIcon = StyleSheet.create({
  row: {
    height: 50,
    lineHeight: 50,
    width: 50,
    textAlignVertical: 'center',
    color: '#4ae53a',
    textAlign: 'center',
  },
}).row

const textStyle = {
  box: textBox,
  text: textBoxText,
  checkIcon: textBoxCheckIcon,
  right: {
    button: buttonIcon,
  },
  left: {
    prefix: textPrefix,
  },
}
const deleteIconStyle = {
  icon: deleteIcon,
  box: deleteBox,
}
const rightIconStyle = {
  box: iconBox,
  icon: iconBoxIcon,
}

export { box as boxStyle, textStyle, deleteIconStyle, rightIconStyle }
