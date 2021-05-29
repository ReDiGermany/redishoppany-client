import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { loginStyles } from './Login'

interface ILoginInputEmailProps {
  onChange: (_text: string, _valid: boolean | null) => void
  onSubmit: () => void
}

export default class LoginInputEmail extends Component<ILoginInputEmailProps> {
  state = {
    valid: null,
    value: '',
  }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== null) {
      style = this.state.valid ? 'valid' : 'invalid'
    }

    return (
      <TextInput
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles.input, loginStyles[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => {
          const valid =
            value === ''
              ? null
              : value.match(
                  /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z0-9_.-]{2,4})$/
                ) !== null
          this.setState({ value, valid })
          this.props.onChange(value, valid)
        }}
        placeholder="E-Mail"
        keyboardType="email-address"
      />
    )
  }
}
