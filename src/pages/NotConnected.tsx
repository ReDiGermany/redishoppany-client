import React from 'react'
import { Text } from 'react-native'
import Navigation from '../components/Navigation'
import SafeComponent from '../components/SafeComponent'

export default class NotConnected extends SafeComponent {
  render() {
    return (
      <>
        <Navigation label="Not Connected" />
        <Text style={{ color: '#fff', paddingHorizontal: 20 }}>
          Your Device seem to be offline. But thats ok!{'\n'}All Changes will be
          local and synced when you're back online!{' '}
        </Text>
      </>
    )
  }
}
