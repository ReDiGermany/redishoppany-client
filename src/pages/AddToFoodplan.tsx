import React from 'react'
import { ScrollView, View, Image, Text, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import APIRecipe from '../helper/API/APIRecipe'
import IPageProps from '../interfaces/IPageProps'
import GlobalStyles from '../styles/GlobalStyles'
import IRecipesState from '../interfaces/IRecipesState'
import {
  image as imageStyle,
  imageBox,
  nameBox,
  textBox,
  timeBox,
} from '../styles/RecipesListStyle'
import Navigation from '../Navigation'
import Language from '../language/Language'
// @ts-ignore
import recipeImageNotFound from '../../assets/recipe_not_found.jpg'
import { Redirect } from '../Router/react-router'
import AddBar from '../components/AddBar'
import APIFoodplan from '../helper/API/APIFoodplan'
import SafeComponent from '../components/SafeComponent'
import IAPIRecipe from '../interfaces/IAPIRecipe'

export default class AddToFoodplan extends SafeComponent<
  IPageProps,
  IRecipesState
> {
  state: IRecipesState = {
    recipes: [],
    redirect: '',
    showOnly: '',
    refreshing: false,
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const recipes = await AsyncStorage.getItem('recipeList')
      if (recipes !== null) {
        const rec: IAPIRecipe[] = JSON.parse(recipes)
        let image: string | number | { uri: string } = -1
        try {
          rec.forEach((item, idx) => {
            image = item.image
            if (
              typeof image === 'number' ||
              (typeof image === 'string' && image === '') ||
              (typeof image === 'object' && 'uri' in image && image.uri === '')
            )
              rec[idx].image = recipeImageNotFound
            else rec[idx].image = { uri: item.image }
          })
        } catch (e) {
          console.log('HomeRecipes.tsx', { e, rec, image })
        }
        this.setState({ recipes: rec })
      }
    })()
  }

  async componentDidMount() {
    this.refresh()
  }

  async refresh() {
    const recipes = await APIRecipe.list()
    recipes.forEach((item, idx) => {
      if (item.image === '') recipes[idx].image = recipeImageNotFound
      else recipes[idx].image = { uri: item.image }
    })
    await AsyncStorage.setItem('recipeList', JSON.stringify(recipes))
    this.setState({ recipes, refreshing: false })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const image = (item: any) => ({
      width: GlobalStyles().appWidth,
      height: 150,
      style: imageStyle,
      source: item.image,
    })
    let renderedItems = 0

    return (
      <ScrollView
        style={{
          height: GlobalStyles().appHeight - GlobalStyles().statusbarHeight,
        }}
      >
        <Navigation label={Language.get('addrecipetofoodplan')} />
        <AddBar
          onType={showOnly => this.setState({ showOnly })}
          placeholder={Language.get('search')}
          autoFocus={false}
        />
        {this.state.recipes.map((item, index) => {
          if (
            this.state.showOnly !== '' &&
            !item.name.match(this.state.showOnly)
          )
            return <View key={index}></View>

          renderedItems++

          return (
            <Pressable
              key={index}
              onPress={async () => {
                await APIFoodplan.add(item.id)
                this.setState({ redirect: '/' })
              }}
            >
              <View style={imageBox}>
                <Image {...image(item)} />
                <View style={textBox}>
                  <Text style={nameBox}>{item.name}</Text>
                  <Text style={timeBox}>{item.time}</Text>
                </View>
              </View>
            </Pressable>
          )
        })}
        {renderedItems === 0 && (
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              opacity: 0.5,
              fontWeight: 'bold',
              textDecorationStyle: 'solid',
              textDecorationLine: 'underline',
            }}
          >
            {Language.get('no_recipe_found')}
          </Text>
        )}
      </ScrollView>
    )
  }
}
