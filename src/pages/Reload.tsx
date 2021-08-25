import React from 'react'
import { Text } from 'react-native'
import SafeComponent from '../components/SafeComponent'
import { Redirect } from '../Router/react-router'

export default class Reload extends SafeComponent<{ onReload: () => void }> {
  state = {
    go: false,
  }

  async componentDidMount() {
    await this.props.onReload()
    this.setState({ go: true })
  }

  render() {
    if (this.state.go) return <Redirect to="/" />

    return (
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        Reloading...
      </Text>
    )
  }
}
