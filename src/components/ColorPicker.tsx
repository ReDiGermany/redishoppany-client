import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { HSLToHex } from '../helper/Functions'
import GlobalStyles from '../styles/GlobalStyles'
import IColorPickerProps from '../interfaces/IColorPickerProps'
import ColorPickerStyles from '../styles/ColorPickerStyles'
import SafeComponent from './SafeComponent'

export default class ColorPicker extends SafeComponent<IColorPickerProps> {
  parseValue(x: number) {
    let posX = x / (GlobalStyles().appWidth - 10)
    if (posX < 0) posX = 0
    if (posX > 1) posX = 1
    this.props.onChange(HSLToHex(359 * posX), posX)
  }

  render() {
    const colors: string[] = []
    for (let i = 0; i < 9; i++) colors.push(HSLToHex(359 * (0.125 * i)))

    const onTouchStart = (e: any) => {
      this.parseValue(e.nativeEvent.pageX)
      this.props.onStart?.()
    }
    const onTouchMove = (e: any) => this.parseValue(e.nativeEvent.pageX)
    const onTouchEnd = (e: any) => {
      this.parseValue(e.nativeEvent.pageX)
      this.props.onEnd()
    }

    const linearGradient = {
      colors,
      style: ColorPickerStyles,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    }

    return <LinearGradient {...linearGradient} />
  }
}
