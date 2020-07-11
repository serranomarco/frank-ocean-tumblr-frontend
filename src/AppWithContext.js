import React, { useState } from 'react'
import App from './App'
import { EndlessContext } from './EndlessContext';

const AppWithContext = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('state-endless-token'));
    const [userId, setUserId] = useState(localStorage.getItem('state-endless-userId'));
    const [username, setUsername] = useState(localStorage.getItem('state-endless-username'));
    const [needLogin, setNeedLogin] = useState(!localStorage.getItem('state-endless-token'));


    const login = (token, userId, username) => {
        localStorage.setItem('state-endless-token', token);
        localStorage.setItem('state-endless-userId', userId);
        localStorage.setItem('state-endless-username', username)
        setAuthToken(localStorage.getItem('state-endless-token'));
        setUserId(localStorage.getItem('state-endless-userId'))
        setUsername(localStorage.getItem('state-endless-username'))
        setNeedLogin(false);
    }

    return (
        <EndlessContext.Provider value={{ login, needLogin, authToken, username, userId }}>
            <App />
        </EndlessContext.Provider>
    )
}

export default AppWithContext;
