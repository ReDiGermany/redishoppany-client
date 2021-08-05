import React, { Component } from 'react'
import { View, ScrollView, Dimensions, ImageBackground } from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import IPageProps from '../interfaces/IPageProps'
import HomeList from './Home/HomeLists'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default class Home extends Component<IPageProps> {
  state = {
    active: 0,
  }

  render() {
    return (
      <View style={{ backgroundColor: '#111' }}>
        <View
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            overflow: 'hidden',
          }}
        >
          <ImageBackground
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
            style={{ width: windowWidth }}
          >
            <ScrollView style={{ height: windowHeight - 50 }}>
              {this.state.active === 0 && <HomeList user={this.props.user} />}
            </ScrollView>
          </ImageBackground>
        </View>
        <BottomNavigation
          navUpdate={active => {
            this.setState({ active })
          }}
        />
      </View>
    )
  }
}
