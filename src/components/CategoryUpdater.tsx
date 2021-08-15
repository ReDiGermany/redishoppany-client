import { LinearGradient } from 'expo-linear-gradient'
import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import { HSLToHex } from '../helper/Functions'
import CategoryStyles from '../styles/CategoryStyles'
import ColorPicker from './ColorPicker'
import ICategoryUpdaterProps from '../interfaces/ICategoryUpdaterProps'
import Moveable from './Moveable/Moveable'
import Row from './Row'

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
    for (let i = 0; i < 4; i++) colors.push(HSLToHex(359 * ((1 / max) * i)))

    const colors2: string[] = []
    for (let i = 4; i < max; i++) colors2.push(HSLToHex(359 * ((1 / max) * i)))

    this.setState({ colors, colors2 })
  }

  render() {
    const ColorBlob = (colors: string[]) =>
      colors.map(color => (
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
            ...CategoryStyles.mainColors,
          }}
        />
      ))

    const view = {
      key: this.state.item.id,
      style: { zIndex: this.state.onLongPress ? 10000 : 0 },
    }

    const onSort = (y: number) =>
      this.setState({
        sortPos: y,
      })

    const onLongPress = () => {
      this.props.onLongPress?.()
      this.setState({ sortItem: this.props.index, onLongPress: true })
    }

    const onEnd = () => {
      this.setState({ onLongPress: false })
      this.props.onSort(this.state.sortPos)
    }

    const buttons = [
      {
        disabled: false,
        color: '#fff',
        icon: 'pen',
        name: 'changeName',
        onPress: () => this.props.onEditName(),
      },
      {
        disabled: false,
        color: '#fff',
        icon: 'palette',
        name: 'changeColorPalette',
        onPress: () => {
          this.props.onStart?.()
          this.setState({
            colorSelectorOpen: !this.state.colorSelectorOpen,
          })
        },
      },
    ]

    const moveable = {
      onSort,
      onLongPress,
      onEnd,
      large: true,
      bgColor: this.state.item.color,
      name: this.state.item.name,
      onDelete: () => this.props.onDelete(),
      buttons,
    }

    const linearGradient = {
      style: CategoryStyles.mainColors,
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      colors: [...this.state.colors, ...this.state.colors2],
    }
    const pressable = {
      onPress: () =>
        this.setState({
          openColorPicker: !this.state.openColorPicker,
        }),
    }

    const colorPicker = {
      onStart: this.props.onStart,
      onEnd: () => this.props.onEnd(this.state.item),
      onChange: (color: string) => {
        const { item } = this.state
        item.color = color
        this.setState({ item })
      },
    }

    return (
      <View {...view}>
        <Moveable {...moveable} />
        {this.state.colorSelectorOpen && (
          <>
            <Row style={CategoryStyles.row}>{ColorBlob(this.state.colors)}</Row>
            <Row style={CategoryStyles.row}>
              {ColorBlob(this.state.colors2)}
              <Pressable {...pressable}>
                <LinearGradient {...linearGradient}>
                  <Text style={CategoryStyles.customColorText}>custom</Text>
                </LinearGradient>
              </Pressable>
            </Row>
            {this.state.openColorPicker && <ColorPicker {...colorPicker} />}
          </>
        )}
      </View>
    )
  }
}
