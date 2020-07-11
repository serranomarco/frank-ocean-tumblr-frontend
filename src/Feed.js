import React from 'react';
import NavBar from './NavBar';
import PostBar from './PostBar';
import Posts from './Posts'

const Feed = () => {
    return (
        <main>
            <NavBar />
            <PostBar />
            <Posts />
        </main>
    );
}

export default Feed;
