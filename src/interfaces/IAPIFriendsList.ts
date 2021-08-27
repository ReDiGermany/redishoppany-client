import IFriend from './IFriend'

export default interface IAPIFriendsList {
  friends: IFriend[]
  incomming: IFriend[]
  outgoing: IFriend[]
}
