import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import IPageProps from '../interfaces/IPageProps'
import Language from '../language/Language'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'

export default class Imprint extends Component<IPageProps> {
  render() {
    const style = StyleSheet.create({
      scrollView: {
        width: '100%',
        height: GlobalStyles().contentHeight,
        padding: 20,
      },
      text: { color: '#fff' },
    })

    return (
      <View>
        <Navigation user={this.props.user} label={Language.get('imprint')} />
        <ScrollView style={style.scrollView}>
          <Text style={style.text}>{Language.get('imprint.text')}</Text>
        </ScrollView>
      </View>
    )
  }
}
