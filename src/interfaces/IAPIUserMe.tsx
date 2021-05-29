export default interface IAPIUserMe {
  profile: {
    firstName: string
    lastName: string
    email: string
    confirmed: boolean
  }
  lists: [
    {
      owner: boolean
      ownerName: string
      items: { id: number; name: string; count: number }[]
    }
  ]
  notificationCount: number
  recipeCount: number
  foodplanCount: number
}
