import React, { Component } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { HSLToHex } from '../helper/Functions'
import GlobalStyles from '../styles/GlobalStyles'

interface IColorPickerProps {
  onChange: (value: string, x: number) => void
  onStart: () => void
  onEnd: () => void
}

export default class ColorPicker extends Component<IColorPickerProps> {
  parseValue(x: number) {
    let posX = x / (GlobalStyles().appWidth - 10)
    if (posX < 0) posX = 0
    if (posX > 1) posX = 1
    this.props.onChange(HSLToHex(359 * posX), posX)
  }

  render() {
    const colors: string[] = []
    for (let i = 0; i < 9; i++) {
      colors.push(HSLToHex(359 * (0.125 * i)))
    }

    return (
      <>
        <LinearGradient
          colors={colors}
          style={{
            marginBottom: 10,
            marginHorizontal: 10,
            height: 50,
            borderRadius: 5,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          onTouchStart={e => {
            this.parseValue(e.nativeEvent.pageX)
            this.props.onStart()
          }}
          onTouchMove={e => this.parseValue(e.nativeEvent.pageX)}
          onTouchEnd={e => {
            this.parseValue(e.nativeEvent.pageX)
            this.props.onEnd()
          }}
        ></LinearGradient>
      </>
    )
  }
}
