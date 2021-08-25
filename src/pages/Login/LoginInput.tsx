import React from 'react'
import { TextInput } from 'react-native'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputPasswordProps from '../../interfaces/ILoginInputPasswordProps'
import SafeComponent from '../../components/SafeComponent'

export default class LoginInput extends SafeComponent<ILoginInputPasswordProps> {
  state = {
    valid: this.props.value === undefined ? undefined : true,
    value: this.props.value ?? '',
  }

  componentDidMount() {
    if (this.props.value !== undefined) this.onChange(this.props.value, true)
  }

  render() {
    return (
      <TextInput
        defaultValue={this.props.value}
        placeholderTextColor="rgba(255,255,255,.5)"
        style={loginStyles().input}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => this.onChange(value, true)}
        placeholder={this.props.placeholder ?? ''}
      />
    )
  }

  onChange(value: string, valid: boolean) {
    this.setState({ value, valid })
    this.props.onChange(value, valid)
  }
}
