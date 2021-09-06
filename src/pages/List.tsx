import React from 'react'
import { View, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navigation from '../components/Navigation'
import ListHeader from '../components/ListHeader'
import GlobalStyles, { KeyboardDetection } from '../styles/GlobalStyles'
import Input from '../components/Input'
import Moveable from '../components/Moveable/Moveable'
import APIShoppingList from '../helper/API/APIShoppingList'
import BottomBox from '../components/BottomBox'
import IShoppingListItem from '../interfaces/IShoppingListItem'
import IPageListState from '../interfaces/IPageListState'
import IPageListProps from '../interfaces/IPageListProps'
import { Redirect } from '../Router/react-router'
import IShoppingListCategory from '../interfaces/IShoppingListCategory'
import APICategory from '../helper/API/APICategory'
import SafeComponent from '../components/SafeComponent'
import {
  DefAlert,
  DefPreErrorAlert,
  SuccessAlert,
} from '../helper/DefinedAlerts'
import Alert from '../components/Alert'
import BackgroundImage from '../components/BackgroundImage'
import ScrollView from '../components/ScrollView'

// TODO: Finalize
export default class List extends SafeComponent<
  IPageListProps,
  IPageListState
> {
  state: IPageListState = {
    items: [],
    owned: true,
    owner: 'Unknown',
    refreshing: false,
    scrolling: true,
    bottomBox: false,
    lists: [],
    settings: false,
    preventScroll: false,
    isTop: false,
    bottomBoxState: 0,
    listName: 'Loading...',
    redirect: '',
    listId: 0,
    newCatBox: false,
    moveToListBox: false,
    newCatItem: undefined,
    newItemList: undefined,
    newListCats: [],
    alert: DefAlert,
    keyboardHeight: 0,
  }

  showUpdateCategories() {
    this.setState({ redirect: `/updatecat/${this.state.listId}` })
  }

  async deleteItems() {
    await APIShoppingList.deleteAllItems(this.props.id)
    this.setState({
      items: [],
      settings: false,
      lists: [],
      alert: SuccessAlert('list.items.cleared'),
    })
    await this.refresh()
  }

  async deleteBoughtItems() {
    await APIShoppingList.deleteBoughtItems(this.props.id)
    this.setState({
      settings: false,
      alert: SuccessAlert('list.items.bought.cleared'),
    })
    this.refresh()
  }

  showShareContext() {
    // TODO: implement
  }

  async delteList() {
    const done = await APIShoppingList.deleteList(this.props.id)
    if (done) this.setState({ redirect: '/reload' })
    else {
      this.setState({ alert: DefPreErrorAlert('shoppinglist.delete.failed') })
    }
  }

  constructor(props: IPageListProps) {
    super(props)
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
  }

  async refresh() {
    APIShoppingList.singleList(this.props.id, async d => {
      const data = d
      data.categories.forEach((cat, catIdx) => {
        const items: any[] = []
        if (catIdx !== data.categories.length - 1) {
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
          data.categories[catIdx].items = items
        }
      })
      this.setState({
        owned: data.owned,
        owner: data.owner,
        items: data.categories,
        listName: data.name,
        listId: data.id,
      })
    })
  }

  async updateItemCategory(cat: IShoppingListCategory) {
    await APIShoppingList.updateItemCategory(
      this.state.newCatItem?.id ?? 0,
      cat.id
    )
    this.setState({ items: [], refreshing: true })
    await this.refresh()
  }

  leaveList(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async moveItemToOtherList(listId: number) {
    APICategory.list(listId, newListCats =>
      this.setState({ newListCats, bottomBox: false, moveToListBox: true })
    )
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const onRefresh = async () => {
      this.setState({ refreshing: true })
      await this.refresh()
    }

    const emptyList =
      this.state.items.length === 0 ||
      (this.state.items.length === 2 &&
        this.state.items[0].items.length === 0 &&
        this.state.items[1].items.length === 0)

    const listOptions = [
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
    ]

    if (!emptyList)
      listOptions.unshift(
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
          name: 'Delete all items on List',
          onClick: () => {
            ToastAndroid.show('Swipe to delete', 1000)
          },
          onDelete: () => this.deleteItems(),
          icon: 'trash',
        }
      )

    if (!this.state.owned)
      listOptions.push({
        active: false,
        name: 'Leave list',
        onClick: () => {
          ToastAndroid.show('Swipe to delete', 1000)
        },
        onDelete: () => this.leaveList(),
        icon: 'sign-out-alt',
      })

    return (
      <KeyboardDetection
        update={(keyboardHeight: any) => this.setState({ keyboardHeight })}
      >
        {this.state.alert.text !== '' && <Alert {...this.state.alert} />}
        <BackgroundImage>
          <Navigation
            user={this.props.user}
            label={this.state.listName}
            solid={this.state.isTop}
            subTitle={!this.state.owned ? `von ${this.state.owner}` : undefined}
            buttons={[
              {
                name: 'openMenu',
                onClick: () =>
                  this.setState({ settings: !this.state.settings }),
                icon: 'ellipsis-v',
              },
            ]}
          />
          <View
            style={{
              height:
                GlobalStyles().contentHeight -
                GlobalStyles().barHeight - // navi
                this.state.keyboardHeight,
            }}
          >
            <ScrollView
              hasBottomBar={true}
              hasNavi={true}
              refreshing={this.state.refreshing}
              onRefresh={onRefresh}
              notTop={isTop => this.setState({ isTop })}
            >
              {emptyList && (
                <>
                  <ListHeader
                    color="#ff000040"
                    text="Diese Liste ist leer :("
                  />
                  <Moveable
                    last={true}
                    centerText={true}
                    name="Aber du kannst unten etwas auf die Liste hinzufügen!"
                  />
                </>
              )}
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
              <View style={{ height: GlobalStyles().barHeight }}></View>
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
            items={listOptions}
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
        </BackgroundImage>
      </KeyboardDetection>
    )
  }
}
