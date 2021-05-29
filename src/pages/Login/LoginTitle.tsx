import React, { Component } from 'react'
import { Text } from 'react-native'

export default class LoginTitle extends Component {
  render() {
    return (
      <Text
        style={{
          textAlignVertical: 'bottom',
          textAlign: 'center',
          fontSize: 20,
          color: '#fff',
          height: 30,
        }}
      >
        Willkommen bei ReDiShoppany
      </Text>
    )
  }
}
