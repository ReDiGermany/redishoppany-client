import { StyleSheet } from 'react-native'

const BottomNavigationStyle = StyleSheet.create({
  row: {
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    height: 50,
    lineHeight: 50,
  },
  button: {
    backgroundColor: 'transparent',
    width: 60,
    height: 45,
    textAlign: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
  },
  text: {
    color: 'transparent',
    fontSize: 10,
    textAlign: 'center',
  },
  activeButton: {
    backgroundColor: '#202020',
  },
  activeIcon: {
    marginTop: 10,
    fontSize: 15,
  },
  activeText: {
    color: '#ffffff33',
  },
})
export default BottomNavigationStyle
