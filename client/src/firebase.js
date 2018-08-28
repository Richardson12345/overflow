import  firebase from "firebase"

var config = {
    apiKey: "AIzaSyCzOhfSw6pDxB8NG-hHQSuzEz8cS_lH4u8",
    authDomain: "overflow-f1d5e.firebaseapp.com",
    databaseURL: "https://overflow-f1d5e.firebaseio.com",
    projectId: "overflow-f1d5e",
    storageBucket: "overflow-f1d5e.appspot.com",
    messagingSenderId: "874607962674"
  };
 
firebase.initializeApp(config);
const auth = firebase.auth()
const provider = new firebase.auth.FacebookAuthProvider();
export { provider, auth }
