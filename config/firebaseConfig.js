const {initializeApp} = require('firebase/compat/app')
const { getStorage} = require("firebase/storage")

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-JFECRXZKM0"
  };

const app = initializeApp(firebaseConfig)
const storage = getStorage(app,"gs://node-travel-blog.appspot.com")


module.exports={storage}