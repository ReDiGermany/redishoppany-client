import { Platform } from 'react-native'

export default (input: any) => (Platform.OS === 'web' ? input : {})
