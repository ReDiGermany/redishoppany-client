import IAPICategory from './IAPICategory'

export default interface IUpdateCatState {
  isTop: boolean
  preventScroll: boolean
  color: string
  keyboardHeight: number
  activeItem: number
  yoffset: number
  isActiveItem: boolean
  refreshing: boolean
  list: IAPICategory[]
}
