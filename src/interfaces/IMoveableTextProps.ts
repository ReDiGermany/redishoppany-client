export default interface IMoveableTextProps {
  posX: number
  onStart?: (_x: number, _y: number) => void
  handle?: (_e: any) => void
  stop?: () => void
  touchStart?: () => void
  text?: string
  buttons?: {
    name: string
    icon: string
    color: string
    onPress: () => void
    disabled?: boolean
  }[]
  prefix?: number | string
  to?: string
  onLongPress?: () => void
  onRelease?: () => void
  dropdownItems?: { label: string; value: string }[]
  dropdownSelected?: (_item: { label: string; value: string }) => void
  checked?: boolean
  onClick?: () => void
  centerText?: boolean
  large?: boolean
  last?: boolean
  disabled?: boolean
  boldText?: boolean
  selectedItem?: number | string
  bgOpacity?: string
  icon?: string
  bgColor?: string
  fullWidth?: boolean
  onSort?: (_posY: number) => void
  onEnd?: () => void
}
