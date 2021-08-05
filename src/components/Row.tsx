import React, { Component } from 'react'
import { View } from 'react-native'
import RowStyle from '../styles/RowStyle'
import IRow from '../interfaces/IRow'

export default class Row extends Component<IRow> {
  render() {
    return (
      <View style={{ ...RowStyle, ...this.props.style }}>
        {this.props.children}
      </View>
    )
  }
}
