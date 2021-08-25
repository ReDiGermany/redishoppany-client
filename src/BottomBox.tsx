import React from 'react'
import { View, ScrollView, Animated, Pressable } from 'react-native'
import ListHeader from './ListHeader'
import Moveable from './components/Moveable/Moveable'
import IBottomBoxProps from './interfaces/IBottomBoxProps'
import * as BottomBoxStyles from './styles/BottomBoxStyles'
import SafeComponent from './components/SafeComponent'

export default class BottomBox extends SafeComponent<IBottomBoxProps> {
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

  componentWillUnmount() {
    // https://stackoverflow.com/a/61055910
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (_state, _callback) => {}
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
