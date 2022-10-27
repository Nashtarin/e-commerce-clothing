import { signInWithEmailAndPassword } from 'firebase/auth';
import './authentication.styles.scss'
import React from 'react';
import SignIn from '../../components/sign-in-form/sign-in-form.component';
import SignUp from '../../components/Sign-Up/sign-up.component';
import { createUserDocumentFromAuth, createUserProfileDocument, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

const Authentication= () => {
    const logGoogleUser = async () => {
      const {user} = await signInWithGooglePopup();
      const userDocRef=await createUserDocumentFromAuth(user)
    
    };
  
    return (
      <div className='authentication-container'>
        {/* <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
        <SignIn/>
        <SignUp/>
      </div>
    );
  };

export default Authentication
;
