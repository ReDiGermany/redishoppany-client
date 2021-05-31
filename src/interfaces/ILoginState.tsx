import ILoginStateAlert from './ILoginStateAlert'

export default interface ILoginState {
  email: string
  password: string
  emailValid?: boolean
  passwordValid?: boolean
  loggedin: boolean
  loginChecking: boolean
  alert: ILoginStateAlert
}
