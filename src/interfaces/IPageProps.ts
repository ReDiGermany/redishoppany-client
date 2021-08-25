import IAPIUserMe from './IAPIUserMe'

export default interface IPageProps {
  user?: IAPIUserMe
  onReload?: () => void
}
