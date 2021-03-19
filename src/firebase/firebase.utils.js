import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDfzdeXEFG4M2ks8IHTbdB33XUPIA-SbmU",
    authDomain: "fir-practise-1-db.firebaseapp.com",
    projectId: "fir-practise-1-db",
    storageBucket: "fir-practise-1-db.appspot.com",
    messagingSenderId: "896529947270",
    appId: "1:896529947270:web:e760dde3d63e2fa4454f07",
    measurementId: "G-7R8QM86N2Q"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }
    
    return userRef;
  }

  // -- initialize
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;