import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Set up your firebase configuration.
// Project Settings > General > Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyCLjpBPrRW_-7nqlENiW1UKXVjQzBTpcUA",
    authDomain: "access2agriculture.firebaseapp.com",
    projectId: "access2agriculture",
    storageBucket: "access2agriculture.appspot.com",
    messagingSenderId: "289762323874",
    appId: "1:289762323874:web:fe4e4e0d15994ec47ed6fb"
}
firebase.initializeApp(firebaseConfig)

// Generate objects for assistance connecting to store & auth
const db = firebase.firestore()
const auth = firebase.auth()
const firestore = firebase.firestore
const storage = firebase.storage()

// Collection helpers.
const productsCollection = db.collection('products')
const waypointsCollection = db.collection('waypoints')
const usersCollection = db.collection('users')
const routesCollection = db.collection('routes')
const assistanceOptionsCollection = db.collection('assistance_options')

export {
    db,
    auth,
    firestore,
    storage,
    productsCollection,
    waypointsCollection,
    usersCollection,
    routesCollection,
    assistanceOptionsCollection
}