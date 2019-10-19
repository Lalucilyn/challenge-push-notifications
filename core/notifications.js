import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'
import {saveNotificationToken} from './firestore'

export default async function registerForPushNotificationsAsync() {
  // Utiliza los permisos del celular con expo para obtener los permisos del usuario y generar el token
  const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // Cuando el permiso está otorgado, genera el token
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }
  // Si no, retorna
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync()
  
  // Guarda el token otorgado por el usuario y lo guarda
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return saveNotificationToken(token)
}
