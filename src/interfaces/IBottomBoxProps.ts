export default interface IBottomBoxProps {
  open?: boolean
  onClose?: () => void
  title?: string
  items?: {
    onClick: () => void
    name: string
    active: boolean
    onDelete?: () => void
    icon?: string
  }[]
  style?: any
  animationState?: (_state: number) => void
}
