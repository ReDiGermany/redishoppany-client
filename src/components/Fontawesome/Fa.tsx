/* eslint-disable global-require */
import React from 'react'
import { Text, View } from 'react-native'
import SvgFromXml from './SvgFromXml'

export interface IFontaweomeProps {
  name?: string
  style?: any
  fill?: string
  size?: number
}
interface IFontaweomeMainProps extends IFontaweomeProps {
  folder: 'solid' | 'brands' | 'regular'
}

const Fa = (props: IFontaweomeMainProps) => {
  let Icon = null
  try {
    // eslint-disable-next-line import/no-dynamic-require
    Icon = require(`../../../assets/fontawesome/${props.folder}/${props.name}.svg`)
  } catch (e) {
    // eslint-disable-next-line import/no-dynamic-require
    Icon = require(`../../../assets/fontawesome/${props.folder}/question.svg`)
  }

  const SvgData = Icon.toString().replace('data:image/svg+xml;base64,', '')
  const Test = atob(SvgData)

  const ReturnItem = (
    <SvgFromXml
      fill={props.fill}
      size={props.size}
      width={props.size}
      xml={Test}
    />
  )
  if (ReturnItem.type === undefined) {
    return <Text>Error</Text>
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      children={ReturnItem}
    />
  )
}
export { Fa }
