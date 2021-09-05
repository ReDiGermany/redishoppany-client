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
    top: 10,
    right: 10,
    color,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    zIndex: 1,
    fontSize: 10,
  }

  return d
}
