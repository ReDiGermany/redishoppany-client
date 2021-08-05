import React, { Component } from 'react'
import { Text, View, Dimensions, Pressable, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
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
        <ScrollView style={{ height: GlobalStyles().contentHeight }}>
          <Navigation
            label={Language.get('overview')}
            simple={true}
            buttons={buttons}
          />
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
                    // onDelete: undefined,
                    large: true,
                    name: item.name,
                    onClick: () =>
                      this.setState({ redirect: `/list/${item.id}` }),
                  }
                  // if (index === 0) moveable.onDelete = () => {}

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
            onClick={() => this.setState({ redirect: '/settings' })}
          />
          <Row style={{ marginTop: 10, marginBottom: 30 }}>
            <Moveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name={Language.get('about')}
              centerText={true}
              onClick={() => this.setState({ redirect: '/about' })}
            />
            <Moveable
              style={{ width: Dimensions.get('window').width / 2 - 20 }}
              name={Language.get('imprint')}
              centerText={true}
              onClick={() => this.setState({ redirect: '/imprint' })}
            />
          </Row>
        </ScrollView>
        {/* <Pressable
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 50,
            width: 50,
            backgroundColor: '#46deb3',
            borderRadius: 50,
          }}
        >
          <Icon
            style={{
              width: 50,
              height: 50,
              textAlign: 'center',
              textAlignVertical: 'center',
              fontSize: 20,
            }}
            name="plus"
          />
        </Pressable> */}
      </>
    )
  }
}
