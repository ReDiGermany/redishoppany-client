import IAlertProps from './IAlertProps'
import IAPIShareFoodplanFriends from './IAPIShareFoodplanFriends'
import IFoodplanPlan from './IFoodplanPlan'

export default interface ISettingsState {
  plans: IFoodplanPlan[]
  shareFoodplanBox: boolean
  activeFoodplanBox: boolean
  foodplanFriends: IAPIShareFoodplanFriends[]
  redirect: string
  alert: IAlertProps
}
