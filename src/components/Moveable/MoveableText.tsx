import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Row from '../Row'
import MoveableButton from './MoveableButton'
import MoveableTextPrefix from './MoveableTextPrefix'
import RowFlexStyle from '../../styles/RowFlexStyle'
import MoveableTextDropdown from './MoveableTextDropdown'
import { textStyle } from '../../styles/MoveableStyle'

interface IMoveableTextProps {
  posX: number
  onStart?: (_x: number, _y: number) => void
  handle?: (_e: any) => void
  stop?: () => void
  touchStart?: () => void
  text?: string
  buttons?: { name: string; icon: string; color: string; onPress: () => void }[]
  prefix?: number | string
  to?: string
  onLongPress?: () => void
  onRelease?: () => void
  dropdownItems?: { label: string; value: string }[]
  dropdownSelected?: (_item: { label: string; value: string }) => void
  checked?: boolean
  onClick?: () => void
  centerText?: boolean
}

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
      // to: this.props.to ?? '#',
      // activeOpacity: 1,
      // component: TouchableOpacity,
      style: RowFlexStyle,
    }

    const box = {
      style: {
        ...textStyle.box(this.props.posX),
        ...(this.props.posX === 0 ? { borderRadius: 10 } : { borderRadius: 0 }),
      },
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: () => true,
      onTouchEnd,
      onTouchCancel: onTouchEnd,
      onTouchStart,
      onResponderEnd: () => {
        this.props.onRelease?.()
        // console.log("onResponderEnd");
      },
      onResponderMove: (e: any) => {
        // console.log("onResponderMove");
        this.props.handle?.(e)
      },
      onResponderStart: () => {
        // console.log("onResponderStart");
      },
      // onResponderTerminationRequest: () => {
      //   console.log("onResponderTerminationRequest");
      // },
      onResponderTerminate: () => {
        this.props.onRelease?.()
        // console.log("onResponderTerminate");
      },
      onResponderRelease: () => {
        // console.log("onResponderRelease");
        this.props.onRelease?.()
        this.props.stop?.()
      },
      onResponderGrant: (e: any) => {
        // console.log("onResponderGrant");
        onResponderGrant(e)
      },
      onResponderReject: () => {
        // console.log("onResponderReject");
        this.props.onRelease?.()
      },
    }

    return (
      <View {...box}>
        <Row>
          <Pressable onPress={this.props.onClick} {...link}>
            <Row>
              {this.props.prefix && (
                <MoveableTextPrefix text={this.props.prefix} />
              )}
              {this.props.text && (
                <Text
                  style={{
                    ...textStyle.text,
                    ...(this.props.centerText
                      ? { textAlign: 'center', width: '100%', paddingLeft: 0 }
                      : {}),
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
