const firebase = require('firebase/app')
require('firebase/database');
// require('firebase/analytics')

firebase.initializeApp({
    apiKey: "AIzaSyDkQJ7HEqx04Pg41NICu6ZVCAyrsPUO9mA",
    authDomain: "aia-test-project.firebaseapp.com",
    databaseURL: "https://aia-test-project-default-rtdb.firebaseio.com",
    projectId: "aia-test-project",
    storageBucket: "aia-test-project.appspot.com",
    messagingSenderId: "268083121224",
    appId: "1:268083121224:web:2ed98344f134d25640dc7d",
    measurementId: "G-03LVTPEV67"
})
// firebase.analytics()
module.exports = firebase