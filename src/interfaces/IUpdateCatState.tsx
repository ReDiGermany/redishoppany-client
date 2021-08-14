import IAPICategory from './IAPICategory'

export default interface IUpdateCatState {
  isTop: boolean
  keyboardHeight: number
  refreshing: boolean
  list: IAPICategory[]
}
