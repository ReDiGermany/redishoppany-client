export default interface IMoveableIconProps {
  initX: number
  initY: number
  posX: number
  posY: number
  moving: boolean
  isLeft: boolean
  isRight: boolean
  last?: boolean
  color: string
  index: number
  length: number
  icon: string
  click: () => void
}
