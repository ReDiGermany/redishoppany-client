import React, { Component } from 'react'
import { View, ScrollView, Animated, Pressable } from 'react-native'
import ListHeader from './ListHeader'
import Moveable from './components/Moveable/Moveable'
import GlobalStyles from './styles/GlobalStyles'

interface IBottomBoxProps {
  open?: boolean
  onClose?: () => void
  title?: string
  items?: { onClick: () => void; name: string }[]
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
          height: GlobalStyles().contentHeight,
          backgroundColor: 'rgba(0,0,0,.8)',
          position: 'absolute',
          bottom: -50,
          opacity: this.state.fadeVal,
          zIndex: this.state.fadeVal === 0 ? -1000 : 1000,
        }}
      >
        <Pressable
          style={{ width: '100%', height: '100%' }}
          onPress={() => {
            this.props.onClose?.()
          }}
        >
          <View
            onTouchStart={e => {
              e.stopPropagation()
            }}
            style={{
              //   height: 300,
              width: '100%',
              position: 'absolute',
              // bottom: 0,
              bottom: -(
                (3 * GlobalStyles().barHeight + GlobalStyles().barHeight) *
                (1 - this.state.fadeVal)
              ),
            }}
          >
            {this.props.title && <ListHeader text={this.props.title} />}
            <ScrollView style={{ maxHeight: GlobalStyles().lineHeight * 3.5 }}>
              {this.props.items?.map(item => (
                <Moveable
                  key={item.name}
                  name={item.name}
                  onClick={item.onClick}
                />
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </View>
    )
  }
}
