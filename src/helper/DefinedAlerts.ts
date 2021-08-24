import IAlertProps from '../interfaces/IAlertProps'
import Language from '../language/Language'

export const SuccessAlert = (text: string, info?: string): IAlertProps => ({
  type: 'success',
  text: Language.get(text),
  info: info && Language.get(info),
})

export const WarningAlert = (text: string, info?: string): IAlertProps => ({
  type: 'warning',
  text: Language.get(text),
  info: info && Language.get(info),
})

export const ErrorAlert = (text: string, info?: string): IAlertProps => ({
  type: 'error',
  text: Language.get(text),
  info: info && Language.get(info),
})

export const InfoAlert = (text: string, info?: string): IAlertProps => ({
  type: 'info',
  text: Language.get(text),
  info: info && Language.get(info),
})

export const PreWarningAlert = (
  pre: string,
  text: string,
  info?: string
): IAlertProps => WarningAlert(pre + text, pre + info)

export const PreErrorAlert = (
  pre: string,
  text: string,
  info?: string
): IAlertProps => ErrorAlert(pre + text, pre + info)

export const PreSuccessAlert = (
  pre: string,
  text: string,
  info?: string
): IAlertProps => SuccessAlert(pre + text, pre + info)

export const PreInfoAlert = (
  pre: string,
  text: string,
  info?: string
): IAlertProps => InfoAlert(pre + text, pre + info)
