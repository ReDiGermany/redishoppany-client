import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import AddBar from '../../components/AddBar'
import Moveable from '../../components/Moveable/Moveable'
import Row from '../../components/Row'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import APIShoppingList from '../../helper/API/APIShoppingList'
import APIUser from '../../helper/API/APIUser'
import IMoveableProps from '../../interfaces/IMoveableProps'
import INavigationPropsButton from '../../interfaces/INavigationPropsButton'
import IPageProps from '../../interfaces/IPageProps'
import Language from '../../language/Language'
import Navigation from '../../Navigation'
import { Redirect } from '../../Router/react-router'
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
    if (this.state.redirect !== '')
      return <Redirect push to={this.state.redirect} />

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
            placeholder={Language.get('listname')}
            visible={this.state.add}
            onChange={name => this.addList(name)}
          />
          {this.props.connected === false && (
            <Moveable
              name="Phone not Connected"
              bgColor="rgba(255,0,0,.2)"
              icon="exclamation"
              large={true}
              boldText={true}
            />
          )}
          {this.state.lists.length === 0 && (
            <Moveable
              name="Nothing here. Add a new List!"
              large={true}
              centerText={true}
              boldText={true}
              onClick={() => {
                this.setState({ add: true })
              }}
            />
          )}
          {this.state.lists.map((list, index) => {
            const title =
              index > 0 ? (
                <Text style={HomeStyles.heading}>
                  {list.ownerName}
                  {Language.get('list_suffix')}
                </Text>
              ) : (
                <></>
              )

            return (
              <View key={index}>
                {title}
                {list.items.map(item => {
                  const moveable: IMoveableProps = {
                    large: true,
                    name: item.name,
                    onClick: () =>
                      this.setState({ redirect: `/list/${item.id}` }),
                    badge: item.count > 0 ? item.count : undefined,
                    shared: item.shared,
                  }

                  return <Moveable key={item.name} {...moveable} />
                })}
              </View>
            )
          })}
          <Text style={HomeStyles.heading}>{Language.get('other')}</Text>
          <Moveable
            name={Language.get('settings')}
            centerText={true}
            large={true}
            onClick={() => {
              this.setState({ redirect: '/settings' })
            }}
          />
          <Row style={{ marginTop: 10, marginBottom: 30 }}>
            <Moveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name={Language.get('about')}
              centerText={true}
              large={true}
              onClick={() => this.setState({ redirect: '/about' })}
            />
            <Moveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name={Language.get('imprint')}
              centerText={true}
              large={true}
              onClick={() => this.setState({ redirect: '/imprint' })}
            />
          </Row>
        </ScrollView>
      </>
    )
  }
}
