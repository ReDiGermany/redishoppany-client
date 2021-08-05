import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import Moveable from '../../components/Moveable/Moveable'
import Row from '../../components/Row'
import UserProfileSmall from '../../components/UserProfileSmall'
import IMoveableProps from '../../interfaces/IMoveableProps'
import IPageProps from '../../interfaces/IPageProps'

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
  render() {
    return (
      <>
        <UserProfileSmall user={this.props.user} />
        {this.props.user?.lists.map((list, index) => {
          const title =
            index > 0 ? (
              <Text style={HomeStyles.heading}>{list.ownerName}'s Listen</Text>
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
                  to: `/list/${item.id}`,
                }
                if (index === 0) moveable.onDelete = () => {}

                return <Moveable key={item.name} {...moveable} />
              })}
            </View>
          )
        })}
        <Text style={HomeStyles.heading}>Anderes</Text>
        <Moveable name="Einstellungen" centerText={true} />
        <Row style={{ marginTop: 10, marginBottom: 30 }}>
          <Moveable
            style={{ width: Dimensions.get('window').width / 2 - 20 }}
            name="Über"
            centerText={true}
          />
          <Moveable
            style={{ width: Dimensions.get('window').width / 2 - 20 }}
            name="Impressum"
            centerText={true}
          />
        </Row>
      </>
    )
  }
}
