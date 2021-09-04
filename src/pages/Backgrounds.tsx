import React, { Component } from 'react'
import { View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import Moveable from '../components/Moveable/Moveable'
import Navigation from '../components/Navigation'
import GlobalStyles from '../styles/GlobalStyles'

export default class Backgrounds extends Component {
  state = {
    item: 0,
    items: [
      'BG1',
      'BG2',
      'BG3',
      'BG4',
      'BG5',
      'BG6',
      'BG7',
      'BG8',
      'BG9',
      'BG10',
      'BG11',
    ],
  }

  render() {
    return (
      <BackgroundImage image={this.state.item}>
        <View style={{ height: GlobalStyles().appHeight }}>
          <Navigation label="BG SWITCH" url="/settings" />
          {this.state.items.map((item, idx) => (
            <Moveable
              key={idx}
              name={item}
              large={true}
              onClick={() => this.setState({ item: idx })}
              checked={this.state.item === idx}
            />
          ))}
        </View>
      </BackgroundImage>
    )
  }
}
