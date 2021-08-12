import IAPIShoppingListItemResponseItem from './IAPIShoppingListItemResponseItem'

export default interface IAPIShoppingListItemResponse {
  owner: boolean
  ownerName: string
  items: IAPIShoppingListItemResponseItem[]
}
