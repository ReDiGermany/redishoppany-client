export default interface ILoginInputPasswordProps {
  onChange: (_text: string, _valid: boolean | undefined) => void
  onSubmit: () => void
  repeat?: boolean
  placeholder?: string
}
