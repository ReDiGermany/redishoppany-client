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

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export { inArray, inString, calcText, randomColor }
