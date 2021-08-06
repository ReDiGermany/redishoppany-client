import IAPIUserMeLists from './IAPIUserMeLists'

export default interface IAPIUserMe {
  profile: {
    firstName: string
    lastName: string
    email: string
    confirmed: boolean
  }
  lists: IAPIUserMeLists[]
  notificationCount: number
  recipeCount: number
  foodplanCount: number
}
