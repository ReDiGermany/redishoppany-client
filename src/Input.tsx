import React, { Component } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IInputProps from './interfaces/IInputProps'
import {
  box,
  button,
  icon,
  prefixBlock,
  textBlock,
  textBlockNoPrefix,
} from './styles/InputStyle'

export default class Input extends Component<IInputProps> {
  state = {
    amount: (this.props.prefix ?? '').toString(),
    text: this.props.text ?? '',
    focus: this.props.focus ?? false,
  }

  render() {
    const onSubmit = () => {
      this.props.onSave(this.state.text, this.state.amount)
      this.setState({
        amount: (this.props.prefix ?? '').toString(),
        text: '',
        focus: this.props.focus ?? false,
      })
    }
    const onChange = (data: any) => {
      this.setState(data)
      this.props.onChange?.(this.state.text, this.state.amount)
    }

    const prefixInput = {
      value: this.state.amount,
      onSubmitEditing: onSubmit,
      onChange: (e: any) => onChange({ amount: e.nativeEvent.text }),
      style: prefixBlock,
      placeholder: this.props.amountPlaceholder ?? 'Num',
    }
    const textInput = {
      value: this.state.text,
      onSubmitEditing: onSubmit,
      onChange: (e: any) => onChange({ text: e.nativeEvent.text }),
      style: [textBlock, !this.props.prefix && textBlockNoPrefix],
      autoFocus: this.state.focus,
      placeholder: this.props.textPlaceholder ?? 'Text',
      placeholderTextColor: '#ffffff80',
    }

    return (
      <View style={box}>
        {this.props.prefix && <TextInput {...prefixInput} />}
        <TextInput {...textInput} />
        <Pressable onPress={onSubmit} style={button}>
          <Icon style={icon} name="check" />
        </Pressable>
      </View>
    )
  }
}
