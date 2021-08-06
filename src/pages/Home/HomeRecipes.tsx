import React, { Component } from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import { Link } from 'react-router-native'
import APIRecipe from '../../helper/API/APIRecipe'
import IPageProps from '../../interfaces/IPageProps'
import GlobalStyles from '../../styles/GlobalStyles'
import IRecipesState from '../../interfaces/IRecipesState'
import {
  image as imageStyle,
  imageBox,
  nameBox,
  textBox,
  timeBox,
} from '../../styles/RecipesListStyle'
import Navigation from '../../Navigation'
import Language from '../../language/Language'
// @ts-ignore
import recipeImageNotFound from '../../../assets/recipe_not_found.jpg'
import { Redirect } from '../../Router/react-router'

export default class Recipes extends Component<IPageProps, IRecipesState> {
  state: IRecipesState = {
    recipes: [],
    redirect: '',
  }

  async componentDidMount() {
    const recipes = await APIRecipe.list()
    recipes.forEach((item, idx) => {
      if (item.image === '') recipes[idx].image = recipeImageNotFound
      else recipes[idx].image = { uri: item.image }
    })
    this.setState({ recipes })
  }

  render() {
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

    const image = (item: any) => ({
      width: GlobalStyles().appWidth,
      height: 150,
      style: imageStyle,
      source: item.image,
    })

    return (
      <ScrollView style={{ height: GlobalStyles().contentHeight }}>
        <Navigation
          label={Language.get('recipes')}
          simple={true}
          buttons={[
            {
              icon: 'plus',
              name: 'add',
              onClick: () => this.setState({ redirect: '/recipe/add' }),
            },
          ]}
        />
        {this.state.recipes.map((item, index) => (
          <Link key={index} to={`/recipe/${item.id}`}>
            <View style={imageBox}>
              <Image {...image(item)} />
              <View style={textBox}>
                <Text style={nameBox}>{item.name}</Text>
                <Text style={timeBox}>{item.time}</Text>
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    )
  }
}
