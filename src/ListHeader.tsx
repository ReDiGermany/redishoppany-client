import React, { Component } from 'react'
import { Text } from 'react-native'
import ListHeaderStyle from './styles/ListHeaderStyle'

interface IListHeaderProps {
  text: string
  color?: string
}

export default class ListHeader extends Component<IListHeaderProps> {
  render() {
    return (
      <Text style={{ ...ListHeaderStyle, backgroundColor: this.props.color }}>
        {this.props.text}
      </Text>
    )
  }
}
