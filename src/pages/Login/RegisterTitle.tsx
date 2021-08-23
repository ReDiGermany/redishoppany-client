import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Language from '../../language/Language'

const Style = StyleSheet.create({
  headline: {
    textAlignVertical: 'bottom',
    marginLeft: 20,
    fontSize: 20,
    color: '#fff',
    height: 30,
  },
  subline: {
    textAlignVertical: 'bottom',
    marginLeft: 20,
    fontSize: 13,
    color: '#ffffff80',
    height: 20,
  },
})

export default class RegisterTitle extends Component {
  render() {
    return (
      <>
        <Text style={Style.headline}>
          Registriere dein Konto jetzt kostenlos!
        </Text>
        <Text style={Style.subline}>
          Und erhalte damit diverse Community funktionen kostenlos!
        </Text>
      </>
    )
  }
}
