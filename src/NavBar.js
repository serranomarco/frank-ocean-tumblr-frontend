import React from 'react';

import { Button } from '@material-ui/core'
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import AddBoxIcon from '@material-ui/icons/AddBox';

const NavBar = () => {

    const logout = (e) => {
        e.preventDefault()
        console.log(e.target)
        localStorage.removeItem('state-endless-token')
        localStorage.removeItem('state-endless-userId')
        localStorage.removeItem('state-endless-username')
        window.location.replace('/login')
    }

    return (
        <nav className='feed__nav'>
            <a href='/' className='feed__logo'>endless</a>
            <div className='feed__icons'>
                {/* <HomeRoundedIcon style={{ fontSize: 45 }} className='feed__home' /> */}
                {/* <AccountBoxIcon style={{ fontSize: 45 }} className='feed__profile' onClick={logout} /> */}
                {/* <AddBoxIcon style={{ fontSize: 45 }} className='feed__profile' /> */}
                <Button style={{ color: '#49986b', fontWeight: '600', backgroundColor: 'white', marginTop: '10px' }} onClick={logout}>Logout</Button>
            </div>
        </nav>
    )
}

export default NavBar;
