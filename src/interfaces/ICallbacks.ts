export interface ICallbackBoolean extends ICallback<boolean> {}
export interface ICallbackString extends ICallback<string> {}
export interface ICallback<T> {
  (_ret: T): void
}
