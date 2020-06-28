import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  appId: '1:860763548265:web:d1e0adcbd3e080f4f010f8',
  apiKey: 'AIzaSyD4vhfQHFPP8Xp05n83Wciu7bY37c3kJe4',
  authDomain: 'hornoapp.firebaseapp.com',
  databaseURL: 'https://hornoapp.firebaseio.com',
  projectId: 'hornoapp',
  storageBucket: 'hornoapp.appspot.com',
  messagingSenderId: '860763548265',
  mesuarmentId: 'G-F6741WMWKH',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

//separting database API and authentication
const db = firebase.database()
const auth = firebase.auth()

const facebookProvider = new firebase.auth.FacebookAuthProvider()

export { db, auth, facebookProvider }
