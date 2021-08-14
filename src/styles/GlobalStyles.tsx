import React from 'react'
import { Dimensions, Keyboard, StatusBar } from 'react-native'
import IKeyboardDetectionProps from '../interfaces/IKeyboardDetectionProps'

const GlobalHeight = () => {
  const appHeight =
    Dimensions.get('window').height + (StatusBar.currentHeight ?? 0)
  const appWidth = Dimensions.get('window').width

  // window.ResizeObserver = { new (callback: ResizeObserverCallback): ResizeObserver; prototype: ResizeObserver; }

  const data = {
    dark: {
      deep: '#111111',
      light: '#202020',
      bright: 'rgba(255,255,255,.3)',
    },
    color: {
      accent: '#015AA2',
      light: '#ffffff',
      dimmed: 'rgba(255,255,255,.5)',
      red: '#A00000',
    },
    appWidth,
    lineHeight: 50,
    barHeight: 60,
    appHeight,
    statusbarHeight: StatusBar.currentHeight ?? 0,
    contentHeight: 0,
  }

  const contentHeight =
    data.appHeight - data.barHeight - data.statusbarHeight + 10

  return {
    ...data,
    contentHeight,
    // calculateAble: { ...data.calculateAble, contentHeight },
  }
}

class KeyboardDetection extends React.Component<IKeyboardDetectionProps> {
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
