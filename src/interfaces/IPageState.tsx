import IAPIFriendsList from './IAPIFriendsList'

export default interface IPageState {
  refreshing: boolean
  isTop: boolean
  add: boolean
  list: IAPIFriendsList
  redirect: string
}
