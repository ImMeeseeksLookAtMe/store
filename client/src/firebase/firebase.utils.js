import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAnVcnFPuoR5BoIr69LvYx27b2wK9FtEAw",
    authDomain: "barut-bb.firebaseapp.com",
    databaseURL: "https://barut-bb.firebaseio.com",
    projectId: "barut-bb",
    storageBucket: "barut-bb.appspot.com",
    messagingSenderId: "393321585817",
    appId: "1:393321585817:web:55aeed67e4b29588332c08",
    measurementId: "G-TPKJSN0VN6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
 if(!userAuth) return;

 const userRef = firestore.doc(`users/${userAuth.uid}`);

 const snapShot = await userRef.get();

 if(!snapShot.exists) {
     const {displayName, email } =  userAuth;
     const createdAt = new Date();

     try {
         await userRef.set({
             displayName,
             email,
             createdAt,
             ...additionalData
         });
        
     } catch(error) {
        console.log('error creatating user', error.message);
     }
 }

 return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
    
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {}); 
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;