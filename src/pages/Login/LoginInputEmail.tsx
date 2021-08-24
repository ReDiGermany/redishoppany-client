import React, { Component } from 'react'
import { TextInput } from 'react-native'
import loginStyles from '../../styles/LoginStyle'
import ILoginInputEmailProps from '../../interfaces/ILoginInputEmailProps'
import { mailRegex } from '../../helper/Constants'
import Language from '../../language/Language'

export default class LoginInputEmail extends Component<ILoginInputEmailProps> {
  state = {
    valid: this.props.value === undefined ? undefined : true,
    value: this.props.value ?? '',
    dimensions: {
      window: undefined,
      screen: undefined,
    },
  }

  // onChange = (dimensions: { window: IScreen; screen: IScreen }) => {
  //   // console.log('LoginInputEmail', dimensions)
  //   this.setState({ dimensions })
  // }

  // componentDidMount() {
  //   Dimensions.addEventListener('change', this.onChange)
  // }

  // componentWillUnmount() {
  //   Dimensions.removeEventListener('change', this.onChange)
  // }

  componentDidMount() {
    if (this.props.value !== undefined) this.onChange(this.props.value)
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

  onChange(value: string): void {
    const valid = value !== '' && value.match(mailRegex) !== null
    this.setState({ value, valid })
    this.props.onChange(value, valid)
  }
}
