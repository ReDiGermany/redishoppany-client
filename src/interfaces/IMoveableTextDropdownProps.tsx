export default interface IMoveableTextDropdownProps {
  dropdownItems: { label: string; value: string }[]
  dropdownSelected: (_item: { label: string; value: string }) => void
  selectedItem?: number
}
