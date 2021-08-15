export default interface IColorPickerProps {
  onChange: (_value: string, _x: number) => void
  onStart: () => void
  onEnd: () => void
}
