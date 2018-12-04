import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBHEEEQUPXZnI5U1GFZ1ZntXkeA2Hp6JYQ",
    authDomain: "groupprojectweather.firebaseapp.com",
    databaseURL: "https://groupprojectweather.firebaseio.com",
    projectId: "groupprojectweather",
    storageBucket: "groupprojectweather.appspot.com",
    messagingSenderId: "933930811616"
  };
firebase.initializeApp(config);
export default firebase;