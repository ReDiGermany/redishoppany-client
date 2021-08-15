import IPageProps from './IPageProps'

export default interface IQRScannerProps extends IPageProps {
  onScan: (_text: string) => void
}
