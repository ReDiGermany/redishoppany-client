import React, { Component } from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
import AddBar from '../../components/AddBar'
import INavigationPropsButton from '../../interfaces/INavigationPropsButton'

export default class Recipes extends Component<IPageProps, IRecipesState> {
  state: IRecipesState = {
    recipes: [],
    redirect: '',
    showOnly: '',
  }

  constructor(props: IPageProps) {
    super(props)
    ;(async () => {
      const recipes = await AsyncStorage.getItem('recipeList')
      if (recipes !== null) {
        this.setState({ recipes: JSON.parse(recipes) })
      }
    })()
  }

  async componentDidMount() {
    const recipes = await APIRecipe.list()
    recipes.forEach((item, idx) => {
      if (item.image === '') recipes[idx].image = recipeImageNotFound
      else recipes[idx].image = { uri: item.image }
    })
    await AsyncStorage.setItem('recipeList', JSON.stringify(recipes))
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
    let renderedItems = 0
    const buttons: INavigationPropsButton[] = [
      {
        icon: 'plus',
        name: 'add',
        onClick: () => this.setState({ redirect: '/recipe/add' }),
      },
    ]
    if (this.props.user?.notificationCount)
      buttons.unshift({
        icon: 'bell',
        name: 'notifications',
        onClick: () => this.setState({ redirect: '/notifications' }),
        badge: {
          color: '#900000',
          text: this.props.user?.notificationCount.toString(),
        },
      })

    return (
      <ScrollView style={{ height: GlobalStyles().contentHeight }}>
        <Navigation
          label={Language.get('recipes')}
          simple={true}
          buttons={buttons}
        />
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
            <Link key={index} to={`/recipe/${item.id}`}>
              <View style={imageBox}>
                <Image {...image(item)} />
                <View style={textBox}>
                  <Text style={nameBox}>{item.name}</Text>
                  <Text style={timeBox}>{item.time}</Text>
                </View>
              </View>
            </Link>
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
