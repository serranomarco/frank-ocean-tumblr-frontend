import React, { useState, useContext } from 'react';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import { baseUrl } from './config';
import { EndlessContext } from './EndlessContext';

const PostBar = () => {
    const { authToken, username } = useContext(EndlessContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const getuserName = async () => {

    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setText(e.target.value);
    }

    const handleTextPost = async (e) => {
        e.preventDefault();
        let postId;
        const response = await fetch(`${baseUrl}/api/posts`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postTypeId: 1
            })
        });
        if (response.ok) {
            const json = await response.json()
            postId = Number.parseInt(json.post.id)
            console.log(json)

        }
        console.log(postId)
        const res = await fetch(`${baseUrl}/api/posts/text`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId,
                title,
                text,
                postTypeId: 1
            })
        });
        if (res.ok) {
            const textPost = await res.json();
            console.log(textPost);
        }
        window.location.reload();

    }

    const handleTextModal = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-text');
        modal.classList.remove('modal-text--hidden');
    }

    const handleTextClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-text');
        modal.classList.add('modal-text--hidden');
    }
    return (
        <div className='post-bar__container'>
            <button className='post__button' type='submit' onClick={handleTextModal}>
                <TextFieldsIcon style={{ fontSize: 40 }} className='post__icon-text' />
                <p id='text'>Text</p>
            </button>
            <button className='post__button' type='submit' >
                <PhotoCameraIcon style={{ fontSize: 40 }} className='post__icon-photo' />
                <p id='photo'>Photo</p>
            </button>
            <button className='post__button' type='submit' >
                <FormatQuoteIcon style={{ fontSize: 40 }} className='post__icon-quote' />
                <p id='quote'>Quote</p>
            </button>
            <div className='modal-text modal-text--hidden'>

                <form className='post__text-form' onSubmit={handleTextPost}>
                    <div>
                        <p className='username'>{username}</p>
                        <input className='title-text' type='text' placeholder='Title' onChange={updateTitle} />
                    </div>
                    <div>
                        <textarea className='text-text' type='text' placeholder='Your text here' onChange={updateText} />
                    </div>
                    <div className='button__container'>
                        <button className='button__close' type='submit' onClick={handleTextClose}>Close</button>
                        <button className='button__post' type='submit'>Post</button>
                    </div>
                </form>
            </div>
            {/* <div className='modal-quote modal-quote--hidden'> */}

            {/* <form className='post__quote-form' onSubmit={handleQuotePost}>
                    <div>
                        <p className='username'>{username}</p>
                        <input className='title-text' type='text' placeholder='Title' onChange={updateTitle} />
                    </div>
                    <div>
                        <textarea className='text-text' type='text' placeholder='Your text here' onChange={updateText} />
                    </div>
                    <div className='button__container'>
                        <button className='button__close' type='submit' onClick={handleTextClose}>Close</button>
                        <button className='button__post' type='submit'>Post</button>
                    </div>
                </form> */}
            {/* </div> */}
        </div>
    )
}

export default PostBar;
