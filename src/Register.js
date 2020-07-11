import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { EndlessContext } from './EndlessContext';
import { baseUrl } from './config'

const Register = () => {
    const { login, username } = useContext(EndlessContext);

    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch(`${baseUrl}/api/users/register`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName, email, password
            })
        });
        if (response.ok) {
            const json = await response.json();
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

    const updateUserName = e => {
        setUserName(e.target.value);
    }

    if (loggedIn) return <Redirect to={`/${username}/blog`} />
    return (
        <main className='login'>
            <nav className='login__nav'>
                <h1 className='logo'>e</h1>
                <NavLink className='navlink' to='/login'>
                    <button className='login__button' type='submit'>Log In</button>
                </NavLink>

            </nav>
            <h1 className='title'>endless</h1>
            <form onSubmit={handleRegister} className='login__form'>
                <input className='login__email' type='text' placeholder='Username' value={userName} onChange={updateUserName} />
                <input className='login__email' type='text' placeholder='Email' value={email} onChange={updateEmail} />
                <input className='login__password' type='password' placeholder='Password' value={password} onChange={updatePassword} />
                <button className='login__button' type='submit'>Register</button>
            </form>
        </main >
    )
}

export default Register;
