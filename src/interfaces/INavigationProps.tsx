import IAPIUserMe from './IAPIUserMe'

export default interface INavigationProps {
  label: string
  badge?: string
  subTitle?: string
  buttons?: { name: string; onClick?: () => void; icon: string }[]
  user?: IAPIUserMe
  simple?: boolean
  solid?: boolean
}
