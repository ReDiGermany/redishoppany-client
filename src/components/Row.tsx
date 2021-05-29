import React, { Component } from 'react'
import { View } from 'react-native'
import RowStyle from '../styles/RowStyle'

export default class Row extends Component {
  render() {
    return <View style={RowStyle}>{this.props.children}</View>
  }
}
