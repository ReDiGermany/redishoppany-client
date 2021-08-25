import { Component } from 'react'

export default class SafeComponent<P = {}, S = {}> extends Component<P, S> {
  componentWillUnmount() {
    // https://stackoverflow.com/a/61055910
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (_state, _callback) => {}
  }
}
