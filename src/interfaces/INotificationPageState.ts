import IAlertProps from './IAlertProps'
import IAPINotification from './IAPINotification'

export interface INotificationPageState {
  notifications: IAPINotification[]
  refreshing: boolean
  alert: IAlertProps
}
