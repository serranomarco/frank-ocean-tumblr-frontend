import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@material-ui/core'

const LoginNav = () => {
    return (
        <nav style={{ marginTop: '5px' }} className='login__nav'>
            <NavLink style={{ textDecoration: 'none' }} to='/' className='logo'>e</NavLink>
            <div>
                <NavLink className='navlink' to='/login'>
                    <Button style={{ color: 'white', backgroundColor: '#49986b', fontWeight: '600', width: '90px', marginRight: '10px' }} type='button'>Login</Button>
                </NavLink>
                <NavLink className='navlink' to='/register'>
                    <Button style={{ color: 'white', backgroundColor: '#49986b', fontWeight: '600', width: '90px' }} type='submit'>Register</Button>
                </NavLink>
            </div>
        </nav>
    )
}

export default LoginNav;