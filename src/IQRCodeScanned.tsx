export default interface IQRCodeScanned {
  onSuccess: (_email: string) => void
  onFail: () => void
}
