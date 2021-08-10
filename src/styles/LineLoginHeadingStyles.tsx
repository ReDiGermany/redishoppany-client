import { StyleSheet } from 'react-native'
import { calcText } from '../helper/Functions'
import GlobalStyles from './GlobalStyles'

const LineLoginHeadingStyles = (title: string, left: boolean) =>
  StyleSheet.create({
    line: {
      zIndex: 1,
      height: 1,
      width: (GlobalStyles().appWidth - 50 - calcText(title)) / 2,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 25,
      right: left ? undefined : 20,
      left: left ? 20 : undefined,
      opacity: 0.2,
    },
  }).line
const LoginHeadingStylesStyles = StyleSheet.create({
  textBox: {
    paddingTop: 15,
    paddingBottom: 8,
    alignItems: 'center',
    zIndex: 2,
    height: 40,
  },
  text: {
    textAlignVertical: 'center',
    color: 'rgba(255,255,255,.5)',
    textAlign: 'center',
  },
})
const LoginHeadingStyles = {
  line: LineLoginHeadingStyles,
  ...LoginHeadingStylesStyles,
}
export default LoginHeadingStyles
