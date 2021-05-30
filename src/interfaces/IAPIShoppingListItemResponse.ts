export default interface IAPIShoppingListItemResponse {
  owner: boolean
  ownerName: string
  items: { id: number; name: string; count: number }[]
}
