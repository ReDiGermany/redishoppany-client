import React from 'react'
import { StyleSheet, Text } from 'react-native'
import SafeComponent from '../../components/SafeComponent'
import Language from '../../language/Language'

const Style = StyleSheet.create({
  headline: {
    textAlignVertical: 'bottom',
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    height: 30,
  },
  subline: {
    textAlignVertical: 'bottom',
    textAlign: 'center',
    fontSize: 13,
    color: '#ffffff80',
    height: 20,
  },
})

export default class LoginTitle extends SafeComponent {
  render() {
    return (
      <>
        <Text style={Style.headline}>{Language.get('welcome.headline')}</Text>
        <Text style={Style.subline}>{Language.get('welcome.subline')}</Text>
      </>
    )
  }
}
