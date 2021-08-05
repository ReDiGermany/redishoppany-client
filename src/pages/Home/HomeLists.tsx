import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import Moveable from '../../components/Moveable/Moveable'
import Row from '../../components/Row'
import UserProfileSmall from '../../components/UserProfileSmall'
import IMoveableProps from '../../interfaces/IMoveableProps'
import IPageProps from '../../interfaces/IPageProps'
import Language from '../../language/Language'
import { Redirect } from '../../Router/react-router'

const HomeStyles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 30,
    marginBottom: 10,
    opacity: 0.5,
  },
})

export default class HomeList extends Component<IPageProps> {
  state = {
    redirect: '',
  }

  render() {
    if (this.state.redirect !== '') {
      return <Redirect push to={this.state.redirect} />
    }

    return (
      <>
        <UserProfileSmall user={this.props.user} />
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

          return (
            <View key={index}>
              {title}
              {list.items.map(item => {
                const moveable: IMoveableProps = {
                  onDelete: undefined,
                  large: true,
                  name: item.name,
                  onClick: () =>
                    this.setState({ redirect: `/list/${item.id}` }),
                }
                if (index === 0) moveable.onDelete = () => {}

                return <Moveable key={item.name} {...moveable} />
              })}
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
      </>
    )
  }
}
