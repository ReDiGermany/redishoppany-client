export default interface IAddBarProps {
  autoFocus?: boolean
  visible?: boolean
  placeholder: string
  type?: 'email' | 'text'
  icon?: string
  onChange?: (text: string) => void
  onType?: (text: string) => void
}
