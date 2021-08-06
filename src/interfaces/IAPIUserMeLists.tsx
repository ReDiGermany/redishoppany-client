export default interface IAPIUserMeLists {
  owner: boolean
  ownerName: string
  items: { id: number; name: string; count: number }[]
}
