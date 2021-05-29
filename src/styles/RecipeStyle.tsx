import { StyleSheet } from 'react-native'
// import WebStyle from '../helper/WebStyle'
import GlobalStyles from './GlobalStyles'

const {
  textBox,
  ingredientBull,
  contentHeight,
  header,
  titleText,
  titleInfo,
  ingredients,
  ingredient,
  btnBox,
  btn,
  btnIcon,
  btnEdit,
  btnDelete,
} = StyleSheet.create({
  btnIcon: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 5,
  },
  btn: {
    height: 40,
    width: GlobalStyles.appWidth / (GlobalStyles.appWidth < 300 ? 2 : 3) - 20,
    marginBottom: 10,
  },
  btnEdit: {
    backgroundColor: '#ff6600',
  },
  btnDelete: {
    backgroundColor: '#f00',
  },
  btnBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  contentHeight: {
    height: GlobalStyles.contentHeight,
  },
  header: {
    height: 200,
    width: '100%',
  },
  titleText: {
    height: 50,
    lineHeight: 50,
    color: '#fff',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleInfo: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.5,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  ingredients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#111',
    paddingVertical: 15,
  },
  ingredient: {
    paddingLeft: 15,
    height: 40,
    fontSize: 15,
    lineHeight: 40,
    color: '#fff',
    minWidth: GlobalStyles.appWidth / 2,
  },
  ingredientBull: { opacity: 0.3 },
  textBox: {
    backgroundColor: '#111',
    marginVertical: 5,
    padding: 15,
  },
})

const text = (focus: boolean) =>
  StyleSheet.create({
    text: {
      color: '#fff',
      lineHeight: focus ? 35 : 25,
      fontSize: focus ? 20 : 15,
    },
  }).text

export {
  text,
  btnBox,
  btn,
  btnIcon,
  textBox,
  ingredientBull,
  contentHeight,
  header,
  titleText,
  titleInfo,
  ingredients,
  ingredient,
  btnEdit,
  btnDelete,
}
