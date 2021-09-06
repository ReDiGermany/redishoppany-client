import React from 'react'
import IAPIUserMe from '../interfaces/IAPIUserMe'
import INavigationPropsButton from '../interfaces/INavigationPropsButton'
import Language from '../language/Language'
import { RedirectIfPossible } from '../Router/react-router'
import Navigation from './Navigation'
import SafeComponent from './SafeComponent'

export default class HomeNavigation extends SafeComponent<{
  isTop?: boolean
  name: string
  user?: IAPIUserMe
  buttons?: INavigationPropsButton[]
}> {
  state = {
    redirect: '',
  }

  render() {
    const buttons: INavigationPropsButton[] = this.props.buttons ?? []

    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        badge: {
          color: '#900000',
          text: this.props.user?.notificationCount.toString(),
        },
      })

    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        <Navigation
          solid={this.props.isTop}
          label={Language.getOrText(this.props.name)}
          simple={true}
          buttons={buttons}
        />
      </>
    )
  }
}
