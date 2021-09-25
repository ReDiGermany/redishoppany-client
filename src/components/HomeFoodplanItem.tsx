import React from 'react'
import { View } from 'react-native'
import IFoodplanItem from '../interfaces/IFoodplanItem'
import IFoodplanKw from '../interfaces/IFoodplanKw'
import IMoveableButtonProps from '../interfaces/IMoveableButtonProps'
import IMoveableProps from '../interfaces/IMoveableProps'
import Language from '../language/Language'
import { RedirectIfPossible } from '../Router/react-router'
import GlobalStyles from '../styles/GlobalStyles'
import ListHeader from './ListHeader'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'

// TODO: Add recipe to cart
export default class HomeFoodplanItem extends SafeComponent<{
  kw: IFoodplanKw
  remove: (_item: IFoodplanItem) => void
}> {
  state = {
    redirect: '',
  }

  parseDate(date: string) {
    return Language.get(
      ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'][
        new Date(date).getDay()
      ].toLowerCase()
    )
  }

  render() {
    const currentDate = new Date()

    return (
      <View>
        <RedirectIfPossible to={this.state.redirect} />
        <ListHeader
          color="#111111"
          text={`KW ${this.props.kw.name.split('-')[1]}`}
        />
        {this.props.kw.items.map((item: IFoodplanItem, idx) => {
          if (item.recipe === null) {
            return (
              <Moveable
                key={`add_${item.date}`}
                name={`ADD RECIPE for ${this.parseDate(item.date)}`}
                centerText={true}
                boldText={true}
                onClick={() => {
                  // TODO: fill
                }}
              />
            )
          }

          const mbuttons: IMoveableButtonProps[] = []

          if (!item.inCart)
            mbuttons.push({
              color: GlobalStyles().color.accent,
              icon: 'shopping-basket',
              name: 'cart',
              onPress: () => {
                // console.log(item)
                this.setState({ redirect: `/foodplantocart/${item.id}` })
                // this.setState({ item })
                // APIFoodplan.addToCart(item.id)
              },
            })
          const disabled = new Date(item.date) < currentDate
          if (disabled) mbuttons.splice(0)
          mbuttons.push({
            color: '#fcba03',
            icon: 'share-square',
            name: 'go',
            onPress: () => {
              // console.log('recipe', item.recipe.id)
              this.setState({ redirect: `/recipe/${item.recipe.id}` })
            },
          })

          const moveable: IMoveableProps = {
            onDelete: undefined,
            prefix: this.parseDate(item.date),
            name: item.recipe.name ?? '?',
            last: idx === this.props.kw.items.length - 1,
            buttons: mbuttons,
            disabled,
          }

          if (!disabled) {
            moveable.onDelete = () => this.props.remove(item)
          }

          return <Moveable key={item.id} {...moveable} />
        })}
      </View>
    )
  }
}
