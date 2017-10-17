import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyA87utpdnNzXR9lxgI6dp_l1sC4MIbXhhI",
  authDomain: "samm-p4.firebaseapp.com",
  databaseURL: "https://samm-p4.firebaseio.com",
  projectId: "samm-p4",
  storageBucket: "samm-p4.appspot.com",
  messagingSenderId: "850320516340"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
