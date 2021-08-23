import IAPIUserMe from './IAPIUserMe'

export default interface IIndexState {
  user?: IAPIUserMe
  checkMeDone: boolean
  loggedin: boolean
}
