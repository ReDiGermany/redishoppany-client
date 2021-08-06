import React, { Component } from 'react'
import {
  // RefreshControl, SafeAreaView,
  ScrollView,
  View,
} from 'react-native'
import Moveable from '../../components/Moveable/Moveable'
import GlobalStyles from '../../styles/GlobalStyles'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import Language from '../../language/Language'

export default class Foodplan extends Component<IPageProps> {
  state = {
    notifications: [
      { prefix: 'heute', name: 'Curlybleu', empty: false },
      { prefix: 'DO', name: 'Curry', empty: false },
      { prefix: 'FR', name: 'Curry2', empty: false },
      { prefix: 'SA', name: '', empty: true },
      { prefix: 'SO', name: 'Curry3', empty: false },
      { prefix: 'MO', name: '', empty: true },
    ],
    refreshing: false,
    isTop: true,
  }

  render() {
    return (
      <View>
        <Navigation
          solid={this.state.isTop}
          label={Language.get('foodlist')}
          simple={true}
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
          {this.state.notifications.map(item => {
            if (item.empty) {
              return (
                <Moveable
                  key={`${item.name}-${item.prefix}`}
                  prefix={item.prefix}
                  dropdownItems={[
                    { label: 'Schnitzel', value: '1' },
                    { label: 'nix', value: '2' },
                  ]}
                  dropdownSelected={() => {}}
                />
              )
            }

            return (
              <Moveable
                key={item.name}
                onDelete={() => {}}
                prefix={item.prefix}
                name={item.name}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}
