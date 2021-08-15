export default interface INavigationTitleProps {
  onPress?: () => void
  badge?: string | number
  label: string
  subTitle?: string
  simple?: boolean
}
