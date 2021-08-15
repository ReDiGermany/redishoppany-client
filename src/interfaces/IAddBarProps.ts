export default interface IAddBarProps {
  autoFocus?: boolean
  visible?: boolean
  placeholder: string
  type?: 'email' | 'text'
  icon?: string
  onChange?: (_text: string) => void
  onType?: (_text: string) => void
}
