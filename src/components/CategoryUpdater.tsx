import { LinearGradient } from 'expo-linear-gradient'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { HSLToHex } from '../helper/Functions'
import IAPICategory from '../interfaces/IAPICategory'
import ListHeader from '../ListHeader'
import GlobalStyles from '../styles/GlobalStyles'
import ColorPicker from './ColorPicker'
import Moveable from './Moveable/Moveable'
import Row from './Row'

interface ICategoryUpdaterProps {
  item: IAPICategory
  index: number
  maxItems: number
  onStart: () => void
  onEnd: (item: IAPICategory) => void
  onDelete: () => void
  onEditName: () => void
  onSort: (pos: number) => void
  onLongPress?: () => void
  selectorOpen: boolean
}

export default class CategoryUpdater extends Component<ICategoryUpdaterProps> {
  state = {
    item: this.props.item,
    colorSelectorOpen: this.props.selectorOpen,
    colors: [],
    colors2: [],
    openColorPicker: false,
    onLongPress: false,
    sortPos: 0,
  }

  componentDidMount() {
    const max = 7
    const colors: string[] = []
    for (let i = 0; i < 4; i++) {
      colors.push(HSLToHex(359 * ((1 / max) * i)))
    }
    const colors2: string[] = []
    for (let i = 4; i < max; i++) {
      colors2.push(HSLToHex(359 * ((1 / max) * i)))
    }
    this.setState({ colors, colors2 })
  }

  render() {
    const mainColors = StyleSheet.create({
      item: {
        margin: 10,
        width: GlobalStyles().appWidth / 4 - 20,
        height: GlobalStyles().appWidth / 4 - 20,
        borderRadius: GlobalStyles().appWidth / 8,
      },
    }).item

    return (
      <View
        key={this.state.item.id}
        style={{ zIndex: this.state.onLongPress ? 10000 : 0 }}
      >
        <Moveable
          onSort={y => {
            this.setState({
              sortPos: y,
            })
          }}
          onLongPress={() => {
            this.props.onLongPress?.()
            this.setState({ sortItem: this.props.index, onLongPress: true })
          }}
          onEnd={() => {
            this.setState({ onLongPress: false })
            this.props.onSort(this.state.sortPos)
          }}
          large={true}
          bgColor={this.state.item.color}
          name={this.state.item.name}
          onDelete={() => this.props.onDelete()}
          // buttons={[
          //   {
          //     disabled: this.props.index === 0,
          //     color: '#fff',
          //     icon: 'arrow-up',
          //     name: 'test',
          //     onPress: () => {},
          //   },
          //   {
          //     color: '#fff',
          //     icon: 'arrow-down',
          //     name: 'test1',
          //     onPress: () => {},
          //     disabled: this.props.index + 1 === this.props.maxItems,
          //   },
          // ]}
          buttons={[
            {
              disabled: false,
              color: '#fff',
              icon: 'pen',
              name: 'changeName',
              onPress: () => {
                this.props.onEditName()
              },
            },
            {
              disabled: false,
              color: '#fff',
              icon: 'palette',
              name: 'changeColorPalette',
              onPress: () => {
                this.props.onStart()
                this.setState({
                  colorSelectorOpen: !this.state.colorSelectorOpen,
                })
              },
            },
          ]}
        />
        {this.state.colorSelectorOpen && (
          <>
            <Row style={{ width: GlobalStyles().appWidth }}>
              {this.state.colors.map(color => (
                <Pressable
                  onPress={() => {
                    const { item } = this.state
                    item.color = color
                    this.setState({ item })
                    this.props.onEnd(item)
                  }}
                  key={color}
                  style={{
                    backgroundColor: color,
                    ...mainColors,
                  }}
                ></Pressable>
              ))}
            </Row>
            <Row style={{ width: GlobalStyles().appWidth }}>
              {this.state.colors2.map(color => (
                <Pressable
                  onPress={() => {
                    const { item } = this.state
                    item.color = color
                    this.setState({ item })
                    this.props.onEnd(item)
                  }}
                  key={color}
                  style={{
                    backgroundColor: color,
                    ...mainColors,
                  }}
                ></Pressable>
              ))}
              <Pressable
                onPress={() => {
                  this.setState({
                    openColorPicker: !this.state.openColorPicker,
                  })
                }}
              >
                <LinearGradient
                  style={mainColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[...this.state.colors, ...this.state.colors2]}
                >
                  <Text
                    style={{
                      width: mainColors.width,
                      height: mainColors.height,
                      textAlign: 'center',
                      textAlignVertical: 'bottom',
                      paddingBottom: 10,
                      opacity: 0.5,
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    custom
                  </Text>
                </LinearGradient>
              </Pressable>
            </Row>
            {this.state.openColorPicker && (
              <ColorPicker
                onStart={this.props.onStart}
                onEnd={() => this.props.onEnd(this.state.item)}
                onChange={color => {
                  const { item } = this.state
                  item.color = color
                  this.setState({ item })
                }}
              />
            )}
          </>
        )}
        {/* Option 1 */}
        {/* <ListHeader color={this.state.item.color} text={this.state.item.name} />
        <Moveable
          name="Sortierung"
          //   onDelete={() => this.props.onDelete()}
          //   onClick={() => {
          //     this.props.onStart()
          //     this.setState({ colorSelectorOpen: !this.state.colorSelectorOpen })
          //   }}
          buttons={[
            {
              disabled: this.props.index === 0,
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
              disabled: this.props.index + 1 === this.props.maxItems,
            },
          ]}
        />
        <Moveable
          name="Name ändern"
          buttons={[
            {
              color: '#fff',
              icon: 'pen',
              name: 'changeName',
              onPress: () => {},
            },
          ]}
        />
        <Moveable
          name="Farbe ändern"
          buttons={[
            {
              color: '#fff',
              icon: 'random',
              name: 'changeColorRandom',
              onPress: () => {},
            },
            {
              color: '#fff',
              icon: 'palette',
              name: 'changeColorPalette',
              onPress: () => {
                this.props.onStart()
                this.setState({
                  colorSelectorOpen: !this.state.colorSelectorOpen,
                })
              },
            },
          ]}
        />
        {this.state.colorSelectorOpen && (
          <ColorPicker
            onStart={this.props.onStart}
            onEnd={() => this.props.onEnd(this.state.item)}
            onChange={color => {
              const { item } = this.state
              item.color = color
              this.setState({ item })
            }}
          />
        )}
        <Moveable
          name="Löschen"
          onDelete={() => this.props.onDelete()}
          last={true}
        /> */}
      </View>
    )
  }
}
