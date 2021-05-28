import * as React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'svg-parser'

import {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Image,
  Line,
  LinearGradient,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Text,
  TextPath,
  TSpan,
  Use,
} from 'react-native-svg'

const tagNameToTag = {
  svg: Svg,
  circle: Circle,
  ellipse: Ellipse,
  g: G,
  text: Text,
  tspan: TSpan,
  textPath: TextPath,
  path: Path,
  polygon: Polygon,
  polyline: Polyline,
  line: Line,
  rect: Rect,
  use: Use,
  image: Image,
  symbol: Symbol,
  defs: Defs,
  linearGradient: LinearGradient,
  radialGradient: RadialGradient,
  stop: Stop,
  clipPath: ClipPath,
  pattern: Pattern,
  mask: Mask,
}

const upperCase = (match: any, letter: string) => letter.toUpperCase()

const camelCase = (phrase: string) => phrase.replace(/-([a-z])/g, upperCase)

const transformStyle = (string: string) => {
  const style: { [key: string]: any } = {}
  const declarations = string.split(';')
  for (let i = 0, l = declarations.length; i < l; i++) {
    const declaration = declarations[i].split(':')
    const property = declaration[0]
    const value = declaration[1]
    style[camelCase(property.trim())] = value.trim()
  }

  return style
}

const camelCaseProps = (properties: { [x: string]: any; style?: any }) => {
  const { style } = properties
  const props: { [key: string]: any } = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const property in properties) {
    if (property in properties) {
      props[camelCase(property)] = properties[property]
    }
  }

  if (style) {
    props.style = transformStyle(style)
  }

  return props
}

const childToSvg = (
  child: { tagName: any; properties: any; children: any },
  i: React.Key | null | undefined
) => {
  const { tagName, properties, children } = child
  // @ts-ignore
  const Tag = tagNameToTag[tagName]

  return (
    <Tag key={i} {...camelCaseProps(properties)}>
      {children.map(childToSvg)}
    </Tag>
  )
}

const SVGroot = ({ root, override }: any) => {
  const { properties, children } = root

  return (
    <Svg {...camelCaseProps(properties)} {...override}>
      {children.map(childToSvg)}
    </Svg>
  )
}

export default ({ xml, ...props }: any) => {
  try {
    const hast = parse(xml)

    return <SVGroot root={hast.children[0]} override={props} />
  } catch (e) {
    console.log(e)

    return null
  }
}
