export default interface ILoginStateAlert {
  type: 'error' | 'warning' | 'info' | 'success'
  text: string
  info?: string
}
