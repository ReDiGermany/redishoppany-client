export default interface IAPIShareFoodplanFriends {
  accepted: boolean
  id: number
  user: {
    id: number
    name: string
  }
  inList: boolean
}
