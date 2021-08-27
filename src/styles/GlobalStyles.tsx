import { Dimensions, Keyboard, StatusBar } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'
import SafeComponent from '../components/SafeComponent'
import IKeyboardDetectionProps from '../interfaces/IKeyboardDetectionProps'

const GlobalHeight = () => {
  const screenHeight = Dimensions.get('screen').height
  const windowHeight = Dimensions.get('window').height
  const statusbarHeight = StatusBar.currentHeight ?? 0
  const appHeight =
    initialWindowMetrics === null
      ? windowHeight
      : initialWindowMetrics.frame.height
  const appWidth = Dimensions.get('window').width

  const data = {
    dark: {
      deep: '#111111',
      light: '#202020',
      bright: 'rgba(255,255,255,.3)',
    },
    color: {
      accent: '#4ae53a80',
      light: '#ffffff',
      dimmed: 'rgba(255,255,255,.5)',
      red: '#A00000',
    },
    appWidth,
    windowHeight,
    screenHeight,
    lineHeight: 50,
    barHeight: 60,
    appHeight,
    statusbarHeight,
    contentHeight: 0,
  }

  const contentHeight =
    (initialWindowMetrics?.frame.height ?? 0) -
    (initialWindowMetrics?.insets.top ?? 0)

  return {
    ...data,
    contentHeight,
    // calculateAble: { ...data.calculateAble, contentHeight },
  }
}

class KeyboardDetection extends SafeComponent<IKeyboardDetectionProps> {
  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this.keyboardDidShow(e)
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>
      this.keyboardDidHide(e)
    )
  }

  keyboardDidShowListener: any = null

  keyboardDidHideListener: any = null

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow(e: any) {
    this.props.update(e.endCoordinates.height + GlobalHeight().statusbarHeight)
  }

  keyboardDidHide(e: any) {
    this.props.update(e.endCoordinates.height)
  }

  render() {
    return this.props.children
  }
}

export default GlobalHeight
export { KeyboardDetection }
