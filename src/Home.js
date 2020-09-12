import React from 'react';
import LoginNav from './LoginNav';
import BottomNav from './BottomNav'
import { Button } from '@material-ui/core'

const Home = () => {
    return (
        <>
            <div style={{ position: 'absolute', top: '0', bottom: '115px', right: '0', left: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <h1 className='title'>endless</h1>
                    <p style={{ color: '#49986b', fontFamily: 'merriweather', fontSize: '25px', marginBottom: '0' }}>Frank Ocean Inpsired Tumblr</p>
                    <p style={{ color: '#49986b', fontFamily: 'merriweather', fontSize: '25px', marginBottom: '0' }}>Follow other users and share posts</p>
                    <p style={{ color: '#49986b', fontFamily: 'merriweather', fontSize: '25px', marginBottom: '100px' }}>for other people to interact with</p>
                    <Button style={{ color: 'white', backgroundColor: '#49986b', fontWeight: '600', marginBottom: '10px', width: '400px' }}>Log In</Button>
                    <Button style={{ color: 'white', backgroundColor: '#49986b', fontWeight: '600', width: '400px' }}>Register</Button>
                </div>
            </div>
            <LoginNav />
            <BottomNav />
        </>
    )
}

export default Home;