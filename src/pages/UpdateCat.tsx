import React, { Component } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import Moveable from '../components/Moveable/Moveable'
import APICategory from '../helper/API/APICategory'
import { randomColor } from '../helper/Functions'
import Input from '../Input'
import IAPICategory from '../interfaces/IAPICategory'
import Language from '../language/Language'
import Navigation from '../Navigation'
import GlobalStyles, { KeyboardDetection } from '../styles/GlobalStyles'
import IUpdateCatProps from '../interfaces/IUpdateCatProps'
import IUpdateCatState from '../interfaces/IUpdateCatState'

export default class Index extends Component<IUpdateCatProps, IUpdateCatState> {
  state = {
    isTop: true,
    refreshing: false,
    list: [],
    keyboardHeight: 0,
  }

  async componentDidMount() {
    this.refresh()
  }

  async refresh() {
    const list = await APICategory.list(this.props.id)
    console.log(list)
    this.setState({ list })
    this.setState({ refreshing: false })
  }

  edit(id: number): void {}

  delete(id: number): void {}

  render() {
    return (
      <KeyboardDetection
        update={keyboardHeight => this.setState({ keyboardHeight })}
      >
        <View
          style={{
            height:
              GlobalStyles().appHeight -
              GlobalStyles().statusbarHeight -
              this.state.keyboardHeight,
          }}
        >
          <Navigation
            solid={this.state.isTop}
            label={Language.get('category.update')}
            simple={true}
          />

          <View
            style={{
              height:
                GlobalStyles().contentHeight - 50 - this.state.keyboardHeight,
            }}
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    this.setState({ refreshing: true })
                    this.refresh()
                  }}
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
      </KeyboardDetection>
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
}
