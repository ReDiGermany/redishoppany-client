import IAPIUserMe from './IAPIUserMe'
import INavigationPropsButton from './INavigationPropsButton'

export default interface INavigationProps {
  label: string
  badge?: string
  subTitle?: string
  buttons?: INavigationPropsButton[]
  user?: IAPIUserMe
  simple?: boolean
  solid?: boolean
}
