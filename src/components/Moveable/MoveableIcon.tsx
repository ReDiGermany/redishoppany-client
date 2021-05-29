import React, { Component } from 'react'
import { View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { rightIconStyle } from '../../styles/MoveableStyle'

interface IMoveableIconProps {
  initX: number
  initY: number
  posX: number
  posY: number
  moving: boolean
  isLeft: boolean
  isRight: boolean
  color: string
  index: number
  // right?: { icon: string; color: string; click: () => void }[];
  length: number
  icon: string
  click: () => void
}

export default class MoveableIcon extends Component<IMoveableIconProps> {
  render() {
    const width = (this.props.posX / this.props.length) * -1
    const right = width * this.props.index
    const icon = {
      style: rightIconStyle.icon(width),
      name: this.props.icon,
      size: 20,
    }
    // console.log(icon)

    return (
      <View style={rightIconStyle.box(width, right, this.props.color)}>
        <Pressable onPress={this.props.click}>
          <Icon {...icon} />
        </Pressable>
      </View>
    )
  }
}
