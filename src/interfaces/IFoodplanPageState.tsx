import IFoodplanItem from './IFoodplanItem'
import IAPIRecipe from './IAPIRecipe'

export default interface IFoodplanPageState {
  plan: IFoodplanItem[]
  refreshing: boolean
  isTop: boolean
  recipes: IAPIRecipe[]
}
