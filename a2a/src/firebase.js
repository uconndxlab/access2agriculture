import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

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

// Collection helpers.
const productsCollection = db.collection('products')
const waypointsCollection = db.collection('waypoints')
const assistanceOptionsCollection = db.collection('assistance_options')
const routesCollection = db.collection('routes')

export {
    db,
    auth,
    firestore,
    productsCollection,
    waypointsCollection,
    assistanceOptionsCollection,
    routesCollection
}