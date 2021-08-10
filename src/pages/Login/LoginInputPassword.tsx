import React, { Component } from 'react'
import { TextInput } from 'react-native'
import Language from '../../language/Language'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputPasswordProps from '../../interfaces/ILoginInputPasswordProps'

export default class LoginInputPassword extends Component<ILoginInputPasswordProps> {
  state = { valid: undefined, value: '' }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== undefined)
      style = this.state.valid ? 'valid' : 'invalid'

    return (
      <TextInput
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles().input, loginStyles()[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => {
          this.setState({ value, valid: true })
          this.props.onChange(value, true)
        }}
        placeholder={Language.get('password')}
        secureTextEntry={true}
      />
    )
  }
}
