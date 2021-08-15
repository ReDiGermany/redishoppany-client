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
    yoffset: 0,
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

  async delete(id: number, index: number) {
    await APICategory.delete(id)
    const { list } = this.state
    list.splice(index, 1)
    this.setState({ list })
    await this.refresh()
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
              onScroll={n => {
                this.setState({ yoffset: n.nativeEvent.contentOffset.y })
              }}
              scrollEnabled={!this.state.preventScroll}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    this.setState({ refreshing: true })
                    this.refresh()
                  }}
                  enabled={!this.state.preventScroll}
                  refreshing={this.state.refreshing}
                />
              }
            >
              {this.state.list.map((item: IAPICategory, index: number) => (
                <CategoryUpdater
                  onSort={async y => {
                    if (this.state.preventScroll) {
                      const bh = GlobalStyles().barHeight
                      const title =
                        GlobalStyles().statusbarHeight + bh - this.state.yoffset
                      const pos = Math.floor((y - title) / bh)
                      const { list } = this.state
                      const itm = list[pos]
                      list[pos] = item
                      list[index] = itm
                      this.setState({ list, preventScroll: false })
                      await APICategory.sort(
                        this.props.id,
                        list.map(nitem => nitem.id)
                      )
                      await this.refresh()
                    }
                  }}
                  onEditName={() => {
                    this.setState({
                      isActiveItem: true,
                      activeItem: index,
                    })
                  }}
                  onLongPress={() => {
                    this.setState({ preventScroll: true })
                  }}
                  onStart={() => {}}
                  onEnd={async newItem => {
                    // console.log('onEnd')
                    this.setState({ preventScroll: false, isActiveItem: false })
                    await this.update(newItem, index)
                  }}
                  key={item.id}
                  item={item}
                  index={index}
                  maxItems={this.state.list.length}
                  onDelete={async () => {
                    await this.delete(item.id, index)
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
                  list,
                })
                await this.update(
                  list[this.state.activeItem],
                  this.state.activeItem
                )
                await this.refresh()
              } else this.add(text)
            }}
          />
        </View>
      </KeyboardDetection>
    )
  }
}
