import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Pressable, ScrollView, Text, View } from 'react-native'
import TextField from '../../components/TextField'
import IPageProps from '../../interfaces/IPageProps'
import Navigation from '../../Navigation'
import Ingredient from './Ingredient'
import SafeComponent from '../../components/SafeComponent'

interface IEditRecipeProps extends IPageProps {
  id?: string
}

interface IEditRecipeState {
  name: string
  time: string
  text: string
  items: { name: string; amount: string }[]
  focus: number
}

export default class EditRecipe extends SafeComponent<
  IEditRecipeProps,
  IEditRecipeState
> {
  state: IEditRecipeState = {
    name: '',
    time: '',
    text: '',
    items: [],
    focus: 0,
  }

  render() {
    // APIRecipe.create(name,time,text,items)

    const onSubmit = () => {}

    return (
      <View>
        <Navigation
          user={this.props.user}
          label={`Rezept ${
            this.props.id !== undefined ? 'bearbeiten' : 'hinzufügen'
          }`}
        />
        <ScrollView>
          <TextField
            name="Name"
            onChange={name => this.setState({ name })}
            onSubmit={onSubmit}
          />
          <TextField
            name="Kochzeit"
            onChange={time => this.setState({ time })}
            onSubmit={onSubmit}
          />
          <View style={{ margin: 10 }}>
            <Text style={{ color: 'rgba(255,255,255,.8)' }}>Zutaten</Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              {this.state.items.map((item, itemIndex) => (
                <Ingredient
                  key={item.name}
                  focus={itemIndex === this.state.focus}
                  {...item}
                  onChange={(name, amount, index) => {
                    if (!index) return
                    const { items } = this.state
                    items[index].amount = amount
                    items[index].name = name
                    this.setState({ items })
                  }}
                  onSubmit={onSubmit}
                />
              ))}
              <Ingredient
                focus={false}
                onChange={(name, amount) => {
                  const { items } = this.state
                  items.push({ name, amount })
                  this.setState({ items, focus: this.state.items.length })
                }}
                onSubmit={onSubmit}
              />
            </View>
          </View>
          <TextField
            name="Text"
            isText={true}
            onChange={text => this.setState({ text })}
            onSubmit={onSubmit}
          />
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Pressable
              style={{
                height: 50,
                borderRadius: 5,
                width: '49%',
                backgroundColor: '#4ae53a',
              }}
              onPress={onSubmit}
            >
              <Text style={{ textAlign: 'center', lineHeight: 50 }}>
                <Icon solid={true} name="save" /> Speichern
              </Text>
            </Pressable>
            <Pressable
              style={{
                height: 50,
                borderRadius: 5,
                width: '49%',
                backgroundColor: '#ff6600',
              }}
              onPress={onSubmit}
            >
              <Text style={{ textAlign: 'center', lineHeight: 50 }}>
                <Icon name="exclamation-triangle" /> Abbrechen
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    )
  }
}
