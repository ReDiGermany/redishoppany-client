export default interface IAlertProps {
  type: 'error' | 'warning' | 'info' | 'success'
  text: string
  info?: string
  exit?: boolean
  onClose?: () => void
  yOffset?: number
}
