import React, { Component } from 'react'
import { TextInput } from 'react-native'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputPasswordProps from '../../interfaces/ILoginInputPasswordProps'

export default class LoginInput extends Component<ILoginInputPasswordProps> {
  state = { valid: undefined, value: '' }

  render() {
    return (
      <TextInput
        placeholderTextColor="rgba(255,255,255,.5)"
        style={loginStyles().input}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => {
          this.setState({ value, valid: true })
          this.props.onChange(value, true)
        }}
        placeholder={this.props.placeholder ?? ''}
      />
    )
  }
}
