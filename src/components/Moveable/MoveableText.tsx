import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Row from '../Row'
import MoveableButton from './MoveableButton'
import MoveableTextPrefix from './MoveableTextPrefix'
import RowFlexStyle from '../../styles/RowFlexStyle'
import MoveableTextDropdown from './MoveableTextDropdown'
import { textStyle } from '../../styles/MoveableStyle'
import IMoveableTextProps from '../../interfaces/IMoveableTextProps'
import GlobalStyles from '../../styles/GlobalStyles'

export default class MoveableText extends Component<IMoveableTextProps> {
  state = {
    longPressTimer: setTimeout(() => {}, 0),
  }

  render() {
    const onTouchEnd = () => {
      clearTimeout(this.state.longPressTimer)
      this.props.onRelease?.()
    }

    const onTouchStart = () => {
      this.props.touchStart?.()
      this.setState({
        longPressTimer: setTimeout(() => {
          this.props.onLongPress?.()
        }, 1000),
      })
    }

    const onResponderGrant = (e: any) => {
      const initX = parseInt(e.nativeEvent.pageX, 10)
      const initY = parseInt(e.nativeEvent.pageY, 10)
      this.props.onStart?.(initX, initY)
    }

    const link = {
      style: RowFlexStyle,
    }

    const style = {
      ...textStyle.box(this.props.posX),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRadius: 0,
    }
    if (this.props.posX === 0 && (this.props.large ?? false) === true) {
      style.borderRadius = 10
      style.borderBottomLeftRadius = 10
      style.borderBottomRightRadius = 10
    }
    if (this.props.last ?? false) {
      style.borderBottomLeftRadius = 10
      style.borderBottomRightRadius = 10
    }
    if (this.props.bgOpacity !== undefined) {
      style.backgroundColor = `${GlobalStyles().dark.deep}${
        this.props.bgOpacity
      }`
    }
    if (this.props.fullWidth ?? false) {
      style.marginLeft = 0
    }
    // console.log(style)
    // opacity: this.props.bgOpacity,

    const box = {
      style,
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: () => true,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
      onTouchStart,
      onResponderEnd: () => this.props.onRelease?.(),
      onResponderMove: (e: any) => this.props.handle?.(e),
      onResponderTerminate: () => this.props.onRelease?.(),
      onResponderRelease: () => {
        this.props.onRelease?.()
        this.props.stop?.()
      },
      onResponderGrant: (e: any) => onResponderGrant(e),
      onResponderReject: () => this.props.onRelease?.(),
    }

    return (
      <View {...box}>
        <Row>
          <Pressable onPress={this.props.onClick} {...link}>
            <Row>
              {this.props.icon && (
                <Icon
                  style={{
                    color: '#fff',
                    height: 50,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 15,
                    opacity: 0.5,
                    marginHorizontal: 10,
                  }}
                  name={this.props.icon}
                />
              )}
              {this.props.prefix && (
                <MoveableTextPrefix
                  disabled={this.props.disabled}
                  text={this.props.prefix}
                />
              )}
              {this.props.text && (
                <Text
                  style={{
                    ...textStyle.text,
                    ...(this.props.centerText && textStyle.centerText),
                    ...(this.props.disabled && textStyle.disabled),
                    ...(this.props.boldText && textStyle.boldText),
                    ...(this.props.bgOpacity && {}),
                  }}
                >
                  {this.props.text}
                </Text>
              )}
            </Row>
            {this.props.dropdownItems && this.props.dropdownSelected && (
              <MoveableTextDropdown
                dropdownItems={this.props.dropdownItems}
                dropdownSelected={this.props.dropdownSelected}
                selectedItem={this.props.selectedItem}
              />
            )}
          </Pressable>
          {this.props.buttons?.map(btn => (
            <MoveableButton key={btn.name} {...btn} />
          ))}
          {this.props.checked && (
            <Icon name="check" size={20} style={textStyle.checkIcon} />
          )}
        </Row>
      </View>
    )
  }
}
