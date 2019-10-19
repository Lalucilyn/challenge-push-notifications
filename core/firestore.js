import {db} from '././firebase'
const saveArtistFav = async ({name, isFav}) => {
  await db
    .collection('artists-fav')
    .doc(name)
    .set({
      name,
      isFav,
    })
    .then(function() {
      console.log('Document successfully written!')
    })
    .catch(function(error) {
      console.error('Error writing document: ', error)
    })
}

// Guardo el token en una db 
const saveNotificationToken = async token => {
  return await db
    .collection('user-notification-token')
    .doc('email-user@gmail.com')
    .set({token})
}

const getArtistsFav = async () => {
  return await db
    .collection('artists-fav')
    .get()
    .then(function(querySnapshot) {
      let data = []
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data())
      })
      return data
    })
}

// Función de Firestore para guardar el user
const getUser = async ({id, name}) => {
  console.warn('entering the firestore function')
  console.warn(id)
  console.warn(name)
  return await db
    .collection('users')
    .doc(id)
    .set({name})
} 

export {saveArtistFav, getArtistsFav, saveNotificationToken, getUser}
