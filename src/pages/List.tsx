import React from 'react'
import {
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  ImageBackground,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navigation from '../Navigation'
import ListHeader from '../ListHeader'
import GlobalStyles from '../styles/GlobalStyles'
import Input from '../Input'
import Moveable from '../components/Moveable/Moveable'
import APIShoppingList from '../helper/API/APIShoppingList'
import BottomBox from '../BottomBox'
import IShoppingListItem from '../interfaces/IShoppingListItem'
import IPageListState from '../interfaces/IPageListState'
import IPageListProps from '../interfaces/IPageListProps'
import { Redirect } from '../Router/react-router'
import IShoppingListCategory from '../interfaces/IShoppingListCategory'
import APICategory from '../helper/API/APICategory'
import SafeComponent from '../components/SafeComponent'

// TODO: Finalize
export default class List extends SafeComponent<
  IPageListProps,
  IPageListState
> {
  state: IPageListState = {
    items: [],
    refreshing: false,
    scrolling: true,
    bottomBox: false,
    lists: [],
    settings: false,
    preventScroll: false,
    isTop: true,
    bottomBoxState: 0,
    listName: 'Loading...',
    redirect: '',
    listId: 0,
    newCatBox: false,
    moveToListBox: false,
    newCatItem: undefined,
    newItemList: undefined,
    newListCats: [],
  }

  showUpdateCategories() {
    this.setState({ redirect: `/updatecat/${this.state.listId}` })
  }

  async deleteItems() {
    await APIShoppingList.deleteAllItems(this.props.id)
    this.setState({ items: [], lists: [] })
    await this.refresh()
  }

  async deleteBoughtItems() {
    await APIShoppingList.deleteBoughtItems(this.props.id)
    this.refresh()
  }

  showShareContext() {}

  delteList() {}

  async componentDidMount() {
    const listName =
      (await AsyncStorage.getItem(`listname-${this.props.id}`)) ?? 'Loading..'
    this.setState({ listName })
    const lists = await AsyncStorage.getItem('lists')
    if (lists) this.setState({ lists: JSON.parse(lists) })
    const items = await AsyncStorage.getItem(`list-${this.props.id}`)
    if (items) this.setState({ items: JSON.parse(items) })
    this.refresh()
  }

  async setItemBought(
    item: IShoppingListItem,
    itemindex: number,
    catindex: number
  ) {
    const { items } = this.state
    const itm = items[catindex].items[itemindex]
    itm.inCart = true
    items[items.length - 1].items.push(itm)
    items[catindex].items.splice(itemindex, 1)
    this.setState({ items })
    await APIShoppingList.setItemBought(item.id)
    this.refresh()
  }

  async setItemUnBought(
    item: IShoppingListItem,
    itemindex: number,
    catindex: number
  ) {
    const { items } = this.state
    const itm = items[catindex].items[itemindex]
    itm.inCart = false
    items[item.catId].items.push(itm)
    items[items.length - 1].items.splice(itemindex, 1)
    this.setState({ items })
    await APIShoppingList.setItemUnBought(item.id)
    this.refresh()
  }

  setOpenSwitchItem(item: IShoppingListItem): void {
    this.setState({ bottomBox: true, newItemList: item })
  }

  async setOpenSortItem(item: IShoppingListItem) {
    this.setState({ newCatBox: true, newCatItem: item })
    // await APIShoppingList.moveItemToCat()
  }

  async refresh() {
    const data = await APIShoppingList.singleList(this.props.id)

    data.categories.forEach((cat, catIdx) => {
      const items: any[] = []
      cat.items.forEach(item => {
        if (item.inCart) {
          data.categories[data.categories.length - 1].items.push({
            ...item,
            catId: catIdx,
          })
        } else {
          items.push({ ...item, catId: catIdx })
        }
      })
      if (catIdx !== data.categories.length - 1)
        data.categories[catIdx].items = items
    })
    this.setState({
      items: data.categories,
      listName: data.name,
      listId: data.id,
    })

    const lists = await APIShoppingList.simpleList()

    this.setState({ refreshing: false, lists })
    await AsyncStorage.setItem('lists', JSON.stringify(lists))
    await AsyncStorage.setItem(
      `list-${this.props.id}`,
      JSON.stringify(data.categories)
    )
    await AsyncStorage.setItem(`listname-${this.props.id}`, data.name)
  }

  async updateItemCategory(cat: IShoppingListCategory) {
    const d = await APIShoppingList.updateItemCategory(
      this.state.newCatItem?.id ?? 0,
      cat.id
    )
    this.setState({ items: [], refreshing: true })
    await this.refresh()
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const onRefresh = async () => {
      this.setState({ refreshing: true })
      await this.refresh()
    }

    const svStyles: any = {
      overflow: 'hidden',
    }

    return (
      <ImageBackground
        source={require('../../assets/background.jpg')}
        resizeMode="cover"
        style={{
          width: GlobalStyles().appWidth,
          height: GlobalStyles().appHeight - 50,
        }}
      >
        <Navigation
          user={this.props.user}
          label={this.state.listName}
          solid={this.state.isTop}
          buttons={[
            {
              name: 'openMenu',
              onClick: () => {
                this.setState({ settings: !this.state.settings })
              },
              icon: 'ellipsis-v',
            },
          ]}
        />
        <SafeAreaView
          style={{
            height: GlobalStyles().contentHeight - 10,
          }}
        >
          <View
            style={{
              height: GlobalStyles().contentHeight - 60,
            }}
          >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={onRefresh}
                />
              }
              onScroll={e =>
                this.setState({
                  isTop: e.nativeEvent.contentOffset.y <= 0,
                })
              }
              scrollEnabled={!this.state.preventScroll}
              style={svStyles}
            >
              {this.state.items.map((cat, catindex) => {
                if (cat.items.length === 0)
                  return <View key={`cat_${catindex}`}></View>

                return (
                  <View key={`cat_${catindex}`}>
                    <ListHeader color={cat.color} text={cat.name} />
                    {cat.items.map((item, itemindex) => (
                      <Moveable
                        key={`item_${catindex}_${itemindex}`}
                        open={item.open}
                        onDelete={() => {}}
                        prefix={item.amount}
                        name={item.name}
                        onMoving={(left, right) =>
                          this.setState({ preventScroll: left || right })
                        }
                        last={itemindex + 1 === cat.items.length}
                        right={[
                          {
                            icon: 'exchange-alt',
                            color: '#332f99',
                            click: () => this.setOpenSwitchItem(item),
                          },
                          {
                            icon: 'sort',
                            color: '#4ae53a',
                            click: () => this.setOpenSortItem(item),
                          },
                        ]}
                        buttons={[
                          {
                            name: 'BUY',
                            icon: item.inCart ? 'times' : 'cart-plus',
                            color: item.inCart ? '#800f0f' : '#2a7d0e',
                            onPress: () =>
                              item.inCart
                                ? this.setItemUnBought(
                                    item,
                                    itemindex,
                                    catindex
                                  )
                                : this.setItemBought(item, itemindex, catindex),
                          },
                        ]}
                      />
                    ))}
                  </View>
                )
              })}
            </ScrollView>
          </View>

          <Input
            prefix={1}
            onSave={async (name, amount) => {
              await APIShoppingList.addToList(
                this.props.id,
                name,
                parseInt(amount, 10)
              )
              this.refresh()
            }}
          />
          <BottomBox
            title="Listen Optionen"
            style={{ bottom: 0, zIndex: this.state.settings ? 10000 : -1 }}
            items={[
              {
                active: false,
                name: 'Delete all items on List',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: () => this.deleteItems(),
                icon: 'trash',
              },
              {
                active: false,
                name: 'Delete bought Items',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: () => this.deleteBoughtItems(),
                icon: 'hand-holding-usd',
              },
              {
                active: false,
                name: 'Update Categories',
                onClick: () => this.showUpdateCategories(),
                icon: 'edit',
              },
              {
                active: false,
                name: 'Share List',
                onClick: () => this.showShareContext(),
                icon: 'share-alt',
              },
              {
                active: false,
                name: 'Delete List',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: () => this.delteList(),
                icon: 'times',
              },
            ]}
            onClose={() => {
              this.setState({ settings: false })
            }}
            open={this.state.settings}
          />
          <BottomBox
            title="Select new List"
            items={this.state.lists.map(item => ({
              active: item.id === this.state.listId,
              name: item.name,
              onClick: () => {
                this.moveItemToOtherList(item.id)
              },
            }))}
            onClose={() => {
              this.setState({ bottomBox: false })
            }}
            open={this.state.bottomBox}
          />
          <BottomBox
            title="Select new Cat for item"
            items={this.state.newListCats.map((cat, idx) => ({
              active: idx === this.state.newItemList?.catId,
              name: cat.name,
              onClick: async () => {
                await APIShoppingList.moveItemToList(
                  this.state.newItemList?.id ?? 0,
                  cat.id
                )
                this.setState({ items: [] })
                this.refresh()
              },
            }))}
            onClose={() => {
              this.setState({ moveToListBox: false })
            }}
            open={this.state.moveToListBox}
          />
          <BottomBox
            title="Select new Cat"
            items={this.state.items
              .filter(cat => cat.id > 0)
              .map((cat, idx) => ({
                active: idx === this.state.newCatItem?.catId,
                name: cat.name,
                onClick: async () => {
                  this.setState({ newCatBox: false })
                  await this.updateItemCategory(cat)
                },
              }))}
            onClose={() => {
              this.setState({ newCatBox: false })
            }}
            open={this.state.newCatBox}
          />
        </SafeAreaView>
      </ImageBackground>
    )
  }

  async moveItemToOtherList(listId: number) {
    const newListCats = await APICategory.list(listId)
    this.setState({ newListCats, bottomBox: false, moveToListBox: true })
  }
}
