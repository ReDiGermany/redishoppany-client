import IAPIUserMe from './IAPIUserMe'

export default interface INavigationProps {
  label: string
  badge?: string
  subTitle?: string
  buttons?: {
    name: string
    onClick?: () => void
    icon: string
    badge?: { color: string; text: string }
  }[]
  user?: IAPIUserMe
  simple?: boolean
  solid?: boolean
}
