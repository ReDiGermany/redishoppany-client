import React from 'react'
import { View } from 'react-native'
import RowStyle from '../styles/RowStyle'
import IRow from '../interfaces/IRow'
import SafeComponent from './SafeComponent'

export default class Row extends SafeComponent<IRow> {
  render() {
    const style = { ...RowStyle, ...this.props.style }

    return <View style={style}>{this.props.children}</View>
  }
}
