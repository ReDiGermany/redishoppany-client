import React, { Component } from 'react'
import { ScrollView, View, Image, Text, SafeAreaView } from 'react-native'
import { Link } from 'react-router-native'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'
import GlobalStyles from '../styles/GlobalStyles'

export default class Recipes extends Component<IPageProps> {
  state = {
    recipes: [
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
      {
        name: 'Rezept Name',
        time: 'ca 3h',
        url: '/recipe/asd',
        image:
          'https://www.tasteoftravel.at/wp-content/uploads/Burger-vegetarisch-mit-Kidneybohnen-Rezept.jpg',
      },
    ],
  }

  render() {
    return (
      <View>
        <Navigation label="Rezepte" />
        <SafeAreaView
          style={{
            height:
              GlobalStyles.appHeight -
              GlobalStyles.barHeight -
              GlobalStyles.statusbarHeight,
          }}
        >
          <ScrollView>
            {this.state.recipes.map((item, index) => (
              <Link key={index} to={item.url}>
                <View
                  style={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    height: 150,
                    width: GlobalStyles.appWidth - 40,
                    marginLeft: 20,
                    marginVertical: 10,
                  }}
                >
                  <Image
                    width={GlobalStyles.appWidth}
                    height={150}
                    style={{
                      height: 150,
                      width: '100%',
                    }}
                    source={{ uri: item.image }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 50,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      backgroundColor: 'rgba(0,0,0,.5)',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text
                      style={{
                        textShadowColor: '#000',
                        textShadowOffset: { width: 3, height: 3 },
                        textShadowRadius: 0,
                        color: '#fff',
                        lineHeight: 50,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        lineHeight: 70,
                        fontSize: 12,
                        opacity: 0.5,
                        flex: 1,
                        textAlign: 'right',
                      }}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              </Link>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
