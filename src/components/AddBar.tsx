import React from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IAddBarProps from '../interfaces/IAddBarProps'
import Row from './Row'
import AddBarStyles from '../styles/AddBarStyles'
import SafeComponent from './SafeComponent'
import Language from '../language/Language'
import GlobalStyles from '../styles/GlobalStyles'

export default class AddBar extends SafeComponent<IAddBarProps> {
  state = {
    value: '',
  }

  save() {
    this.setState({ value: '' })
    this.props.onChange?.(this.state.value)
  }

  render() {
    if (!(this.props.visible ?? true)) return <></>

    const textInput: any = {
      value: this.state.value,
      autoFocus: this.props.autoFocus ?? true,
      placeholder: Language.getOrText(this.props.placeholder ?? ''),
      placeholderTextColor: '#ffffff30',
      autoCapitalize: 'none',
      onSubmitEditing: () => this.save(),
      style: AddBarStyles.input,
      onChangeText: (value: string) => {
        this.props.onType?.(value)
        this.setState({ value })
      },
    }

    if ((this.props.type ?? 'text') === 'email') {
      textInput.textContentType = 'emailAddress'
      textInput.keyboardType = 'email-address'
      textInput.autoCompleteType = 'off'
    }

    const icon = {
      onPress: () => this.save(),
      style: AddBarStyles.icon,
      name: this.props.icon ?? 'check',
    }

    return (
      <Row style={{ height: GlobalStyles().barHeight }}>
        <TextInput {...textInput} />
        <Icon {...icon} />
      </Row>
    )
  }
}
