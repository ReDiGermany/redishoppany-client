import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'

interface ITextFieldProps {
  name: string
  onChange: (_text: string) => void
  onSubmit: () => void
  isText?: boolean
}
interface ITextFieldState {
  value: string
}

export default class TextField extends Component<
  ITextFieldProps,
  ITextFieldState
> {
  state = {
    value: '',
  }

  render() {
    const isText = this.props.isText ?? false

    return (
      <View style={{ padding: 10 }}>
        <Text style={{ color: 'rgba(255,255,255,.8)' }}>{this.props.name}</Text>
        <TextInput
          scrollEnabled={isText}
          multiline={isText}
          numberOfLines={isText ? 10 : 1}
          style={{
            color: '#fff',
            backgroundColor: '#111',
            padding: 10,
            marginTop: 10,
          }}
          onSubmitEditing={this.props.onSubmit}
          onChange={d => this.props.onChange(d.nativeEvent.text)}
          placeholder={this.props.name}
        />
      </View>
    )
  }
}
