import IAPIUserMe from './IAPIUserMe'

export default interface INavigationProps {
  label: string
  badge?: string
  buttons?: { name: string; onClick?: () => void; icon: string }[]
  user?: IAPIUserMe
}
