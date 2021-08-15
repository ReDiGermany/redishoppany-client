import React, { Component } from 'react'
import { View, ScrollView, Animated, Pressable } from 'react-native'
import ListHeader from './ListHeader'
import Moveable from './components/Moveable/Moveable'
import IBottomBoxProps from './interfaces/IBottomBoxProps'
import * as BottomBoxStyles from './styles/BottomBoxStyles'

export default class BottomBox extends Component<IBottomBoxProps> {
  state = {
    open: this.props.open ?? false,
    fadeAnim: new Animated.Value(0),
    fadeVal: 0,
  }

  componentDidMount() {
    this.state.fadeAnim.addListener(({ value: fadeVal }) => {
      this.setState({ fadeVal })
      this.props.animationState?.(fadeVal)
    })
  }

  componentDidUpdate(prevProps: IBottomBoxProps) {
    if (prevProps.open !== this.props.open)
      Animated.timing(this.state.fadeAnim, {
        toValue: this.props.open ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
  }

  render() {
    const outerBox = {
      style: BottomBoxStyles.outerBox(this.state.fadeVal, this.props.style),
    }

    const pressable = {
      style: BottomBoxStyles.pressable,
      onPress: () => this.props.onClose?.(),
    }

    const listHeader = {
      fullWidth: true,
      color: '#111',
      text: this.props.title ?? '',
    }

    const moveable = (item: any) => ({
      style: BottomBoxStyles.moveable,
      fullWidth: true,
      boldText: true,
      bgOpacity: 'cc',
      onDelete: item.onDelete,
      checked: item.active,
      key: item.name,
      name: item.name,
      onClick: item.onClick,
      icon: item.icon,
    })

    return (
      <View {...outerBox}>
        <Pressable {...pressable}>
          <View style={BottomBoxStyles.innerBox(this.state.fadeVal)}>
            {this.props.title && <ListHeader {...listHeader} />}
            <ScrollView style={BottomBoxStyles.scrollView}>
              {this.props.items?.map(item => (
                <Moveable {...moveable(item)} />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </View>
    )
  }
}
