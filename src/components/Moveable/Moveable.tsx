import React from 'react'
import { View, ViewStyle } from 'react-native'
import { boxStyle } from '../../styles/MoveableStyle'
import IMoveableProps from '../../interfaces/IMoveableProps'
import MoveableDeleteIcon from './MoveableDeleteIcon'
import MoveableIcon from './MoveableIcon'
import MoveableText from './MoveableText'
import SafeComponent from '../SafeComponent'

export default class Moveable extends SafeComponent<IMoveableProps> {
  state = {
    initX: 0,
    initY: 0,
    posX: 0,
    posY: 0,
    moving: false,
    isLeft: false,
    isRight: false,
    movingLeft: false,
    movingRight: false,
    longPress: false,
  }

  initX = 0

  initY = 0

  handle = (e: any) => {
    const actual = Math.round(e.nativeEvent.pageX)

    let posX = Math.round(actual - this.initX)

    if (posX > 0 && !this.props.onDelete) return
    if (posX < 0 && !this.props.right) return

    if (posX > 40) {
      posX = 50
    } else if (posX < -40 * (this.props.right?.length ?? 0)) {
      posX = -50 * (this.props.right?.length ?? 0)
    }

    if (this.state.isRight && posX < 0) posX = 0
    if (this.state.isLeft && posX > 0) posX = 0

    if (!this.state.moving) this.props.onPop?.()
    this.props.onMoving?.(posX <= -20, posX >= 20)
    this.setState({
      posX,
      movingLeft: posX <= -20,
      movingRight: posX >= 20,
    })
  }

  start = (initX: number, initY: number) => {
    this.initX = initX
    this.initY = initY
    this.setState({
      initX,
      initY,
      moving: true,
      isLeft: false,
      isRight: false,
      posX: 0,
      posY: 0,
    })
  }

  stop = () => {
    let isRight = false
    let isLeft = false
    if (this.state.posX > 40) {
      isLeft = true
      this.setState({ isLeft })
    } else if (this.state.posX < -40 * (this.props.right?.length ?? 0)) {
      isRight = true
      this.setState({ isRight })
    }
    // console.log("stop", this.state.posX, { isRight, isLeft });
    let posX = 0
    if (isLeft) posX = 50
    if (isRight) posX = -50 * (this.props.right?.length ?? 0)
    this.setState({
      posX,
      moving: false,
      movingLeft: posX <= -20,
      movingRight: posX >= 20,
    })
    this.props.onMoving?.(posX <= -20, posX >= 20)
  }

  componentDidUpdate(old: IMoveableProps) {
    if (old.open && !this.props.open) this.setState({ posX: 0 })
  }

  resetMovement = () =>
    this.setState({
      initX: 0,
      initY: 0,
      moving: true,
      isLeft: false,
      isRight: false,
      posX: 0,
      posY: 0,
    })

  getIcon(
    item: { icon: string; color: string; click: () => void },
    index: number,
    last: boolean
  ) {
    const moveableIcon = {
      key: index,
      length: this.props.right?.length ?? 0,
      index,
      ...item,
      ...this.state,
      last,
    }

    if (this.state.posX < 0) return <MoveableIcon {...moveableIcon} />

    return <View key={index}></View>
  }

  render() {
    let style: ViewStyle = {
      ...boxStyle(this.props.visible ?? true, this.props.large ?? false),
      ...this.props.style,
      borderBottomWidth: 0,
      borderBottomColor: '#00000080',
      marginHorizontal: this.state.posX === 0 ? 10 : 0,
    }

    if (this.props.disabled ?? false) style.height = 30
    if (!this.props.fullWidth ?? false) style.marginHorizontal = 0
    if (this.state.longPress)
      style = {
        ...style,
        position: 'absolute',
        top: this.state.posY,
        transform: [{ scale: 1.1 }],
      }

    if (!(this.props.last ?? false) && !(this.props.large ?? false))
      style.borderBottomWidth = 2

    return (
      <View style={style}>
        {this.state.posX > 0 && this.props.onDelete && (
          <MoveableDeleteIcon
            onPress={this.props.onDelete}
            posX={this.state.posX}
          />
        )}
        <MoveableText
          onLongPress={() => this.props.onLongPress?.()}
          onRelease={() => {
            this.stop()
            this.props.onRelease?.()
          }}
          touchStart={this.resetMovement}
          text={this.props.name}
          stop={this.stop}
          handle={this.handle}
          onStart={this.start}
          posX={this.state.posX}
          {...this.props}
        />
        {this.props.right?.map((item, index) =>
          this.getIcon(item, index, index === 0)
        )}
      </View>
    )
  }
}
