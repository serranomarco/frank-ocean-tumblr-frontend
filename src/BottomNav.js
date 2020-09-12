import React from 'react';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const BottomNav = () => {
    return (
        <div style={{ fontFamily: 'Arial', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '115px', position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#49986b' }}>
            <div style={{ marginLeft: '25px' }}>
                <p style={{ color: 'white' }}>Tech Stack</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ color: 'white', paddingRight: '5px' }}>HTML</p>
                    <p style={{ color: 'white', paddingRight: '5px' }}>CSS</p>
                    <p style={{ color: 'white', paddingRight: '5px' }}>JavaScript</p>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '30px', textAlign: 'center' }}>
                    <p style={{ color: 'white' }}>Marco Serrano</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton href='https://github.com/serranomarco' target='_blank' aria-label='github'>
                            <GitHubIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton href='https://www.linkedin.com/in/marco-serrano-3916731b2' target='_blank' aria-label='linkedin'>
                            <LinkedInIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;