export default interface IAddBarProps {
  visible: boolean
  placeholder: string
  type: 'email' | 'text'
  icon?: string
  onChange: (text: string) => void
}
