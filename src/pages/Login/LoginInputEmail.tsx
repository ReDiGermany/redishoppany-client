import React from 'react'
import { TextInput } from 'react-native'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputEmailProps from '../../interfaces/ILoginInputEmailProps'
import { mailRegex } from '../../helper/Constants'
import Language from '../../language/Language'
import SafeComponent from '../../components/SafeComponent'

export default class LoginInputEmail extends SafeComponent<ILoginInputEmailProps> {
  state = {
    valid: this.props.value === undefined ? undefined : true,
    value: this.props.value ?? '',
    dimensions: {
      window: undefined,
      screen: undefined,
    },
  }

  componentDidMount() {
    if (this.props.value !== undefined) this.onChange(this.props.value)
  }

  onChange(value: string): void {
    const valid = value !== '' && value.match(mailRegex) !== null
    this.setState({ value, valid })
    this.props.onChange(value, valid)
  }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== undefined)
      style = this.state.valid ? 'valid' : 'invalid'

    return (
      <TextInput
        defaultValue={this.props.value}
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles().input, loginStyles()[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => this.onChange(value)}
        placeholder={Language.get('email')}
        keyboardType="email-address"
      />
    )
  }
}
