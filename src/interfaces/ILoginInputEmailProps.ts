export default interface ILoginInputEmailProps {
  onChange: (_text: string, _valid: boolean | undefined) => void
  onSubmit: () => void
  value?: string
}
