import Icon from 'react-native-vector-icons/FontAwesome5'
import React, { Component } from 'react'
import IconBox from '../IconBox'
import { textStyle } from '../../styles/MoveableStyle'

interface IMoveableButtonProps {
  name: string
  icon: string
  color: string
  onPress?: () => void
}

export default class MoveableButton extends Component<IMoveableButtonProps> {
  render() {
    const icon = {
      style: textStyle.right.button(this.props.color),
      name: this.props.icon,
      size: 15,
      onPress: this.props.onPress,
    }
    // console.log(icon)

    return (
      <IconBox>
        <Icon {...icon} />
      </IconBox>
    )
  }
}
