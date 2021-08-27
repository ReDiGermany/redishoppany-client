export default interface IQRCodeScanned {
  onSuccess: (_email: string, isMail: boolean) => void
  onFail: () => void
}
