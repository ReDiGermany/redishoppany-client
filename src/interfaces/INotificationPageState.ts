import IAPINotification from './IAPINotification'

export interface INotificationPageState {
  notifications: IAPINotification[]
  refreshing: boolean
}
