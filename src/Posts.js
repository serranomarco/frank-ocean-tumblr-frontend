import React, { useContext, useState, useEffect } from 'react';
import { baseUrl } from './config';
import { EndlessContext } from './EndlessContext';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const Posts = () => {
    const { authToken, userId, username } = useContext(EndlessContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [postId, setPostId] = useState(-1);

    const updateText = (e) => {
        setText(e.target.value);
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDelete = async (e) => {
        const id = e.target.getAttribute('id');
        const post = e.target.parentNode.parentNode
        e.preventDefault();
        const deletePost = await fetch(`${baseUrl}/api/posts/${id}/text`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const deleteTextPost = await fetch(`${baseUrl}/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (deletePost.ok) {
            const json = await deletePost.json();
            console.log(json);
        }
        if (deleteTextPost.ok) {
            const json = await deleteTextPost.json();
            console.log(json);
        }
        post.remove();
    }

    const handleTextModal = async (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('id');
        const response = await fetch(`${baseUrl}/api/posts/${id}`);
        if (response.ok) {
            const json = await response.json();
            setPostId(json.post.Texts[0].postId);
            console.log(postId)
            setTitle(json.post.Texts[0].title);
            setText(json.post.Texts[0].text);
        }
        const modal = document.querySelector('.modal-text-edit');
        modal.classList.remove('modal-text-edit--hidden');
    }

    const handleTextClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-text-edit');
        modal.classList.add('modal-text-edit--hidden');
    }

    const handleEditTextPost = async (e) => {
        const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                text
            })
        });
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${baseUrl}/api/posts/following/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const json = await response.json();
                setPosts(json.sortedPosts)
            }
        }
        fetchData();
    }, [userId, authToken])

    return (
        posts.map(post => {
            return (
                <div className='container' key={post.id}>
                    <div className='post__profile-pic-container'>
                        <img className='post__profile-pic' src={post.User.profilePicPath} />
                    </div>
                    <div className='post__container'>
                        <div className='post__username'>{username}</div>
                        <div className='post__title'>{post.Texts[0].title}</div>
                        <div className='post__text'>{post.Texts[0].text}</div>
                        <div className='post__icon-container'>
                            <button className='text-post__button' type='submit'>
                                <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 30 }} className='post__comment' />
                            </button>
                            <button className='text-post__button' type='submit'>
                                <FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} className='post__like' />
                            </button>
                            <button id={post.id} className='text-post__button' type='submit' onClick={handleDelete}>
                                <DeleteOutlinedIcon style={{ fontSize: 30 }} className='post__delete' />
                            </button>
                            <button id={post.id} className='text-post__button' type='submit' onClick={handleTextModal}>
                                <EditOutlinedIcon style={{ fontSize: 30 }} className='post__edit' />
                            </button>
                        </div>
                        <div className='modal-text-edit modal-text-edit--hidden'>
                            <form className='post__text-form'>
                                <div>
                                    <p className='username'>{username}</p>
                                    <input className='title-text' value={title} type='text' placeholder='Title' onChange={updateTitle} />
                                </div>
                                <div>
                                    <textarea className='text-text' value={text} type='text' placeholder='Your text here' onChange={updateText} />
                                </div>
                                <div className='button__container'>
                                    <button className='button__close' type='submit' onClick={handleTextClose}>Close</button>
                                    <button className='button__post' id={postId} type='submit' onClick={handleEditTextPost}>Post</button>
                                </div>
                            </form>
                        </div>
                    </div >
                </div>
            )
        })
    )

}

export default Posts;
