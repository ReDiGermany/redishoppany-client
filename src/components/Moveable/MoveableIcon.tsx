import React, { Component } from 'react'
import { View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { GetLuma } from '../../helper/Functions'
import { rightIconStyle } from '../../styles/MoveableStyle'
import IMoveableIconProps from '../../interfaces/IMoveableIconProps'

export default class MoveableIcon extends Component<IMoveableIconProps> {
  render() {
    const textColor = GetLuma(this.props.color) < 120 ? '#fff' : '#000'

    const width = (this.props.posX / this.props.length) * -1
    const right = width * this.props.index
    const icon = {
      style: { ...rightIconStyle.icon(width), color: textColor },
      name: this.props.icon,
      size: 20,
    }

    const viewStyle = rightIconStyle.box(
      width,
      right,
      this.props.color,
      this.props.last
    )

    return (
      <View style={viewStyle}>
        <Pressable onPress={this.props.click}>
          <Icon {...icon} />
        </Pressable>
      </View>
    )
  }
}
