import { TextStyle, ViewStyle } from 'react-native'
import GlobalStyles from './GlobalStyles'

export const container = (solid?: boolean) => {
  const d: ViewStyle = {
    minHeight: GlobalStyles().barHeight,
    flexDirection: 'row',
    backgroundColor: solid ?? true ? '#202020' : 'transparent',
  }

  return d
}
export const badge = (color: string) => {
  const d: TextStyle = {
    position: 'absolute',
    top: 15,
    right: 15,
    height: 10,
    width: 10,
    backgroundColor: color,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
    // borderRadius: 3,
    borderRadius: 10,
    zIndex: 1,
    fontSize: 10,
  }

  return d
}
