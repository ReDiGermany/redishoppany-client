import React from 'react'
import { View, Image, Text } from 'react-native'
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
import Language from '../../language/Language'
// @ts-ignore
import recipeImageNotFound from '../../../assets/recipe_not_found.jpg'
import { RedirectIfPossible } from '../../Router/react-router'
import AddBar from '../../components/AddBar'
import SafeComponent from '../../components/SafeComponent'
import ScrollView from '../../components/ScrollView'
import PhoneNotConnected from '../../components/PhoneNotConnected'
import AnonAlert from '../../components/AnonAlert'
import InfoMoveable from '../../components/Moveable/InfoMoveable'
import HomeNavigation from '../../components/HomeNavigation'

export default class Recipes extends SafeComponent<IPageProps, IRecipesState> {
  state: IRecipesState = {
    recipes: [],
    redirect: '',
    showOnly: '',
    refreshing: false,
    isTop: false,
  }

  constructor(props: IPageProps) {
    super(props)
    this.refresh()
  }

  async refresh() {
    APIRecipe.list(recipes => this.setState({ recipes, refreshing: false }))
  }

  render() {
    const image = (item: any) => {
      let source: any

      if (item.image === '') source = recipeImageNotFound
      else if (typeof item.image === 'object' && 'uri' in item.image)
        source = item.image
      else source = { uri: item.image }

      return {
        width: GlobalStyles().appWidth,
        height: 150,
        style: imageStyle,
        source,
      }
    }
    let renderedItems = 0

    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        <HomeNavigation
          name="recipes"
          isTop={this.state.isTop}
          user={this.props.user}
          buttons={[
            {
              icon: 'plus',
              name: 'add',
              onClick: () => this.setState({ redirect: '/recipe/add' }),
            },
          ]}
        />
        <ScrollView
          hasBottomBar={true}
          hasNavi={true}
          notTop={isTop => this.setState({ isTop })}
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
