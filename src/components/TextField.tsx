import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import ITextFieldProps from '../interfaces/ITextFieldProps'
import ITextFieldState from '../interfaces/ITextFieldState'
import TextFieldStyles from '../styles/TextFieldStyles'

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
      <View style={TextFieldStyles.box}>
        <Text style={TextFieldStyles.text}>{this.props.name}</Text>
        <TextInput
          scrollEnabled={isText}
          multiline={isText}
          numberOfLines={isText ? 10 : 1}
          style={TextFieldStyles.input}
          onSubmitEditing={this.props.onSubmit}
          onChange={d => this.props.onChange(d.nativeEvent.text)}
          placeholder={this.props.name}
          placeholderTextColor={'#ffffff80'}
        />
      </View>
    )
  }
}
