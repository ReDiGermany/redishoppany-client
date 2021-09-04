import React from 'react'
import { Text } from 'react-native'
import SafeComponent from './SafeComponent'
import { GetLuma } from '../helper/Functions'
import GlobalStyles from '../styles/GlobalStyles'
import ListHeaderStyle from '../styles/ListHeaderStyle'

interface IListHeaderProps {
  text: string
  color?: string
  fullWidth?: boolean
}

export default class ListHeader extends SafeComponent<IListHeaderProps> {
  render() {
    const style = {
      ...ListHeaderStyle,
      backgroundColor: this.props.color,
      ...(this.props.fullWidth && {
        left: 0,
        width: GlobalStyles().appWidth,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }),
      ...(GetLuma(this.props.color ?? '#111') > 150 && { color: '#00000080' }),
    }

    return <Text style={style}>{this.props.text}</Text>
  }
}
