import React from 'react'
import { TextInput } from 'react-native'
import Language from '../../language/Language'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputPasswordProps from '../../interfaces/ILoginInputPasswordProps'
import SafeComponent from '../../components/SafeComponent'

export default class LoginInputPassword extends SafeComponent<ILoginInputPasswordProps> {
  state = {
    valid: this.props.value === undefined ? undefined : true,
    value: this.props.value ?? '',
  }

  componentDidMount() {
    if (this.props.value !== undefined) this.onChange(this.props.value)
  }

  onChange(value: string): void {
    this.setState({ value, valid: value.length >= 8 })
    this.props.onChange(value, value.length >= 8)
  }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== undefined)
      style = this.state.valid ? 'valid' : 'invalid'
    const lang = this.props.repeat ? 'password.repeat' : 'password'

    return (
      <TextInput
        defaultValue={this.props.value}
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles().input, loginStyles()[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => this.onChange(value)}
        placeholder={Language.get(lang)}
        secureTextEntry={true}
      />
    )
  }
}
