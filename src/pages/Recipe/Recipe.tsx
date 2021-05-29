import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  Pressable,
} from 'react-native'
import BottomBox from '../../BottomBox'
import Navigation from '../../Navigation'
import GlobalStyles from '../../styles/GlobalStyles'
import {
  btn,
  btnBox,
  btnDelete,
  btnEdit,
  btnIcon,
  contentHeight,
  header,
  ingredient,
  ingredientBull,
  ingredients,
  text,
  textBox,
  titleInfo,
  titleText,
} from '../../styles/RecipeStyle'
import IPageProps from '../../interfaces/IPageProps'

export default class Recipes extends Component<IPageProps> {
  state = {
    deleteConfirmBox: false,
    shareBox: false,
    focusText: false,
    ingredients: [
      'test',
      'test1',
      'test2',
      'test3',
      'test',
      'test1',
      'test2',
      'test3',
    ],
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  }

  render() {
    const url =
      'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg'

    const shareButton = [
      {
        icon: 'share-alt',
        name: 'edit',
        onClick: () => {
          this.setState({ shareBox: true })
        },
      },
    ]

    const headerImage = {
      width: GlobalStyles.appWidth,
      height: 150,
      style: header,
      source: { uri: url },
    }

    return (
      <View>
        <Navigation label="Rezept" buttons={shareButton} />
        <SafeAreaView style={contentHeight}>
          <ScrollView>
            <Image {...headerImage} />
            <View>
              <Text style={titleText}>Rezept</Text>
              <Text style={titleInfo}>ca. 3h</Text>
            </View>
            <View style={ingredients}>
              {this.state.ingredients.map((txt, index) => (
                <Text key={index} style={ingredient}>
                  <Text style={ingredientBull}>&bull;</Text> {txt}
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
                  ? this.state.text
                  : `${this.state.text.substr(0, 200)}... [weiterlesen]`}
              </Text>
            </View>
            <View style={btnBox}>
              <Pressable style={btn} onPress={() => {}}>
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
        </SafeAreaView>
        <BottomBox
          title="Wirklich löschen?"
          onClose={() => {
            this.setState({ deleteConfirmBox: false })
          }}
          open={this.state.deleteConfirmBox}
          items={[
            {
              onClick: () => {
                this.setState({ deleteConfirmBox: false })
                console.log('jetzt Löschen.')
              },
              name: 'Löschen',
            },
          ]}
        />
        <BottomBox
          title="Rezept teilen mit"
          onClose={() => {
            this.setState({ shareBox: false })
          }}
          open={this.state.shareBox}
          items={[
            {
              onClick: () => {
                this.setState({ shareBox: false })
              },
              name: 'A. Lien',
            },
            {
              onClick: () => {
                this.setState({ shareBox: false })
              },
              name: 'I. Seven',
            },
            {
              onClick: () => {
                this.setState({ shareBox: false })
              },
              name: 'K. Ahnung',
            },
          ]}
        />
      </View>
    )
  }
}
