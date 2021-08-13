import React, { Component } from 'react'
import {
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  ImageBackground,
} from 'react-native'
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

export default class List extends Component<IPageListProps, IPageListState> {
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
  }

  showUpdateCategories() {
    this.setState({ redirect: `/updatecat/${this.state.listId}` })
  }

  // Delete all items
  deleteItems() {
    // TODO: API Call
    // APIShoppingList.
  }

  async deleteBoughtItems() {
    await APIShoppingList.deleteBoughtItems(this.props.id)
    this.reloadList()
  }

  showShareContext() {}

  delteList() {}

  async componentDidMount() {
    await this.reloadList()
  }

  setItemBought(
    item: IShoppingListItem,
    itemindex: number,
    catindex: number
  ): void {
    const { items } = this.state
    items[catindex].items[itemindex].inCart = true
    this.setState({ items })
  }

  setOpenSwitchItem(item: IShoppingListItem): void {
    this.setState({ bottomBox: true })
  }

  setOpenSortItem(item: IShoppingListItem): void {}

  async reloadList() {
    this.setState({ refreshing: true })
    const lists = await APIShoppingList.simpleList()
    console.log('lists', lists)

    const data = await APIShoppingList.singleList(this.props.id)
    this.setState({
      items: data.categories,
      listName: data.name,
      lists,
      listId: data.id,
    })
    this.setState({ refreshing: false })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const onRefresh = async () => {
      await this.reloadList()
    }

    const svStyles: any = {
      overflow: 'hidden',
    }

    // console.log(svStyles)

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
                // console.log('settings')
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
                            color: item.inCart
                              ? 'rgba(255,0,0,.5)'
                              : 'rgba(0,255,0,.5)',
                            onPress: () =>
                              this.setItemBought(item, itemindex, catindex),
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
              this.reloadList()
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
              onClick: () => {},
            }))}
            onClose={() => {
              this.setState({ bottomBox: false })
            }}
            open={this.state.bottomBox}
          />
        </SafeAreaView>
      </ImageBackground>
    )
  }
}
