import IAPIFriendsList from './IAPIFriendsList'

export default interface IPageState {
  refreshing: boolean
  isTop: boolean
  qr: boolean
  add: boolean
  list: IAPIFriendsList
}
