import { AppStateStatus } from 'react-native'
import IAlertProps from './IAlertProps'
import IAPIUserMe from './IAPIUserMe'

export default interface IIndexState {
  user?: IAPIUserMe
  connected?: boolean
  checkMeDone: boolean
  loggedin: boolean
  appState: AppStateStatus
  alert: IAlertProps
}
