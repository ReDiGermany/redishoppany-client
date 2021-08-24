export default interface ILoginSocialButtonProps {
  icon: string
  color: string
  url: string
  onPress?: () => void
  onUrl?: (url: string) => void
}
