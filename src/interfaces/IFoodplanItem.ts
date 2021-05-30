export default interface IFoodplanItem {
  id: number
  date: string
  inCart: boolean
  recipe: {
    id: number
    name: string
  }
}
