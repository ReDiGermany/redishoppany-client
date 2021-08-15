export default interface ITextFieldProps {
  name: string
  onChange: (_text: string) => void
  onSubmit: () => void
  isText?: boolean
}
