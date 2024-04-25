import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

// Set up your firebase configuration.
// Project Settings > General > Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyDbbnINR0zk9Fb4YKZpdrsYAfIuaoz1ktM",
    authDomain: "access2ag-7b67b.firebaseapp.com",
    projectId: "access2ag-7b67b",
    storageBucket: "access2ag-7b67b.appspot.com",
    messagingSenderId: "90233234499",
    appId: "1:90233234499:web:e5fa69c7b1a5956e4220f6",
    measurementId: "G-662176STB3"
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