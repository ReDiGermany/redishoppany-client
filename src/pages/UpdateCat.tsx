import React from 'react'
import { View } from 'react-native'
import APICategory from '../helper/API/APICategory'
import { randomColor } from '../helper/Functions'
import Input from '../components/Input'
import IAPICategory from '../interfaces/IAPICategory'
import Language from '../language/Language'
import Navigation from '../components/Navigation'
import GlobalStyles, { KeyboardDetection } from '../styles/GlobalStyles'
import IUpdateCatProps from '../interfaces/IUpdateCatProps'
import IUpdateCatState from '../interfaces/IUpdateCatState'
import CategoryUpdater from '../components/CategoryUpdater'
import SafeComponent from '../components/SafeComponent'
import ScrollView from '../components/ScrollView'

export default class Index extends SafeComponent<
  IUpdateCatProps,
  IUpdateCatState
> {
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

  constructor(props: IUpdateCatProps) {
    super(props)
    this.refresh()
  }

  async refresh() {
    this.setState({ list: [] })
    APICategory.list(this.props.id, list =>
      this.setState({ list, refreshing: false })
    )
  }

  async delete(id: number, index: number) {
    APICategory.delete(id, async () => {
      const { list } = this.state
      list.splice(index, 1)
      this.setState({ list })
      await this.refresh()
    })
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
    APICategory.create(text, item.color, this.props.id, () => this.refresh())
  }

  async update(item: IAPICategory, index: number) {
    const { list } = this.state
    list[index] = item
    this.setState({ list })
    APICategory.update(item, () => this.refresh())
  }

  render() {
    const { activeItem, isActiveItem } = this.state

    return (
      <KeyboardDetection
        update={keyboardHeight => this.setState({ keyboardHeight })}
      >
        <View
          style={{
            height: GlobalStyles().contentHeight - this.state.keyboardHeight,
          }}
        >
          <Navigation
            url={`/list/${this.props.id}`}
            solid={this.state.isTop}
            label={Language.get('category.update')}
            subTitle="Halte gedrückt um zu sortieren"
          />
          <View
            style={{
              height:
                GlobalStyles().contentHeight -
                this.state.keyboardHeight -
                GlobalStyles().barHeight -
                GlobalStyles().lineHeight,
            }}
          >
            <ScrollView
              hasBottomBar={true}
              dark={true}
              onRefresh={() => {
                this.setState({ refreshing: true, list: [] })
                this.refresh()
              }}
              refreshing={this.state.refreshing}
            >
              {this.state.list.map((item: IAPICategory, index: number) => (
                <CategoryUpdater
                  key={item.id}
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
                      APICategory.sort(
                        this.props.id,
                        list.map(nitem => nitem.id),
                        () => this.refresh()
                      )
                    }
                  }}
                  onEditName={
                    index !== 0
                      ? () =>
                          this.setState({
                            isActiveItem: true,
                            activeItem: index,
                          })
                      : undefined
                  }
                  onLongPress={() => this.setState({ preventScroll: true })}
                  onEnd={async newItem => {
                    this.setState({ preventScroll: false, isActiveItem: false })
                    await this.update(newItem, index)
                  }}
                  item={item}
                  index={index}
                  maxItems={this.state.list.length}
                  onDelete={async () => this.delete(item.id, index)}
                  selectorOpen={isActiveItem && activeItem === index}
                />
              ))}
            </ScrollView>
          </View>
          <Input
            key={isActiveItem ? this.state.list[activeItem].name : ''}
            text={isActiveItem ? this.state.list[activeItem].name : ''}
            focus={isActiveItem}
            textPlaceholder={isActiveItem ? 'Edit Category' : 'New Category'}
            onSave={async text => {
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
            }}
          />
        </View>
      </KeyboardDetection>
    )
  }
}
