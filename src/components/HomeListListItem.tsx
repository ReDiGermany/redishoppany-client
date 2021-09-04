import React from 'react'
import { View, Text } from 'react-native'
import IAPIUserMeLists from '../interfaces/IAPIUserMeLists'
import Language from '../language/Language'
import HomeStyles from '../styles/HomeStyles'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'

export default class HomeListListItem extends SafeComponent<{
  list: IAPIUserMeLists
  index: number
}> {
  render() {
    return (
      <View>
        {this.props.index > 0 ? (
          <Text style={HomeStyles.heading}>
            {this.props.list.ownerName}
            {Language.get('list_suffix')}
          </Text>
        ) : (
          <></>
        )}
        {this.props.list.items.map(item => (
          <Moveable
            key={item.name}
            large={true}
            name={item.name}
            onClick={() => this.setState({ redirect: `/list/${item.id}` })}
            badge={item.count > 0 ? item.count : undefined}
            shared={item.shared}
          />
        ))}
      </View>
    )
  }
}
