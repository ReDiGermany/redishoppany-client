import React from 'react'
import { View, BackHandler as BH } from 'react-native'
import { container } from '../styles/NavigationBarStyle'
import NavigationTitle from './NavigationTitle'
import INavigationProps from '../interfaces/INavigationProps'
import { RedirectIfPossible } from '../Router/react-router'
import SafeComponent from './SafeComponent'
import NavigationButton from './NavigationButton'

export default class Navigation extends SafeComponent<INavigationProps> {
  state = {
    redirect: '',
  }

  componentDidMount() {
    BH.addEventListener('hardwareBackPress', () => this.backHandler())
  }

  backHandler() {
    if (!this.props.simple) this.setState({ redirect: this.props.url ?? '/' })

    return !this.props.simple
  }

  componentWillUnmount() {
    BH.removeEventListener('hardwareBackPress', () => this.backHandler())
  }

  render() {
    return (
      <View>
        <RedirectIfPossible to={this.state.redirect} />
        <View style={container(this.props.solid)}>
          <NavigationTitle {...this.props} onPress={() => this.backHandler()} />
          {this.props.buttons?.map(item => (
            <NavigationButton item={item} />
          ))}
        </View>
      </View>
    )
  }
}
