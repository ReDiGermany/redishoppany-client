import React, { Component } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import APICategory from '../helper/API/APICategory'
import { randomColor } from '../helper/Functions'
import Input from '../Input'
import IAPICategory from '../interfaces/IAPICategory'
import Language from '../language/Language'
import Navigation from '../Navigation'
import GlobalStyles, { KeyboardDetection } from '../styles/GlobalStyles'
import IUpdateCatProps from '../interfaces/IUpdateCatProps'
import IUpdateCatState from '../interfaces/IUpdateCatState'
import CategoryUpdater from '../components/CategoryUpdater'

export default class Index extends Component<IUpdateCatProps, IUpdateCatState> {
  state: IUpdateCatState = {
    isTop: true,
    refreshing: false,
    preventScroll: false,
    list: [],
    keyboardHeight: 0,
    activeItem: 0,
    isActiveItem: false,
    color: '',
  }

  async componentDidMount() {
    this.refresh()
  }

  async refresh() {
    const list = await APICategory.list(this.props.id)
    this.setState({ list })
    this.setState({ refreshing: false })
  }

  async delete(id: number) {
    await APICategory.delete(id)
  }

  async add(text: string) {
    // eslint-disable-next-line prefer-destructuring
    const list: IAPICategory[] = this.state.list

    const item = {
      id: 0,
      name: text,
      color: randomColor(),
    }

    list.push(item)
    this.setState({ list })
    await APICategory.create(text, item.color, this.props.id)
    await this.refresh()
  }

  async update(item: IAPICategory, index: number) {
    const { list } = this.state
    list[index] = item
    this.setState({ list })
    await APICategory.update(item)
    await this.refresh()
  }

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
          />

          <View
            style={{
              height:
                GlobalStyles().contentHeight - 50 - this.state.keyboardHeight,
            }}
          >
            <ScrollView
              scrollEnabled={!this.state.preventScroll}
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
                <CategoryUpdater
                  onEditName={() => {
                    this.setState({
                      isActiveItem: true,
                      activeItem: index,
                    })
                  }}
                  onStart={() =>
                    this.setState({
                      // preventScroll: true,
                      // isActiveItem: true,
                      // activeItem: index,
                    })
                  }
                  onEnd={async newItem => {
                    this.setState({ preventScroll: false, isActiveItem: false })
                    await this.update(newItem, index)
                  }}
                  key={
                    item.id +
                    (this.state.isActiveItem && this.state.activeItem === index
                      ? '1'
                      : '0')
                  }
                  item={item}
                  index={index}
                  maxItems={this.state.list.length}
                  onDelete={async () => {
                    await this.delete(item.id)
                  }}
                  selectorOpen={
                    this.state.isActiveItem && this.state.activeItem === index
                  }
                />
              ))}
            </ScrollView>
          </View>
          <Input
            key={
              this.state.isActiveItem
                ? this.state.list[this.state.activeItem].name
                : ''
            }
            text={
              this.state.isActiveItem
                ? this.state.list[this.state.activeItem].name
                : ''
            }
            focus={this.state.isActiveItem}
            textPlaceholder={
              this.state.isActiveItem ? 'Edit Category' : 'New Category'
            }
            onSave={async text => {
              if (this.state.isActiveItem) {
                const { list } = this.state
                list[this.state.activeItem].name = text
                this.setState({
                  preventScroll: false,
                  isActiveItem: false,
                })
                await this.update(
                  list[this.state.activeItem],
                  this.state.activeItem
                )
              } else this.add(text)
            }}
          />
        </View>
      </KeyboardDetection>
    )
  }
}
