import IAPIPagination from './IAPIPagination'
import IToken from './IToken'

export default interface ITokenList {
  items: IToken[]
  page: IAPIPagination
}
