export default interface IQRCodeScanned {
  onSuccess: (_email: string, _isMail: boolean) => void
  onFail: () => void
  scanAllowed?: boolean
}
