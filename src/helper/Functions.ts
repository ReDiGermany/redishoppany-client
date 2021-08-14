const inArray = (c: any, items: any[]) => {
  for (let i = 0; i < items.length; i++) {
    if (c === items[i]) return true
  }

  return false
}

const inString = (c: any, items: string) => inArray(c, items.split(''))

const calcText = (inp: string) => {
  let size = 0

  for (let i = 0; i < inp.length; i++) {
    const c = inp.charAt(i)
    if (inString(c, 'fijlrtI')) {
      size += 4
    } else if (inString(c, 'abcdeghkmnopqsuvwxyz')) {
      size += 8
    } else if (inString(c, 'ABCDEFGHJKLMNOPQRSTUVWXYZ')) {
      size += 9.5
    } else {
      size += 8
    }
  }

  return size
}

const forceFullHex = (inp: string) => {
  if (inp.length === 6) return inp

  return '0'.repeat(6 - inp.length) + inp
}

const getColorByMultiplyer = (m: number) =>
  forceFullHex(Math.floor((m > 1 ? 1 : m) * 16777215).toString(16))

// https://css-tricks.com/converting-color-spaces-in-javascript/
const HSLToHex = (h: number) => {
  const s = 0.5
  const l = 0.5

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else if (h >= 300 && h < 360) {
    r = c
    g = 0
    b = x
  }
  // Having obtained RGB, convert channels to hex
  let retR: number | string = Math.round((r + m) * 255).toString(16)
  let retG: number | string = Math.round((g + m) * 255).toString(16)
  let retB: number | string = Math.round((b + m) * 255).toString(16)

  // Prepend 0s, if necessary
  if (retR.length === 1) retR = `0${r}`
  if (retG.length === 1) retG = `0${g}`
  if (retB.length === 1) retB = `0${b}`

  return `#${retR}${retG}${retB}`
}

const randomColor = () => HSLToHex(Math.random() * 359)

// https://stackoverflow.com/a/12043228
const GetLuma = (inp: string) => {
  let c = inp
  if (inp.startsWith('#')) c = inp.substring(1) // strip #
  const rgb = parseInt(c, 16) // convert rrggbb to decimal
  // eslint-disable-next-line no-bitwise
  const r = (rgb >> 16) & 0xff // extract red
  // eslint-disable-next-line no-bitwise
  const g = (rgb >> 8) & 0xff // extract green
  // eslint-disable-next-line no-bitwise
  const b = (rgb >> 0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma
}

export {
  inArray,
  inString,
  calcText,
  randomColor,
  getColorByMultiplyer,
  HSLToHex,
  GetLuma,
}
