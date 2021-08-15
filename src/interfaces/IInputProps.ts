export default interface IInputProps {
  onSave: (_text: string, _amount: string) => void
  onChange?: (_text: string, _amount: string) => void
  prefix?: any
  textPlaceholder?: string
  amountPlaceholder?: string
  text?: string
  focus?: boolean
}
