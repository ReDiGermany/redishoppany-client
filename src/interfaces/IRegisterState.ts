import IAlertProps from './IAlertProps'

export default interface IRegisterState {
  firstName: string
  lastName: string
  password: string
  passwordRepeat: string
  redirect: string
  email: string
  keyboardHeight: number
  checking: boolean
  disabled: boolean
  emailValid?: boolean
  passwordValid?: boolean
  passwordRepeatValid?: boolean
  alert: IAlertProps
}
