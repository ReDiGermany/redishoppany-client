import React, { Component } from 'react'
import { Text } from 'react-native'
import { headingStyle } from '../../styles/SidebarStyle'

interface ISidebarHeadingProps {
  name: string
}

export default class SidebarHeading extends Component<ISidebarHeadingProps> {
  render() {
    return <Text style={headingStyle}>{this.props.name}</Text>
  }
}
