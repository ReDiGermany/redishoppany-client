import React, { Component } from 'react'
import { View, RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'
import ListHeader from '../ListHeader'
import GlobalStyles from '../styles/GlobalStyles'
import Input from '../Input'
import Moveable from '../components/Moveable/Moveable'
import APIShoppingList from '../helper/API/APIShoppingList'
import IShoppingListCategory from '../interfaces/IShoppingListCategory'
import BottomBox from '../BottomBox'

interface IPageListProps extends IPageProps {
  id: number
}

interface IPageListState {
  items: IShoppingListCategory[]
  refreshing: boolean
  scrolling: boolean
  bottomBox: boolean
  lists: { onClick: () => void; name: string }[]
}

export default class List extends Component<IPageListProps, IPageListState> {
  state: IPageListState = {
    items: [],
    refreshing: false,
    scrolling: true,
    bottomBox: false,
    lists: [],
  }

  async componentDidMount() {
    await this.reloadList()
  }

  async reloadList() {
    this.setState({ refreshing: true })
    const test = await APIShoppingList.list()
    console.log('lists', test)

    const data = await APIShoppingList.singleList(this.props.id)
    this.setState({ items: data.categories })
    this.setState({ refreshing: false })
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

    return (
      <View>
        <Navigation
          user={this.props.user}
          label={`MainList${this.props.id}`}
          // badge="10"
          buttons={[
            {
              name: 'deleteAll',
              onClick: () => {
                console.log('deleteAll')
              },
              icon: 'trash',
            },
            {
              name: 'deleteBought',
              onClick: () => {
                console.log('deleteBought')
              },
              icon: 'cart-arrow-down',
            },
          ]}
        />
        <SafeAreaView
          style={{
            height:
              GlobalStyles.appHeight -
              GlobalStyles.barHeight -
              GlobalStyles.statusbarHeight -
              50,
          }}
        >
          <ScrollView
            onScrollBeginDrag={() => {
              this.setState({ scrolling: true })
              console.log('scroll start')
            }}
            onScrollEndDrag={() => {
              this.setState({ scrolling: false })
              console.log('scroll stop')
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {this.state.items.map((cat, catindex) => (
              <View key={`cat_${catindex}`}>
                <ListHeader text={cat.name} />
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
                      console.log('longpress')
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
                    // to="/settings"
                    right={[
                      {
                        icon: 'exchange-alt',
                        color: '#332f99',
                        click: () => {
                          this.setState({ bottomBox: true })
                          console.log('click sub item')
                        },
                      },
                    ]}
                    buttons={[
                      {
                        name: 'BUY',
                        icon: 'cart-plus',
                        color: 'rgba(0,255,0,.5)',
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
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
          items={this.state.lists}
          onClose={() => {
            this.setState({ bottomBox: false })
          }}
          open={this.state.bottomBox}
        />
      </View>
    )
  }
}
