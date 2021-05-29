import React, { Component } from 'react'
import { View } from 'react-native'

interface IInputProps {
  onSave: (_value: string) => void
}

export default class Input extends Component<IInputProps> {
  render() {
    return <View></View>
  }
}
