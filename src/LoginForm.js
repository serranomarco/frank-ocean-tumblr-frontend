import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { EndlessContext } from './EndlessContext';
import { baseUrl } from './config';

const LoginForm = () => {
    const { login, username } = useContext(EndlessContext);

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/users/token`, {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password
            })
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json)
            login(json.token, json.user.id, json.user.userName);
            setLoggedIn(true);
        }
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updatePassword = e => {
        setPassword(e.target.value);
    }
    if (loggedIn) return <Redirect to={`/${username}/blog`} />
    return (
        <form onSubmit={handleLogin} className='login__form'>
            <input className='login__email' type='text' placeholder='Email' value={email} onChange={updateEmail} />
            <input className='login__password' type='password' placeholder='Password' value={password} onChange={updatePassword} />
            <button className='login__button' type='submit'>Login</button>
        </form>
    )
}

export default LoginForm;