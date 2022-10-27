import React, { useState } from 'react';
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.componenet';
import FormInput from '../form-input/form-input.componenet';
import './sign-in-form.styles.scss'

const SignIn = () => {
    const defaultFormFields={
        
        email:'',
        password:'',
       
    }
    const reset=()=>{
        setFormFields(defaultFormFields)
    }
    const [formfields,setFormFields]=useState(defaultFormFields)
    const{email,password}=formfields
    const handleChange=e=>{
        const {name,value}=e.target
        setFormFields({...formfields,[name]:value})
    }
    const signInWithGoogle=async()=>{
        const {user}=await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await signInAuthUserWithEmailAndPassword(
            email,
            password
          );
          console.log(response);
          reset();
        } catch (error) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
        }
      };
    
    return (
        <div className='sign-up-container'>
            <h2>Already Have an account?</h2>
            <span>Sign in with Your Email and Password</span>
            <form onSubmit={handleSubmit}>

             
                <FormInput label='email' type='email' required name='email' onChange={handleChange} value={email}/>
              
                <FormInput label='password' type='password'required name='password' onChange={handleChange} value={password}/>

              <div className="buttons-container">
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}> Google Sign In</Button>
              </div>
               
            </form>
        </div>
    );
};

export default SignIn;