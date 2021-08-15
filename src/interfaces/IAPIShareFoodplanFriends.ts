export default interface IAPIShareFoodplanFriends {
  id: number
  friend: {
    id: number
    firstName: string
    lastName: string
  }
  inList: boolean
}
