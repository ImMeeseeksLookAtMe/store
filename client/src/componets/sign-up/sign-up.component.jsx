import React, { useState } from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

const SignUp = props => {

    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {
        displayName, 
        email, 
        password, 
        confirmPassword } = formData;

    const handleChange = e => {
        const {value, name } = e.target;

        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const { displayName, email, password, confirmPassword } = formData;

        if( password !== confirmPassword ) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            createUserProfileDocument(user, {displayName});

            setFormData({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form'onSubmit={handleSubmit}>
                <FormInput 
                type='text'
                name='displayName'
                value={displayName}
                onChange={handleChange}
                label='Display Name'
                required
                />
                <FormInput 
                type='text'
                name='email'
                value={email}
                onChange={handleChange}
                label='Email'
                required
                />
                <FormInput 
                type='text'
                name='password'
                value={password}
                onChange={handleChange}
                label='Password'
                required
                />
                <FormInput 
                type='text'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                label='Confirm Password'
                required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>  
        </div>
    )
}


export default SignUp;
