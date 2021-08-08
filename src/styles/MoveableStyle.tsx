import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const box = (visible?: boolean, large?: boolean) =>
  StyleSheet.create({
    box: {
      height: large ? 50 : 50,
      lineHeight: large ? 50 : 50,
      marginBottom: large ? 10 : 0,
      marginLeft: 10,
      marginRight: 10,
      flexDirection: 'row',
      display: visible ? 'flex' : 'none' ?? 'flex',
    },
  }).box

const textBox = (x: number) =>
  StyleSheet.create({
    box: {
      marginLeft: x < 0 ? x : 0,
      backgroundColor: `${GlobalStyles().dark.deep}80`,
      width: '100%',
    },
  }).box

const iconBoxIcon = (width: number) =>
  StyleSheet.create({
    row: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: (width / 50) * 20,
      opacity: width / 50,
      height: GlobalStyles().lineHeight,
      lineHeight: GlobalStyles().lineHeight,
    },
  }).row

const deleteIcon = (x: number) =>
  StyleSheet.create({
    row: {
      textAlign: 'center',
      textAlignVertical: 'center',
      height: GlobalStyles().lineHeight,
      lineHeight: GlobalStyles().lineHeight,
      fontSize: (x / GlobalStyles().lineHeight) * 20,
      fontWeight: 'bold',
      opacity: x / GlobalStyles().lineHeight,
      color: '#fff',
    },
  }).row

const deleteBox = (x: number) =>
  StyleSheet.create({
    row: {
      height: GlobalStyles().lineHeight,
      width: x,
      backgroundColor: GlobalStyles().color.red,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
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
      height: GlobalStyles().lineHeight,
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
    color: GlobalStyles().color.dimmed,
    height: GlobalStyles().lineHeight,
    lineHeight: GlobalStyles().lineHeight,
    textAlignVertical: 'center',
    paddingLeft: 10,
    // opacity: 0.5,
  },
}).row

const styles = StyleSheet.create({
  checkIcon: {
    height: 50,
    lineHeight: 50,
    width: 50,
    textAlignVertical: 'center',
    color: '#4ae53a',
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    width: '100%',
    paddingLeft: 0,
  },
  disabled: {
    opacity: 0.3,
    height: 30,
    lineHeight: 30,
  },
  boldText: {
    fontWeight: 'bold',
  },
})

const textStyle = {
  box: textBox,
  text: textBoxText,
  checkIcon: styles.checkIcon,
  centerText: styles.centerText,
  disabled: styles.disabled,
  boldText: styles.boldText,
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
