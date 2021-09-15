import { AppStateStatus } from 'react-native'
import IAPIUserMe from './IAPIUserMe'

export default interface IIndexState {
  user?: IAPIUserMe
  connected?: boolean
  checkMeDone: boolean
  loggedin: boolean
  appState: AppStateStatus
}
