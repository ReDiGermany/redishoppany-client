export default interface IScrollViewProps {
  refreshing?: boolean
  onRefresh: () => void
  isTop?: (_is: boolean) => void
  hasNavi?: boolean
  dark?: boolean
  hasBottomBar?: boolean
  bgVisible?: boolean
}
