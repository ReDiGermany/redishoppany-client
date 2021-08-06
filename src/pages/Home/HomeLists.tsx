import React, { Component } from 'react'
import { Text, View, Dimensions, Pressable, ScrollView } from 'react-native'
import Moveable from '../../components/Moveable/Moveable'
import Row from '../../components/Row'
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
  }

  render() {
    if (this.state.redirect !== '') {
      return <Redirect push to={this.state.redirect} />
    }
    const buttons = []
    // buttons.push({ icon: 'bell', name: 'notifications', onClick: () => {} })
    buttons.push({ icon: 'plus', name: 'add', onClick: () => {} })

    return (
      <>
        <Navigation
          solid={this.state.isTop}
          label={Language.get('overview')}
          simple={true}
          buttons={buttons}
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
          {this.props.user?.lists.map((list, index) => {
            const title =
              index > 0 ? (
                <Text style={HomeStyles.heading}>
                  {list.ownerName}
                  {Language.get('list_suffix')}
                </Text>
              ) : (
                <></>
              )

            const add =
              index === 1337 ? (
                <Pressable>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#ffffff33',
                      height: 30,
                      lineHeight: 30,
                      textDecorationStyle: 'solid',
                      textDecorationColor: '#fff',
                      textDecorationLine: 'underline',
                    }}
                  >
                    new List
                  </Text>
                </Pressable>
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
                {add}
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
