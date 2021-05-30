import IAPIPagination from './IAPIPagination'
import IAPIShoppingListItemResponse from './IAPIShoppingListItemResponse'

export default interface IAPIShoppingListResponse {
  items: IAPIShoppingListItemResponse[]
  page: IAPIPagination
}
