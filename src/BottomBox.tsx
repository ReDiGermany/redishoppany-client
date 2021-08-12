import React, { Component } from 'react'
import { View, ScrollView, Animated, Pressable } from 'react-native'
import ListHeader from './ListHeader'
import Moveable from './components/Moveable/Moveable'
import GlobalStyles from './styles/GlobalStyles'

interface IBottomBoxProps {
  open?: boolean
  onClose?: () => void
  title?: string
  items?: {
    onClick: () => void
    name: string
    active: boolean
    onDelete?: () => void
    icon?: string
  }[]
  style?: any
  animationState?: (state: number) => void
}

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
    if (prevProps.open !== this.props.open) {
      Animated.timing(this.state.fadeAnim, {
        toValue: this.props.open ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: GlobalStyles().appHeight,
          position: 'absolute',
          bottom: 0,
          opacity: this.state.fadeVal,
          zIndex: this.state.fadeVal === 0 ? -1000 : 1000,
          ...this.props.style,
        }}
      >
        <Pressable
          style={{ width: '100%', height: '100%' }}
          onPress={() => this.props.onClose?.()}
        >
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: -(
                (3 * GlobalStyles().barHeight + GlobalStyles().barHeight) *
                (1 - this.state.fadeVal)
              ),
              backgroundColor: '#202020',
            }}
          >
            {this.props.title && (
              <ListHeader
                fullWidth={true}
                color="#111"
                text={this.props.title}
              />
            )}
            <ScrollView style={{ maxHeight: GlobalStyles().lineHeight * 3.5 }}>
              {this.props.items?.map(item => (
                <Moveable
                  style={{ marginLeft: 0, marginRight: 0 }}
                  fullWidth={true}
                  // centerText={true}
                  boldText={true}
                  bgOpacity="cc"
                  onDelete={item.onDelete}
                  checked={item.active}
                  key={item.name}
                  name={item.name}
                  onClick={item.onClick}
                  icon={item.icon}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </View>
    )
  }
}
