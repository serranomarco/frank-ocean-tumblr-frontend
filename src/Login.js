import React from 'react'
import LoginNav from './LoginNav'
import LoginForm from './LoginForm'

const Login = () => {

    return (
        <main className='login'>
            <LoginNav />
            <h1 className='title'>endless</h1>
            <LoginForm />
        </main >
    );
}

export default Login;
