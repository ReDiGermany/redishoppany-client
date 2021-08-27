import IFoodplanItem from './IFoodplanItem'
import IFoodplanKw from './IFoodplanKw'

export default interface IFoodplanPageState {
  plan: IFoodplanKw[]
  refreshing: boolean
  isTop: boolean
  suspendFirstRefresh: boolean
  item?: IFoodplanItem
  redirect: string
}
