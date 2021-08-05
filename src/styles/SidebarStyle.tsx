import { Dimensions, StyleSheet } from 'react-native'
import GlobalStyles from './GlobalStyles'

const windowHeight = Dimensions.get('window').height

const outerBox = (open: boolean, opacity: number) =>
  StyleSheet.create({
    row: {
      height: windowHeight - GlobalStyles().barHeight,
      position: 'absolute',
      top: GlobalStyles().barHeight,
      zIndex: open ? 1000 : -1000,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,.5)',
      opacity,
    },
  }).row
const profileName = StyleSheet.create({
  row: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 35,
  },
}).row
const profileImage = StyleSheet.create({
  row: {
    backgroundColor: '#4ae53a',
    borderRadius: 50,
    height: 50,
    width: 50,
    margin: 30,
    marginRight: 10,
  },
}).row
const profileEmail = StyleSheet.create({
  row: { color: '#fff', fontSize: 11, opacity: 0.3 },
}).row
const linkText = StyleSheet.create({
  row: {
    color: '#fff',
    paddingLeft: 10,
    height: 40,
    lineHeight: 40,
    textAlignVertical: 'center',
    fontSize: 18,
  },
}).row
const linkSharedBadgeText = StyleSheet.create({
  row: {
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 10,
    fontSize: 8,
    textTransform: 'uppercase',
    height: 20,
    lineHeight: 20,
    textAlignVertical: 'center',
    opacity: 0.5,
    color: '#4ae53a',
    borderColor: '#4ae53a',
    borderWidth: 1,
    textAlign: 'center',
  },
}).row
const linkBadgeBox = StyleSheet.create({
  row: {
    paddingRight: 10,
    fontSize: 18,
    height: 40,
    lineHeight: 40,
    textAlignVertical: 'center',
    opacity: 0.5,
    color: '#fff',
  },
}).row
const line = StyleSheet.create({
  row: {
    height: 1,
    width: '80%',
    marginLeft: '10%',
    backgroundColor: 'rgba(255,255,255,.2)',
    marginTop: 5,
    marginBottom: 5,
  },
}).row
const heading = StyleSheet.create({
  row: {
    color: '#fff',
    backgroundColor: '#111',
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    lineHeight: 50,
    paddingLeft: 10,
    textAlignVertical: 'center',
  },
}).row
const box = (opacity: number) =>
  StyleSheet.create({
    row: {
      width: '70%',
      backgroundColor: '#202020',
      height: '100%',
      flexDirection: 'column',
      marginLeft: `${-70 * (1 - opacity)}%`,
    },
  }).row
const socialMedia = (color: string) =>
  StyleSheet.create({
    row: {
      height: 50,
      lineHeight: 50,
      width: 50,
      fontSize: 25,
      borderRadius: 5,
      backgroundColor: color,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: '#fff',
    },
  }).row
const profileBell = StyleSheet.create({
  row: {
    height: 50,
    lineHeight: 50,
    width: 50,
    fontSize: 25,
    color: '#fff',
    right: 0,
    top: 0,
    position: 'absolute',
  },
}).row
const profileBellNumber = StyleSheet.create({
  row: {
    right: 20,
    top: 5,
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#900000',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 3,
    textAlign: 'right',
  },
}).row
const bellLink = StyleSheet.create({
  row: {
    right: 30,
    top: 30,
    position: 'absolute',
  },
}).row

const boxStyle = { outerBox, box }

const profileStyle = {
  name: profileName,
  bell: profileBell,
  bellNumber: profileBellNumber,
  bellLink,
  image: profileImage,
  email: profileEmail,
}
const link = {
  text: linkText,
  badge: linkBadgeBox,
  shared: linkSharedBadgeText,
}

export {
  boxStyle,
  socialMedia as socialMediaStyle,
  profileStyle,
  line as lineStyle,
  heading as headingStyle,
  link as linkStyle,
}
