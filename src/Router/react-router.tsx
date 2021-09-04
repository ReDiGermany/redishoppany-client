import React from 'react'
import {
  NativeRouter,
  Route as NativeRoute,
  Link as NativeLink,
  useHistory as NativeUseHistory,
  Redirect as NativeRedirect,
} from 'react-router-native'

export const Router = NativeRouter
export const Route = NativeRoute
export const Link = NativeLink
export const UseHistory = NativeUseHistory
export const Redirect = NativeRedirect

export const RedirectIfPossible = (props: { to: string }) => {
  if (props.to !== '') return <NativeRedirect to={props.to} />

  return <></>
}
