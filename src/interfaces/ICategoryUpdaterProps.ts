import IAPICategory from './IAPICategory'

export default interface ICategoryUpdaterProps {
  item: IAPICategory
  index: number
  maxItems: number
  onStart?: () => void
  onEnd: (_item: IAPICategory) => void
  onDelete: () => void
  onEditName: () => void
  onSort: (_pos: number) => void
  onLongPress?: () => void
  selectorOpen: boolean
}
