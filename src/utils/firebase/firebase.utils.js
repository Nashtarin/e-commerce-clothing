import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
  } from 'firebase/auth'
  import {
    getFirestore,
    doc,
    getDoc,
    setDoc
  } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBx6bnETIhJbQtXNzpOpg4qhlwCScifrwg",
    authDomain: "e-commerce-clothing-63620.firebaseapp.com",
    projectId: "e-commerce-clothing-63620",
    storageBucket: "e-commerce-clothing-63620.appspot.com",
    messagingSenderId: "771087475101",
    appId: "1:771087475101:web:d0802e99fe051cb2a74f74"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db=getFirestore()
export const createUserDocumentFromAuth=async(userAuth,additionalInformation={})=>{
  if(!userAuth) return
  const userDocRef=doc(db,'users',userAuth.uid)
  console.log(userDocRef)
  const userSnapShot=await getDoc(userDocRef)
  console.log(userSnapShot)
  if(!userSnapShot.exists()){
    const {displayName,email}=userAuth;
    const creDate=new Date()
    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        creDate,
        ...additionalInformation

      })
      
    } catch (error) {
      console.log('created'+error)
    }

  }
  return userDocRef;

}
export const createAuthUserWithEmailandPassword=async(email,password)=>{
  if(!email||!password) return
   return createUserWithEmailAndPassword(auth,email,password)

}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};