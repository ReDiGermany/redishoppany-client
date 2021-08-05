import React from 'react'
import { Pressable, View } from 'react-native'
import { boxStyle } from '../../styles/MoveableStyle'
import IMoveableProps from '../../interfaces/IMoveableProps'
import MoveableDeleteIcon from './MoveableDeleteIcon'
import MoveableIcon from './MoveableIcon'
import MoveableText from './MoveableText'

export default class Moveable extends React.Component<IMoveableProps> {
  state = {
    initX: 0,
    initY: 0,
    posX: 0,
    posY: 0,
    moving: false,
    isLeft: false,
    isRight: false,
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

    // console.log("move", posX, { isRight, isLeft });

    if (this.state.isRight && posX < 0) posX = 0
    if (this.state.isLeft && posX > 0) posX = 0

    if (!this.state.moving) this.props.onPop?.()
    this.setState({ posX })
  }

  start = (initX: number, initY: number) => {
    // console.log("start", initX);
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
    })
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

  render() {
    const moveableText = {
      onLongPress: this.props.onLongPress,
      onRelease: () => {
        this.stop()
        this.props.onRelease?.()
      },
      touchStart: this.resetMovement,
      to: this.props.to,
      prefix: this.props.prefix,
      text: this.props.name,
      stop: this.stop,
      handle: this.handle,
      onStart: this.start,
      posX: this.state.posX,
      buttons: this.props.buttons,
      dropdownItems: this.props.dropdownItems,
      dropdownSelected: this.props.dropdownSelected,
      checked: this.props.checked,
      onClick: this.props.onClick,
      centerText: this.props.centerText,
    }

    const getIcon = (
      item: { icon: string; color: string; click: () => void },
      index: number
    ) => {
      const moveableIcon = {
        key: index,
        length: this.props.right?.length ?? 0,
        index,
        ...item,
        ...this.state,
      }

      if (this.state.posX < 0) return <MoveableIcon {...moveableIcon} />

      return <View key={index}></View>
    }

    return (
      <Pressable
        onPress={this.props.onClick}
        style={{
          ...boxStyle(this.props.visible ?? true, this.props.large ?? false),
          ...this.props.style,
          ...(this.state.posX === 0
            ? { marginLeft: 10, marginRight: 10 }
            : { marginLeft: 0, marginRight: 0 }),
        }}
      >
        {this.state.posX > 0 && this.props.onDelete && (
          <MoveableDeleteIcon posX={this.state.posX} />
        )}
        <MoveableText {...moveableText} />
        {this.props.right?.map((item, index) => getIcon(item, index))}
      </Pressable>
    )
  }
}
