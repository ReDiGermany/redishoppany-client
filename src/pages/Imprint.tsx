import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import IPageProps from '../interfaces/IPageProps'
import Language from '../language/Language'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'

export default class Imprint extends Component<IPageProps> {
  render() {
    return (
      <View>
        <Navigation user={this.props.user} label={Language.get('imprint')} />
        <ScrollView
          style={{
            width: '100%',
            height: GlobalStyles().contentHeight,
            padding: 20,
          }}
        >
          <Text style={{ color: '#fff' }}>{Language.get('imprint.text')}</Text>
        </ScrollView>
      </View>
    )
  }
}
