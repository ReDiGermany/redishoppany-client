import React, { Component } from 'react'
import { TextInput } from 'react-native'
import loginStyles from '../../styles/LoginStyle'

interface ILoginInputPasswordProps {
  onChange: (_text: string, _valid: boolean | undefined) => void
  onSubmit: () => void
}

export default class LoginInputPassword extends Component<ILoginInputPasswordProps> {
  state = { valid: undefined, value: '' }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== undefined) {
      style = this.state.valid ? 'valid' : 'invalid'
    }

    return (
      <TextInput
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles.input, loginStyles[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => {
          const valid = true
          this.setState({ value, valid })
          this.props.onChange(value, valid)
        }}
        placeholder="Password"
        secureTextEntry={true}
      />
    )
  }
}
