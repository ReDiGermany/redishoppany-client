import { StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const AddBarStyles = StyleSheet.create({
  input: {
    color: '#fff',
    margin: 10,
    backgroundColor: '#11111180',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: GlobalStyles().appWidth - 20,
    borderColor: '#111',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  icon: {
    height: 38,
    width: 38,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
    color: '#fff',
    marginTop: 10,
    right: 10,
    position: 'absolute',
  },
})
export default AddBarStyles
