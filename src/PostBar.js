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

    const [quote, setQuote] = useState('');
    const [source, setSource] = useState('');


    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setText(e.target.value);
    }

    const updateQuote = (e) => {
        setQuote(e.target.value);
    }

    const updateSource = (e) => {
        setSource(e.target.value);
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

    const handlePhotoPost = async (e) => {
        e.preventDefault()
        let postId;
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');
        const captionField = document.querySelector('textarea[name="caption"]');
        const postTypeIdField = document.querySelector('input[name="postTypeId"]');

        console.log(fileField.files[0])

        const response = await fetch(`${baseUrl}/api/posts`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postTypeId: 2
            })
        });
        if (response.ok) {
            const json = await response.json()
            postId = Number.parseInt(json.post.id)
        }
        formData.append('key', 'value')
        formData.append('image', fileField.files[0]);
        formData.append('caption', captionField.value);
        formData.append('postTypeId', postTypeIdField.value);
        formData.append('postId', postId);

        for (const key of formData) {
            console.log(key);
        }

        const res = await fetch(`${baseUrl}/api/posts/photo`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: formData
        });
        if (res.ok) {
            const photoPost = await res.json();
            console.log(photoPost);
        }
        window.location.reload();
    }

    const handleQuotePost = async (e) => {
        e.preventDefault();
        let postId;
        const response = await fetch(`${baseUrl}/api/posts`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postTypeId: 3
            })
        });
        if (response.ok) {
            const json = await response.json()
            postId = Number.parseInt(json.post.id)
            console.log(json)

        }
        console.log(postId)
        const res = await fetch(`${baseUrl}/api/posts/quote`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId,
                quote,
                source,
                postTypeId: 3
            })
        });
        if (res.ok) {
            const quotePost = await res.json();
            console.log(quotePost);
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

    const handlePhotoModal = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-photo');
        modal.classList.remove('modal-photo--hidden');
    }

    const handlePhotoClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-photo');
        modal.classList.add('modal-photo--hidden');
    }

    const handleQuoteModal = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-quote');
        modal.classList.remove('modal-quote--hidden');
    }

    const handleQuoteClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-quote');
        modal.classList.add('modal-quote--hidden');
    }

    return (
        <div className='post-bar__container'>
            <button className='post__button' type='submit' onClick={handleTextModal}>
                <TextFieldsIcon style={{ fontSize: 40 }} className='post__icon-text' />
                <p id='text'>Text</p>
            </button>
            <button className='post__button' type='submit' onClick={handlePhotoModal}>
                <PhotoCameraIcon style={{ fontSize: 40 }} className='post__icon-photo' />
                <p id='photo'>Photo</p>
            </button>
            <button className='post__button' type='submit' onClick={handleQuoteModal}>
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
            <div className='modal-photo modal-photo--hidden'>

                <form className='post__photo-form' onSubmit={handlePhotoPost}>
                    <div>
                        <p className='username'>{username}</p>
                        <input name='image' className='image-photo' type='file' accept='image/jpeg' placeholder='Title' />
                    </div>
                    <div>
                        <textarea name='caption' className='caption-photo' type='text' placeholder='Caption' />
                        <input name='postTypeId' type='hidden' value='2' />
                    </div>
                    <div className='button__container'>
                        <button className='button__close' type='submit' onClick={handlePhotoClose}>Close</button>
                        <button className='button__post' type='submit'>Post</button>
                    </div>
                </form>
            </div>
            <div className='modal-quote modal-quote--hidden'>
                <form className='post__quote-form' onSubmit={handleQuotePost}>
                    <div>
                        <p className='username'>{username}</p>
                        <textarea className='quote-quote' type='text' placeholder='Quote' onChange={updateQuote} />
                    </div>
                    <div className='source__container'>
                        <span id='slash'>&#8211;</span>
                        <input className='source-quote' type='text' placeholder='source' onChange={updateSource} />
                    </div>
                    <div className='button__container'>
                        <button className='button__close' type='submit' onClick={handleQuoteClose}>Close</button>
                        <button className='button__post' type='submit'>Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostBar;
