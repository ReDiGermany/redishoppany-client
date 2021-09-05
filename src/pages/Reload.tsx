import React from 'react'
import { Text } from 'react-native'
import SafeComponent from '../components/SafeComponent'
import { RedirectIfPossible } from '../Router/react-router'

export default class Reload extends SafeComponent<{ onReload: () => void }> {
  state = {
    redirect: '',
  }

  async componentDidMount() {
    this.props.onReload()
    this.setState({ redirect: '/' })
  }

  render() {
    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        >
          Reloading...
        </Text>
      </>
    )
  }
}
