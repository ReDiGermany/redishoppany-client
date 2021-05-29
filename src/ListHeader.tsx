import React, { Component } from 'react'
import { Text } from 'react-native'
import ListHeaderStyle from './styles/ListHeaderStyle'

interface IListHeaderProps {
  text: string
}

export default class ListHeader extends Component<IListHeaderProps> {
  render() {
    return <Text style={ListHeaderStyle}>{this.props.text}</Text>
  }
}
