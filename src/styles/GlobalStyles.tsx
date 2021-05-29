import { Dimensions, StatusBar } from 'react-native'

const appHeight =
  Dimensions.get('window').height + (StatusBar.currentHeight ?? 0)
const appWidth = Dimensions.get('window').width

// window.ResizeObserver = { new (callback: ResizeObserverCallback): ResizeObserver; prototype: ResizeObserver; }

const data = {
  dark: {
    deep: '#111',
    light: '#202020',
    bright: 'rgba(255,255,255,.3)',
  },
  color: {
    accent: '#015AA2',
    light: '#fff',
    dimmed: 'rgba(255,255,255,.5)',
    red: '#b50000',
  },
  appWidth,
  lineHeight: 50,
  barHeight: 60,
  appHeight,
  statusbarHeight: StatusBar.currentHeight ?? 0,
  contentHeight: 0,
}

const contentHeight = data.appHeight - data.barHeight - data.statusbarHeight

export default {
  ...data,
  contentHeight,
  // calculateAble: { ...data.calculateAble, contentHeight },
}