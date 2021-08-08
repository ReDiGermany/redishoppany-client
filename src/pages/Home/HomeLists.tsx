import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'
import AddBar from '../../components/AddBar'
import Moveable from '../../components/Moveable/Moveable'
import Row from '../../components/Row'
import APIShoppingList from '../../helper/API/APIShoppingList'
import APIUser from '../../helper/API/APIUser'
import IMoveableProps from '../../interfaces/IMoveableProps'
import IPageProps from '../../interfaces/IPageProps'
import Language from '../../language/Language'
import Navigation from '../../Navigation'
import { Redirect } from '../../Router/react-router'
import GlobalStyles from '../../styles/GlobalStyles'
import HomeStyles from '../../styles/HomeStyles'

export default class HomeList extends Component<IPageProps> {
  state = {
    redirect: '',
    isTop: true,
    add: false,
    lists: this.props.user?.lists ?? [],
  }

  // constructor(props: IPageProps) {
  // super(props)
  // console.log(props)
  // }

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
    this.setState({ lists: user.lists, add: false })
  }

  render() {
    if (this.state.redirect !== '')
      return <Redirect push to={this.state.redirect} />
    const buttons = [
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
        // @ts-ignore
        badge: { color: '#900000', text: this.props.user?.notificationCount },
      })

    return (
      <>
        <Navigation
          solid={this.state.isTop}
          label={Language.get('overview')}
          simple={true}
          buttons={buttons}
        />
        <AddBar
          placeholder={Language.get('listname')}
          visible={this.state.add}
          onChange={name => this.addList(name)}
        />
        <ScrollView
          onScroll={e =>
            this.setState({
              isTop: e.nativeEvent.contentOffset.y <= 0,
            })
          }
          style={{
            height: GlobalStyles().contentHeight - GlobalStyles().barHeight,
          }}
        >
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
            onClick={() => this.setState({ redirect: '/settings' })}
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
