import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyAOTuUI0Sd72nJULuKXHnWZVT6cIP7g8aM",
    authDomain: "treinta-login.firebaseapp.com",
    databaseURL: "https://treinta-login.firebaseio.com",
    projectId: "treinta-login",
    storageBucket: "treinta-login.appspot.com",
    messagingSenderId: "696515154514",
    appId: "1:696515154514:web:2288840b0bfc78f458058b"
  };
  
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;