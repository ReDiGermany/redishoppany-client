import React from 'react'
import { View, Text, Pressable, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Row from '../Row'
import MoveableButton from './MoveableButton'
import MoveableTextPrefix from './MoveableTextPrefix'
import RowFlexStyle from '../../styles/RowFlexStyle'
import MoveableTextDropdown from './MoveableTextDropdown'
import { textStyle } from '../../styles/MoveableStyle'
import IMoveableTextProps from '../../interfaces/IMoveableTextProps'
import GlobalStyles from '../../styles/GlobalStyles'
import SafeComponent from '../SafeComponent'

export default class MoveableText extends SafeComponent<IMoveableTextProps> {
  state = {
    longPress: false,
    posY: 0,
    startY: 0,
  }

  timer: any = null

  render() {
    const onTouchEnd = () => {
      clearTimeout(this.timer)
      this.props.onRelease?.()
      this.setState({ longPress: false, posY: 0, startY: 0 })
    }

    const onTouchStart = (e: any) => {
      this.timer = setTimeout(() => {
        this.setState({ longPress: true })
        this.props.onLongPress?.()
      }, 500)
      this.props.touchStart?.()
      const startX = parseInt(e.nativeEvent.pageX, 10)
      const startY = parseInt(e.nativeEvent.pageY, 10)
      this.setState({ startY })
      this.props.onStart?.(startX, startY)
    }

    const linkSstyle: ViewStyle = {
      ...RowFlexStyle,
      position: 'relative',
      top: 0,
      left: 0,
    }

    let style: ViewStyle = {
      ...textStyle.box(this.props.posX),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderRadius: 0,
    }
    if (this.props.posX === 0 && (this.props.large ?? false) === true)
      style = {
        ...style,
        borderRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }

    if (this.props.last ?? false)
      style = {
        ...style,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }
    if (this.props.bgOpacity !== undefined)
      style.backgroundColor = `${GlobalStyles().dark.deep}${
        this.props.bgOpacity
      }`
    if (this.props.fullWidth ?? false) style.marginLeft = 0
    if (this.props.bgColor) style.backgroundColor = this.props.bgColor

    const isSorting = this.state.longPress && this.props.onSort !== undefined

    if (isSorting) {
      style = {
        ...style,
        transform: [{ scale: 1.03 }],
        position: 'absolute',
        top: this.state.posY - this.state.startY,
        zIndex: 30000,
        // height: GlobalStyles().lineHeight,

        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }
    }

    const fullTextStyle = {
      ...textStyle.text,
      ...(this.props.centerText && textStyle.centerText),
      ...(this.props.disabled && textStyle.disabled),
      ...((this.props.boldText || isSorting) && textStyle.boldText),
    }

    return (
      <View style={style}>
        <Row>
          <Pressable
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            onTouchStart={onTouchStart}
            onResponderEnd={() => this.props.onEnd?.()}
            onTouchMove={(e: any) => {
              if (!this.state.longPress) {
                this.props.handle?.(e)
              } else if (this.props.onSort !== undefined) {
                this.setState({ posY: e.nativeEvent.pageY })
                this.props.onSort?.(this.state.posY)
              }
            }}
            onResponderTerminate={() => this.props.onRelease?.()}
            onResponderRelease={() => {
              this.props.onRelease?.()
              this.props.stop?.()
            }}
            onResponderReject={() => this.props.onRelease?.()}
            onPress={() => this.props.onClick?.()}
            style={linkSstyle}
          >
            <Row>
              {this.props.icon !== undefined && (
                <Icon style={textStyle.textIcon} name={this.props.icon} />
              )}
              {this.props.prefix !== undefined && (
                <MoveableTextPrefix
                  disabled={this.props.disabled}
                  text={this.props.prefix}
                />
              )}
              {this.props.text !== undefined && (
                <Text style={fullTextStyle}>{this.props.text}</Text>
              )}
              {this.props.secondText !== undefined && (
                <Text
                  style={{
                    ...fullTextStyle,
                    marginTop: 20,
                    position: 'absolute',
                    color: `rgba(255,255,255,${
                      this.props.secondTextOpacity ?? 1
                    })`,
                  }}
                >
                  {this.props.secondText}
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
          {this.props.badge !== undefined && (
            <Text style={textStyle.badge}>{this.props.badge.toString()}</Text>
          )}
          {(this.props.shared ?? false) && (
            <Text style={textStyle.shared}>shared</Text>
          )}
          {!isSorting &&
            (!this.props.disabled ?? false) &&
            this.props.buttons?.map(btn => (
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
