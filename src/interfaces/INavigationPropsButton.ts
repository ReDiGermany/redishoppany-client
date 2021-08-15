export default interface INavigationPropsButton {
  name: string
  onClick?: () => void
  icon: string
  badge?: { color: string; text: string }
}
