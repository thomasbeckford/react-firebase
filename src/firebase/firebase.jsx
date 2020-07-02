import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
require('dotenv').config()
//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  appId: process.env.REACT_APP_SECRET_NAME_APP_ID,
  apiKey: process.env.REACT_APP_SECRET_NAME_API_KEY,
  authDomain: process.env.REACT_APP_SECRET_NAME_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_SECRET_NAME_DATABASE_URL,
  projectId: process.env.REACT_APP_SECRET_NAME_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SECRET_NAME_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SECRET_NAME_MESSAGING_SENDER_ID,
  mesuarmentId: process.env.REACT_APP_SECRET_NAME_MESURAMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

//separting database API and authentication
const db = firebase.database()
const auth = firebase.auth()

export { db, auth }
