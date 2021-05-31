import React, { Component } from 'react'
import { View, Text } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyles'

interface ILoginHeadingProps {
  title: string
}

export default class LoginHeading extends Component<ILoginHeadingProps> {
  render() {
    return (
      <View>
        <View
          style={{
            zIndex: 1,
            height: 1,
            width: GlobalStyles.appWidth - 40,
            backgroundColor: '#fff',
            position: 'absolute',
            top: 25,
            left: 20,
            opacity: 0.2,
          }}
        ></View>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 8,
            alignItems: 'center',
            zIndex: 2,
            height: 40,
          }}
        >
          <Text
            style={{
              backgroundColor: '#202020',
              textAlignVertical: 'center',
              color: 'rgba(255,255,255,.5)',
              textAlign: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              // alignSelf: "baseline",
            }}
          >
            {this.props.title}
          </Text>
        </View>
      </View>
    )
  }
}
