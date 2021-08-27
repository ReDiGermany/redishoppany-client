import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

export const {
  container,
  imageBox,
  image,
  textBox,
  nameBox,
  timeBox,
  notFoundText,
} = StyleSheet.create({
  container: { height: GlobalStyles().contentHeight },
  timeBox: {
    color: '#fff',
    lineHeight: 70,
    fontSize: 12,
    opacity: 0.5,
    flex: 1,
    textAlign: 'right',
  },
  imageBox: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 150,
    width: GlobalStyles().appWidth - 40,
    marginLeft: 20,
    marginVertical: 10,
  },
  image: {
    height: 150,
    width: '100%',
  },
  textBox: {
    flexDirection: 'row',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: 20,
  },
  nameBox: {
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
    color: '#fff',
    lineHeight: 50,
    fontWeight: 'bold',
  },
  notFoundText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.5,
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
})
