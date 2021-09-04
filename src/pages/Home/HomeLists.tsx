import React from 'react'
import { Text, Dimensions } from 'react-native'
import AddBar from '../../components/AddBar'
import AnonAlert from '../../components/AnonAlert'
import HomeListListItem from '../../components/HomeListListItem'
import InfoMoveable from '../../components/Moveable/InfoMoveable'
import PhoneNotConnected from '../../components/PhoneNotConnected'
import Row from '../../components/Row'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import APIShoppingList from '../../helper/API/APIShoppingList'
import APIUser from '../../helper/API/APIUser'
import INavigationPropsButton from '../../interfaces/INavigationPropsButton'
import IPageProps from '../../interfaces/IPageProps'
import Language from '../../language/Language'
import Navigation from '../../Navigation'
import { RedirectIfPossible } from '../../Router/react-router'
import HomeStyles from '../../styles/HomeStyles'

export default class HomeList extends SafeComponent<IPageProps> {
  state = {
    redirect: '',
    isTop: true,
    add: false,
    lists: this.props.user?.lists ?? [],
    refreshing: false,
  }

  shouldComponentUpdate(nextProps: Readonly<IPageProps>) {
    if (
      JSON.stringify(nextProps.user?.lists) !==
        JSON.stringify(this.state.lists) &&
      nextProps.user?.lists.length
    ) {
      this.setState({ lists: nextProps.user?.lists ?? [] })

      return false
    }

    return true
  }

  async addList(name: string) {
    await APIShoppingList.create(name)
    const user = await APIUser.getMe()
    if (typeof user !== 'boolean')
      this.setState({ lists: user.lists, add: false })
  }

  onRefresh() {
    this.setState({ refreshing: true })
    this.props.onReload?.()
    setTimeout(() => this.setState({ refreshing: false }), 1000)
  }

  render() {
    const buttons: INavigationPropsButton[] = [
      {
        icon: 'plus',
        name: this.state.add ? 'chevron-up' : 'add',
        onClick: () => this.setState({ add: !this.state.add }),
      },
    ]

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
          solid={this.state.isTop}
          label={Language.get('overview')}
          simple={true}
          buttons={buttons}
        />
        <ScrollView
          hasBottomBar={true}
          hasNavi={true}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
        >
          <AddBar
            placeholder="listname"
            visible={this.state.add}
            onChange={name => this.addList(name)}
          />
          <PhoneNotConnected connected={this.props.connected} />
          <AnonAlert user={this.props.user} />
          <InfoMoveable
            show={this.state.lists.length === 0}
            name="Nothing here. Add a new List!"
            onClick={() => this.setState({ add: true })}
          />
          {this.state.lists.map((list, index) => (
            <HomeListListItem key={list.ownerName} list={list} index={index} />
          ))}
          <Text style={HomeStyles.heading}>{Language.get('other')}</Text>
          <InfoMoveable
            name="settings"
            onClick={() => this.setState({ redirect: '/settings' })}
          />
          <Row style={{ marginTop: 10, marginBottom: 30 }}>
            <InfoMoveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name="about"
              onClick={() => this.setState({ redirect: '/about' })}
            />
            <InfoMoveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name="imprint"
              onClick={() => this.setState({ redirect: '/imprint' })}
            />
          </Row>
        </ScrollView>
      </>
    )
  }
}
