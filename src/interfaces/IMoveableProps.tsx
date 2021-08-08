export default interface IMoveableProps {
  style?: any
  name?: string
  onDelete?: () => void
  right?: { icon: string; color: string; click: () => void }[]
  buttons?: { name: string; icon: string; color: string; onPress: () => void }[]
  prefix?: number | string
  to?: string
  onPop?: () => void
  onLongPress?: () => void
  onRelease?: () => void
  open?: boolean
  visible?: boolean
  dropdownItems?: { label: string; value: string }[]
  dropdownSelected?: (_item: { label: string; value: string }) => void
  checked?: boolean
  onClick?: () => void
  large?: boolean
  centerText?: boolean
  last?: boolean
  disabled?: boolean
  boldText?: boolean
}
