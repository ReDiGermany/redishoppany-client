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
import EditRecipe from '../EditRecipe/EditRecipe'
import Navigation from '../../Navigation'
import Language from '../../language/Language'

export default class Recipes extends Component<IPageProps, IRecipesState> {
  state: IRecipesState = {
    recipes: [],
    addRecipe: false,
  }

  async componentDidMount() {
    const recipes = await APIRecipe.list()
    this.setState({ recipes })
  }

  render() {
    const image = (item: any) => ({
      width: GlobalStyles().appWidth,
      height: 150,
      style: imageStyle,
      source: { uri: item.image },
    })

    // const onClick = () => {
    // this.setState({ addRecipe: true })
    // }

    // const buttons = [{ icon: 'plus', name: 'add', onClick }]

    if (this.state.addRecipe) {
      return <EditRecipe user={this.props.user} />
    }
    // console.log(this.state.recipes)

    return (
      <ScrollView style={{ height: GlobalStyles().contentHeight }}>
        <Navigation label={Language.get('recipes')} simple={true} />
        {/* <SafeAreaView style={container}> */}
        {/* <ScrollView> */}
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
        {/* </ScrollView> */}
        {/* </SafeAreaView> */}
      </ScrollView>
    )
  }
}
