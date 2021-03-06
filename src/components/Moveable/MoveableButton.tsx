import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
import IconBox from '../IconBox'
import { textStyle } from '../../styles/MoveableStyle'
import IMoveableButtonProps from '../../interfaces/IMoveableButtonProps'
import { GetLuma } from '../../helper/Functions'
import SafeComponent from '../SafeComponent'

export default class MoveableButton extends SafeComponent<IMoveableButtonProps> {
  render() {
    const icon = {
      style: textStyle.right.button(
        this.props.color,
        GetLuma(this.props.color) < 120 ? '#fff' : '#000'
      ),
      name: this.props.icon,
      size: 15,
      onPress: () => {
        if (!(this.props.disabled ?? false)) this.props.onPress?.()
      },
    }

    return (
      <IconBox disabled={this.props.disabled}>
        <Icon {...icon} />
      </IconBox>
    )
  }
}
