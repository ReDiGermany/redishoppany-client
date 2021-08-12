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

export default class List extends Component<IPageListProps, IPageListState> {
  state: IPageListState = {
    items: [],
    refreshing: false,
    scrolling: true,
    bottomBox: false,
    lists: [],
    settings: false,
    bottomBoxState: 0,
    listName: 'Loading...',
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

  setItemBought(item: IShoppingListItem): void {}

  setOpenSwitchItem(item: IShoppingListItem): void {}

  async reloadList() {
    this.setState({ refreshing: true })
    // const test = await APIShoppingList.list()
    // console.log('lists', test)

    const data = await APIShoppingList.singleList(this.props.id)
    // console.log(data)
    this.setState({ items: data.categories, listName: data.name })
    this.setState({ refreshing: false })
    // console.log(this.state)
  }

  render() {
    const onRefresh = async () => {
      await this.reloadList()
    }

    const eachItem = (
      catindex: number,
      itemindex: number,
      callback: (
        _item: any,
        _current: boolean,
        _cindex: number,
        _iindex: number
      ) => void
    ) => {
      this.state.items?.forEach((cat, ccatindex) => {
        cat.items.forEach((item, citemindex) => {
          callback(
            item,
            ccatindex === catindex && citemindex === itemindex,
            ccatindex,
            citemindex
          )
        })
      })
    }

    const svStyles: any = {
      height:
        GlobalStyles().contentHeight +
        60 -
        (this.state.settings ? GlobalStyles().lineHeight * 3.5 : 0),
      overflow: 'hidden',
    }

    // console.log(svStyles)

    return (
      <ImageBackground
        source={require('../../assets/background.jpg')}
        resizeMode="cover"
        style={{
          width: GlobalStyles().appWidth,
          height: GlobalStyles().contentHeight,
        }}
      >
        <Navigation
          user={this.props.user}
          label={this.state.listName}
          buttons={[
            {
              name: 'deleteBought',
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
            height: GlobalStyles().contentHeight - 60,
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
              style={svStyles}
            >
              {this.state.items.map((cat, catindex) => {
                if (cat.items.length === 0)
                  return <View key={`cat_${catindex}`}></View>

                return (
                  <View key={`cat_${catindex}`}>
                    <ListHeader color="#4ae53a" text={cat.name} />
                    {cat.items.map((item, itemindex) => (
                      <Moveable
                        key={`item_${catindex}_${itemindex}`}
                        onRelease={() => {
                          // console.log("release");
                          let changed = false
                          const { items } = this.state
                          eachItem(
                            catindex,
                            itemindex,
                            (_item, current, cindex, iindex) => {
                              if (!current) {
                                items[cindex].items[iindex].visible = true
                                changed = true
                              }
                            }
                          )
                          if (changed) this.setState({ items })
                        }}
                        onLongPress={() => {
                          // console.log('longpress')
                          let changed = false
                          const { items } = this.state
                          eachItem(
                            catindex,
                            itemindex,
                            (_item, current, cindex, iindex) => {
                              if (!current) {
                                items[cindex].items[iindex].visible = false
                                changed = true
                              }
                            }
                          )
                          if (changed) this.setState({ items })
                        }}
                        onPop={() => {
                          let changed = false
                          const { items } = this.state
                          eachItem(
                            catindex,
                            itemindex,
                            (_item, current, cindex, iindex) => {
                              if (item.open !== current) {
                                items[cindex].items[iindex].open = current
                                changed = true
                              }
                            }
                          )
                          if (changed) this.setState({ items })
                        }}
                        visible={item.visible}
                        open={item.open}
                        onDelete={() => {}}
                        prefix="1"
                        name={item.name}
                        last={itemindex + 1 === cat.items.length}
                        // to="/settings"
                        right={[
                          {
                            icon: 'exchange-alt',
                            color: '#332f99',
                            click: () => this.setOpenSwitchItem(item),
                          },
                          {
                            icon: 'sort',
                            color: '#4ae53a',
                            click: () => this.setOpenSwitchItem(item),
                          },
                        ]}
                        buttons={[
                          {
                            name: 'BUY',
                            icon: 'cart-plus',
                            color: 'rgba(0,255,0,.5)',
                            onPress: () => this.setItemBought(item),
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
            // animationState={bottomBoxState => this.setState({ bottomBoxState })}
            title="Listen Optionen"
            style={{ bottom: -50, zIndex: this.state.settings ? 10000 : -1 }}
            items={[
              {
                active: false,
                name: 'Delete all items on List',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: this.deleteItems,
                icon: 'trash',
              },
              {
                active: false,
                name: 'Delete bought Items',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: this.deleteBoughtItems,
                icon: 'broom',
              },
              {
                active: false,
                name: 'Share List',
                onClick: this.showShareContext,
                icon: 'share-alt',
              },
              {
                active: false,
                name: 'Delete List',
                onClick: () => {
                  ToastAndroid.show('Swipe to delete', 1000)
                },
                onDelete: this.delteList,
                icon: 'times',
              },
            ]}
            onClose={() => {
              this.setState({ settings: false })
            }}
            open={this.state.settings}
          />
          <BottomBox
            items={this.state.lists}
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
