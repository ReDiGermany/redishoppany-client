import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ScrollView, View, Image, Text, Pressable } from 'react-native'
import BottomBox from '../components/BottomBox'
import Navigation from '../components/Navigation'
import GlobalStyles from '../styles/GlobalStyles'
import {
  btn,
  btnBox,
  btnDelete,
  btnEdit,
  btnIcon,
  header,
  ingredient,
  ingredientBull,
  ingredients,
  text,
  textBox,
  titleInfo,
  titleText,
} from '../styles/RecipeStyle'
import IPageProps from '../interfaces/IPageProps'
import { RedirectIfPossible } from '../Router/react-router'
import SafeComponent from '../components/SafeComponent'
import APIRecipe from '../helper/API/APIRecipe'
// @ts-ignore
import recipeImageNotFound from '../../assets/recipe_not_found.jpg'
import IAPIRecipeDetails from '../interfaces/IAPIRecipeDetails'
import APIShareRecipe from '../helper/API/APIShareRecipe'
import ISharedFriend from '../interfaces/ISharedFriend'

interface IRecipeState {
  deleteConfirmBox: boolean
  shareBox: boolean
  focusText: boolean
  friends: ISharedFriend[]
  redirect: string
  recipe: IAPIRecipeDetails
}

interface IRecipesProps extends IPageProps {
  id: number
}

export default class Recipes extends SafeComponent<
  IRecipesProps,
  IRecipeState
> {
  state: IRecipeState = {
    recipe: {
      text: '',
      lastCooked: '',
      name: '',
      time: '',
      id: -1,
      image: '',
      owner: true,
      items: [],
    },
    friends: [],
    deleteConfirmBox: false,
    shareBox: false,
    focusText: false,
    redirect: '',
  }

  constructor(props: IRecipesProps) {
    super(props)
    this.refresh()
  }

  refresh() {
    APIRecipe.getSingle(this.props.id, recipe => this.setState({ recipe }))
    APIShareRecipe.friends(this.props.id, friends => this.setState({ friends }))
  }

  render() {
    return (
      <View style={{ height: GlobalStyles().contentHeight }}>
        <RedirectIfPossible to={this.state.redirect} />
        <Navigation
          user={this.props.user}
          label="Rezept"
          buttons={[
            {
              icon: 'share-alt',
              name: 'edit',
              onClick: async () => this.setState({ shareBox: true }),
            },
          ]}
        />
        <ScrollView>
          <Image
            width={GlobalStyles().appWidth}
            height={150}
            style={header}
            source={
              this.state.recipe.image === ''
                ? recipeImageNotFound
                : { uri: this.state.recipe.image }
            }
          />
          <View>
            <Text style={titleText}>Rezept</Text>
            <Text style={titleInfo}>ca. 3h</Text>
          </View>
          <View style={ingredients}>
            {this.state.recipe.items.map((txt, index) => (
              <Text key={index} style={ingredient}>
                <Text style={ingredientBull}>&bull;</Text> {txt.amount}{' '}
                {txt.name}
              </Text>
            ))}
          </View>
          <View style={textBox}>
            <Text
              onPress={() => {
                this.setState({ focusText: !this.state.focusText })
              }}
              style={text(this.state.focusText)}
            >
              {this.state.focusText
                ? this.state.recipe.text
                : `${this.state.recipe.text.substr(0, 200)}... [weiterlesen]`}
            </Text>
          </View>
          <View style={btnBox}>
            <Pressable
              style={btn}
              onPress={() =>
                this.setState({ redirect: `/recipe/edit/${this.props.id}` })
              }
            >
              <Icon style={[btnIcon, btnEdit]} size={18} name="pen" />
            </Pressable>
            <Pressable
              style={btn}
              onPress={() => {
                this.setState({ deleteConfirmBox: true })
              }}
            >
              <Icon style={[btnIcon, btnDelete]} size={18} name="trash" />
            </Pressable>
          </View>
        </ScrollView>
        <BottomBox
          title="Wirklich löschen?"
          onClose={() => {
            this.setState({ deleteConfirmBox: false })
          }}
          open={this.state.deleteConfirmBox}
          items={[
            {
              onClick: async () => {
                await APIRecipe.delete(this.props.id)
                this.setState({ deleteConfirmBox: false })
              },
              name: 'Löschen',
              active: false,
            },
          ]}
        />
        <BottomBox
          title="Rezept teilen mit"
          onClose={() => {
            this.setState({ shareBox: false })
          }}
          open={this.state.shareBox}
          items={this.state.friends.map((friend: ISharedFriend) => ({
            onClick: () => {
              APIShareRecipe.invite(this.props.id, friend.userId, () => {
                this.setState({ shareBox: false })
              })
            },
            onDelete: friend.inList
              ? () => {
                  APIShareRecipe.revoke(friend.id)
                  this.refresh()
                }
              : undefined,
            name: friend.name,
            active: friend.inList,
          }))}
        />
      </View>
    )
  }
}
