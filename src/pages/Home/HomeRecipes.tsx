import React from 'react'
import { View, Image, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
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
import IAPIRecipe from '../../interfaces/IAPIRecipe'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import PhoneNotConnected from '../../components/PhoneNotConnected'
import AnonAlert from '../../components/AnonAlert'
import InfoMoveable from '../../components/Moveable/InfoMoveable'

export default class Recipes extends SafeComponent<IPageProps, IRecipesState> {
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
      <>
        <Navigation
          label={Language.get('recipes')}
          simple={true}
          buttons={buttons}
        />
        <ScrollView
          hasBottomBar={true}
          hasNavi={true}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.setState({ refreshing: true })
            this.refresh()
          }}
        >
          <PhoneNotConnected connected={this.props.connected} />
          <AnonAlert user={this.props.user} />
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
                  <Image
                    {...image(item)}
                    // onError={e => console.log('Image Load Error', e)}
                  />
                  <LinearGradient
                    colors={[
                      'rgba(0,0,0,0)',
                      'rgba(0,0,0,.5)',
                      'rgba(0,0,0,.8)',
                    ]}
                    style={textBox}
                  >
                    <Text style={nameBox}>{item.name}</Text>
                    <Text style={timeBox}>{item.time}</Text>
                  </LinearGradient>
                </View>
              </Link>
            )
          })}
          <InfoMoveable
            show={this.state.recipes.length === 0 || renderedItems === 0}
            name="OOPs! Hier scheint nichts zu sein!"
          />
        </ScrollView>
      </>
    )
  }
}
