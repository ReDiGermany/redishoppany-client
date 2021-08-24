import ILoginStateAlert from './ILoginStateAlert'
// import IScreen from './IScreen'

export default interface ILoginState {
  email: string
  password: string
  redirect: string
  emailValid?: boolean
  passwordValid?: boolean
  loggedin: boolean
  loginChecking: boolean
  alert: ILoginStateAlert
  // dimensions: {
  //   window?: IScreen
  //   screen?: IScreen
  // }
}
