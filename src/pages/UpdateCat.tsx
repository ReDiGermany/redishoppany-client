import React, { Component } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import Moveable from '../components/Moveable/Moveable'
import APICategory from '../helper/API/APICategory'
import { randomColor } from '../helper/Functions'
import Input from '../Input'
import IAPICategory from '../interfaces/IAPICategory'
import IPageProps from '../interfaces/IPageProps'
import Language from '../language/Language'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'

interface IUpdateCatProps extends IPageProps {
  id: number
}
interface IUpdateCatState {
  isTop: boolean
  refreshing: boolean
  list: IAPICategory[]
}

export default class Index extends Component<IUpdateCatProps, IUpdateCatState> {
  state = {
    isTop: true,
    refreshing: false,
    list: [],
  }

  async componentDidMount() {
    this.refresh()
  }

  async refresh() {
    this.setState({ refreshing: true })
    const list = await APICategory.list(this.props.id)
    this.setState({ list })
    this.setState({ refreshing: false })
  }

  render() {
    return (
      <View
        style={{
          height: GlobalStyles().appHeight - GlobalStyles().statusbarHeight,
        }}
      >
        <Navigation
          solid={this.state.isTop}
          label={Language.get('category.update')}
          simple={true}
        />

        <View style={{ height: GlobalStyles().contentHeight - 50 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={() => this.refresh()}
                refreshing={this.state.refreshing}
              />
            }
          >
            {this.state.list.map((item: IAPICategory, index: number) => (
              <Moveable
                key={item.id}
                name={item.name}
                bgColor={item.color}
                onDelete={() => this.delete(item.id)}
                onClick={() => this.edit(item.id)}
                buttons={[
                  {
                    disabled: index === 0,
                    color: '#fff',
                    icon: 'arrow-up',
                    name: 'test',
                    onPress: () => {},
                  },
                  {
                    color: '#fff',
                    icon: 'arrow-down',
                    name: 'test1',
                    onPress: () => {},
                    disabled: index + 1 === this.state.list.length,
                  },
                ]}
              />
            ))}
          </ScrollView>
        </View>
        <Input
          amountPlaceholder="1"
          textPlaceholder="New Category"
          onSave={text => {
            this.add(text)
          }}
        />
      </View>
    )
  }

  async add(text: string) {
    // eslint-disable-next-line prefer-destructuring
    const list: IAPICategory[] = this.state.list

    const item = {
      id: 0,
      name: text,
      color: `#${randomColor()}`,
    }

    list.push(item)
    this.setState({ list })
    await APICategory.create(text, item.color, this.props.id)
    await this.refresh()
  }

  edit(id: number): void {}

  delete(id: number): void {}
}
