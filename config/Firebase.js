import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDx3gWsxYoguZd20R6fcgkXl1zIfpWKNmo",
    authDomain: "knowwhatyoueat-376d3.firebaseapp.com",
    databaseURL: "https://knowwhatyoueat-376d3.firebaseio.com",
    projectId: "knowwhatyoueat-376d3",
    storageBucket: "knowwhatyoueat-376d3.appspot.com",
    messagingSenderId: "166075026276",
    appId: "1:166075026276:web:1331de7b2a54e453840871",
    measurementId: "G-KJYEFFDXM4"
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)
export const authenication = auth();
export const db = firestore()

// avoid deprecated warnings


export default Firebase
