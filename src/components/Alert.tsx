import React from 'react'
import { Animated, Pressable, Text } from 'react-native'
import {
  errorColor,
  warningColor,
  infoColor,
  successColor,
  animateAble,
  text,
  info,
  box,
} from '../styles/AelrtStyle'
import IAlertProps from '../interfaces/IAlertProps'
import SafeComponent from './SafeComponent'

export default class Alert extends SafeComponent<IAlertProps> {
  state = {
    fadeAnim: new Animated.Value(0),
    fadeVal: 0,
  }

  componentDidMount() {
    this.state.fadeAnim.addListener(({ value: fadeVal }) => {
      this.setState({ fadeVal })
    })
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
    if (this.props.exit ?? true) {
      setTimeout(this.cancel, 3 * 1000)
    }
  }

  cancel = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      this.props.onClose?.()
    }, 300)
  }

  render() {
    const type = {
      error: errorColor,
      warning: warningColor,
      info: infoColor,
      success: successColor,
    }
    const marginTop =
      -100 * (1 - this.state.fadeVal) - (this.props.yOffset ?? 0)
    const opacity = this.state.fadeVal

    return (
      <Animated.View style={[animateAble, { marginTop, opacity }]}>
        <Pressable onPress={this.cancel} style={[box, type[this.props.type]]}>
          <Text style={text}>{this.props.text}</Text>
          {this.props.info && this.props.info !== '' && (
            <Text style={info}>{this.props.info}</Text>
          )}
        </Pressable>
      </Animated.View>
    )
  }
}
