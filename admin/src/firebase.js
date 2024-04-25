import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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