import React, { useState } from 'react';
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.componenet';
import FormInput from '../form-input/form-input.componenet';

const SignUp = () => {
    const defaultFormFields={
        displayName:'',
        email:'',
        password:'',
        confirmpassword:''
    }
    const reset=()=>{
        setFormFields(defaultFormFields)
    }
    const [formfields,setFormFields]=useState(defaultFormFields)
    const{displayName,email,password,confirmpassword}=formfields
    const handleChange=e=>{
        const {name,value}=e.target
        setFormFields({...formfields,[name]:value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(password!==confirmpassword){
            alert("passwords do not match")
            return
        } 
        try {
            const {user}=await createAuthUserWithEmailandPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName})
            reset()
            
        } catch (error) {
            console.log('user error'+error)
        }
       
        
    }
    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            type='text'
            required
            onChange={handleChange}
            name='displayName'
            value={displayName}
          />
  
          <FormInput
            label='Email'
            type='email'
            required
            onChange={handleChange}
            name='email'
            value={email}
          />
  
          <FormInput
            label='Password'
            type='password'
            required
            onChange={handleChange}
            name='password'
            value={password}
          />
  
          <FormInput
            label='Confirm Password'
            type='password'
            required
            onChange={handleChange}
            name='confirmPassword'
            value={confirmpassword}
          />
          <Button type='submit'>Sign Up</Button>
        </form>
      </div>
    );
};

export default SignUp;