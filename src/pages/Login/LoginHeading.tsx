import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ILoginHeadingProps from '../../interfaces/ILoginHeadingProps'
import LoginHeadingStyles from '../../styles/LineLoginHeadingStyles'

export default class LoginHeading extends Component<ILoginHeadingProps> {
  render() {
    return (
      <View>
        <View style={LoginHeadingStyles.line(this.props.title, true)}></View>
        <View style={LoginHeadingStyles.line(this.props.title, false)}></View>
        <View style={LoginHeadingStyles.textBox}>
          <Text style={LoginHeadingStyles.text}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}
