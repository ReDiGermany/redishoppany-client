import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const { outerBoxStyle, pressable, scrollView, innerBoxStyle, moveable } =
  StyleSheet.create({
    outerBoxStyle: {
      width: '100%',
      height: GlobalStyles().appHeight,
      position: 'absolute',
      bottom: 0,
    },
    pressable: { width: '100%', height: '100%' },
    innerBoxStyle: {
      width: '100%',
      position: 'absolute',
      backgroundColor: '#202020',
    },
    scrollView: { maxHeight: GlobalStyles().lineHeight * 3.5 },
    moveable: { marginLeft: 0, marginRight: 0 },
  })

const outerBox = (fadeVal: number, style?: any) => ({
  ...outerBoxStyle,
  opacity: fadeVal,
  zIndex: fadeVal === 0 ? -1000 : 1000,
  ...style,
})
const innerBox = (fadeVal: number) => ({
  ...innerBoxStyle,
  bottom: -(
    (3 * GlobalStyles().barHeight + GlobalStyles().barHeight) *
    (1 - fadeVal)
  ),
})

export { outerBox, pressable, innerBox, scrollView, moveable }
