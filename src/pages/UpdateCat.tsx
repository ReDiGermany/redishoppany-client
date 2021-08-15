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
    const { list } = this.state

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
    const { activeItem, isActiveItem } = this.state

    const keyboardDetection = {
      update: (keyboardHeight: any) => this.setState({ keyboardHeight }),
    }

    const outerBox = {
      style: {
        height:
          GlobalStyles().appHeight -
          GlobalStyles().statusbarHeight -
          this.state.keyboardHeight,
      },
    }

    const navigation = {
      solid: this.state.isTop,
      label: Language.get('category.update'),
    }

    const innerBox = {
      style: {
        height: GlobalStyles().contentHeight - 50 - this.state.keyboardHeight,
      },
    }

    const scrollView = {
      onScroll: (n: any) => {
        this.setState({ yoffset: n.nativeEvent.contentOffset.y })
      },
      scrollEnabled: !this.state.preventScroll,
      refreshControl: (
        <RefreshControl
          onRefresh={() => {
            this.setState({ refreshing: true })
            this.refresh()
          }}
          enabled={!this.state.preventScroll}
          refreshing={this.state.refreshing}
        />
      ),
    }

    const categoryUpdater = (item: any, index: number) => ({
      onSort: async (y: number) => {
        if (this.state.preventScroll) {
          const bh = GlobalStyles().barHeight
          const title = GlobalStyles().statusbarHeight + bh - this.state.yoffset
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
      },
      onEditName: () =>
        this.setState({
          isActiveItem: true,
          activeItem: index,
        }),
      onLongPress: () => this.setState({ preventScroll: true }),
      onEnd: async (newItem: any) => {
        this.setState({ preventScroll: false, isActiveItem: false })
        await this.update(newItem, index)
      },
      key: item.id,
      item,
      index,
      maxItems: this.state.list.length,
      onDelete: async () => this.delete(item.id, index),
      selectorOpen: isActiveItem && activeItem === index,
    })

    const input = {
      key: isActiveItem ? this.state.list[activeItem].name : '',
      text: isActiveItem ? this.state.list[activeItem].name : '',
      focus: isActiveItem,
      textPlaceholder: isActiveItem ? 'Edit Category' : 'New Category',
      onSave: async (text: string) => {
        if (isActiveItem) {
          const { list } = this.state
          list[activeItem].name = text
          this.setState({
            preventScroll: false,
            isActiveItem: false,
            list,
          })
          await this.update(list[activeItem], activeItem)
          await this.refresh()
        } else this.add(text)
      },
    }

    return (
      <KeyboardDetection {...keyboardDetection}>
        <View {...outerBox}>
          <Navigation {...navigation} />
          <View {...innerBox}>
            <ScrollView {...scrollView}>
              {this.state.list.map((item: IAPICategory, index: number) => (
                <CategoryUpdater {...categoryUpdater(item, index)} />
              ))}
            </ScrollView>
          </View>
          <Input {...input} />
        </View>
      </KeyboardDetection>
    )
  }
}
