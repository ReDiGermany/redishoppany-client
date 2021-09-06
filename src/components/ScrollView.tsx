import React, { Component } from 'react'
import { RefreshControl, ScrollView as SV } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import IScrollViewProps from '../interfaces/IScrollViewProps'

export default class ScrollView extends Component<IScrollViewProps> {
  render() {
    let height = GlobalStyles().contentHeight
    if (this.props.hasNavi ?? true) height -= GlobalStyles().barHeight
    if (this.props.hasBottomBar ?? false) height -= GlobalStyles().lineHeight

    return (
      <SV
        refreshControl={
          !(this.props.noRefresh ?? false) ? (
            <RefreshControl
              colors={['#fff']}
              progressBackgroundColor={
                this.props.dark ?? false ? '#111' : 'rgba(255,255,255,.1)'
              }
              refreshing={this.props.refreshing ?? false}
              onRefresh={() => this.props.onRefresh()}
            />
          ) : undefined
        }
        onScroll={e => {
          this.props.isTop?.(e.nativeEvent.contentOffset.y <= 0)
          this.props.notTop?.(e.nativeEvent.contentOffset.y > 0)
        }}
        style={{
          backgroundColor:
            this.props.bgVisible ?? false ? '#4ea53a' : 'transparent',
          height,
        }}
      >
        {this.props.children}
      </SV>
    )
  }
}
