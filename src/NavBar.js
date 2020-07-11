import React from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddBoxIcon from '@material-ui/icons/AddBox';

const NavBar = () => {
    return (
        <nav className='feed__nav'>
            <a href='/' className='feed__logo'>endless</a>
            <div className='feed__icons'>
                <HomeRoundedIcon style={{ fontSize: 45 }} className='feed__home' />
                <AccountBoxIcon style={{ fontSize: 45 }} className='feed__profile' />
                <AddBoxIcon style={{ fontSize: 45 }} className='feed__profile' />
            </div>
        </nav>
    )
}

export default NavBar;
