import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDWfgKdXfjGAawJ10ssnQPuq1ikGfpxnmo",
  authDomain: "telegram-clone-86c77.firebaseapp.com",
  projectId: "telegram-clone-86c77",
  storageBucket: "telegram-clone-86c77.appspot.com",
  messagingSenderId: "1064597918608",
  appId: "1:1064597918608:web:949f937e046f28f8215915"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db