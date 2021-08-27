import IAPIUserMe from './IAPIUserMe'

export default interface IPageProps {
  user?: IAPIUserMe
  connected?: boolean
  onReload?: () => void
}
