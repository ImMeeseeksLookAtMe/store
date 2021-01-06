import React, { useState } from 'react';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';


const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const { email, password } = formData;

    const onChange = e => {
        const { value, name } = e.target
        
        setFormData({...formData, [name]: value});
    }

    const onSubmit = async e => {
        e.preventDefault();

        const { email, password } = formData;

        try {
        await auth.signInWithEmailAndPassword(email, password);
        setFormData({ 
            email: '', 
            password: ''
        });

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit={onSubmit}>
                <FormInput
                name="email" 
                type='email' 
                value={email}
                onChange={onChange}
                label='email'
                required
                /> 
                <FormInput
                type="password" 
                name="password"
                onChange={onChange}
                label='password'
                value={password}
                required
                />
                <div className='buttons'>
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn
                    >Sign in With Google</CustomButton>
                </div>
            </form>
        </div>
    )
}


export default SignIn;
