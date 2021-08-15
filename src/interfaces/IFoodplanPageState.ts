import IAPIRecipe from './IAPIRecipe'
import IFoodplanItem from './IFoodplanItem'
import IFoodplanKw from './IFoodplanKw'

export default interface IFoodplanPageState {
  plan: IFoodplanKw[]
  refreshing: boolean
  isTop: boolean
  suspendFirstRefresh: boolean
  recipes: IAPIRecipe[]
  item?: IFoodplanItem
  redirect: string
}
