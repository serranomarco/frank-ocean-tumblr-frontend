import React, { useContext, useState, useEffect } from 'react';
import { baseUrl } from './config';
import { EndlessContext } from './EndlessContext';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Posts = () => {
    const { authToken, userId, username } = useContext(EndlessContext);
    const [likedPosts, setLikedPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [quote, setQuote] = useState('');
    const [source, setSource] = useState('');
    const [postId, setPostId] = useState(-1);

    const updateText = (e) => {
        setText(e.target.value);
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateQuote = (e) => {
        setQuote(e.target.value);
    }

    const updateSource = (e) => {
        setSource(e.target.value);
    }

    const handleLike = async (e) => {
        const id = Number(e.target.getAttribute('id'))
        if (!likedPosts.includes(id)) {
            const response = fetch(`${baseUrl}/api/posts/${id}/like`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

        } else {
            const response = fetch(`${baseUrl}/api/posts/${id}/like`, {
                method: 'delete',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
        }
        window.location.reload();

    }

    const handleTextDelete = async (e) => {
        const id = e.target.getAttribute('id');
        const post = e.target.parentNode.parentNode.parentNode
        e.preventDefault();
        const deletePost = await fetch(`${baseUrl}/api/posts/${id}/text`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const deleteTextPost = await fetch(`${baseUrl}/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (deletePost.ok) {
            const json = await deletePost.json();
        }
        if (deleteTextPost.ok) {
            const json = await deleteTextPost.json();
            post.remove();
        }
    }

    const handleQuoteDelete = async (e) => {
        const id = e.target.getAttribute('id');
        const post = e.target.parentNode.parentNode.parentNode
        e.preventDefault();
        const deletePost = await fetch(`${baseUrl}/api/posts/${id}/quote`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const deleteQuotePost = await fetch(`${baseUrl}/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (deletePost.ok) {
            const json = await deletePost.json();
        }
        if (deleteQuotePost.ok) {
            const json = await deleteQuotePost.json();
            post.remove();
        }
    }

    const handlePhotoDelete = async (e) => {
        const id = e.target.getAttribute('id');
        const post = e.target.parentNode.parentNode.parentNode
        e.preventDefault();
        const deletePost = await fetch(`${baseUrl}/api/posts/${id}/photo`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const deletePhotoPost = await fetch(`${baseUrl}/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (deletePost.ok) {
            const json = await deletePost.json();
        }
        if (deletePhotoPost.ok) {
            const json = await deletePhotoPost.json();
            post.remove();
        }
    }

    const handleTextModal = async (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('id');
        const response = await fetch(`${baseUrl}/api/posts/${id}`);
        if (response.ok) {
            const json = await response.json();
            setPostId(json.post.Texts[0].postId);
            setTitle(json.post.Texts[0].title);
            setText(json.post.Texts[0].text);
        }
        const modal = document.querySelector('.modal-text-edit');
        modal.classList.remove('modal-text-edit--hidden');
    }

    const handleQuoteModal = async (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('id');
        const response = await fetch(`${baseUrl}/api/posts/${id}`);
        if (response.ok) {
            const json = await response.json();
            setPostId(json.post.Quotes[0].postId);
            setQuote(json.post.Quotes[0].quote);
            setSource(json.post.Quotes[0].source);
        }
        const modal = document.querySelector('.modal-quote-edit');
        modal.classList.remove('modal-quote-edit--hidden');
    }

    const handleTextClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-text-edit');
        modal.classList.add('modal-text-edit--hidden');
    }

    const handleQuoteClose = (e) => {
        e.preventDefault();
        const modal = document.querySelector('.modal-quote-edit');
        modal.classList.add('modal-quote-edit--hidden');
    }

    const handleEditTextPost = async (e) => {
        const response = await fetch(`${baseUrl}/api/posts/${postId}/text`, {
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

    const handleEditQuotePost = async (e) => {
        const response = await fetch(`${baseUrl}/api/posts/${postId}/quote`, {
            method: 'put',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quote,
                source
            })
        });
    }

    const updateLikedPosts = (likedPosts) => {
        const likedPostsArr = [];
        for (const posts of likedPosts) {
            likedPostsArr.push(posts.postId)
        }
        setLikedPosts(likedPostsArr);
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
                setPosts(json.sortedPosts);
                console.log(json.sortedPosts);
                updateLikedPosts(json.likedPosts);
            }
        }
        fetchData();
    }, [userId, authToken])


    return (
        posts.map(post => {
            if (post.postTypeId === 1) {
                return (
                    <div className='container' id={post.id} key={post.id}>
                        <div className='post__profile-pic-container'>
                            <img className='post__profile-pic' alt='profile-pic' src={post.User.profilePicPath} />
                        </div>
                        <div className='post__container'>
                            <div className='post__username'>{post.User.userName}</div>
                            <div className='post__title'>{post.Texts[0].title}</div>
                            <div className='post__text'>{post.Texts[0].text}</div>
                            <div className='post__icon-container'>
                                <button id={post.id} className='text-post__button' type='submit'>
                                    <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 30 }} className='post__comment' />
                                </button>
                                <button id={post.id} className='text-post__button' type='submit' onClick={handleLike}>
                                    {likedPosts.includes(post.id) ? <FavoriteIcon style={{ fontSize: 30 }} className='post__liked' /> : <FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} className='post__like' />}
                                </button>

                                {post.userId === Number.parseInt(userId) &&
                                    <>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextDelete}>
                                            <DeleteOutlinedIcon style={{ fontSize: 30 }} className='post__delete' />
                                        </button>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextModal}>
                                            <EditOutlinedIcon style={{ fontSize: 30 }} className='post__edit' />
                                        </button>
                                    </>
                                }
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
            } else if (post.postTypeId === 2) {
                //manage photo post
                return (
                    <div className='container' id={post.id} key={post.id}>
                        <div className='post__profile-pic-container'>
                            <img className='post__profile-pic' alt='profile-pic' src={post.User.profilePicPath} />
                        </div>
                        <div className='post__container'>
                            <div className='post__username'>{post.User.userName}</div>
                            <img className='post__image' alt={`post`} src={post?.Photos[0].photoUrl} />
                            <div className='post__caption'>{post.Photos[0].caption}</div>
                            <div className='post__icon-container'>
                                <button id={post.id} className='text-post__button' type='submit'>
                                    <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 30 }} className='post__comment' />
                                </button>
                                <button id={post.id} className='text-post__button' type='submit' onClick={handleLike}>
                                    {likedPosts.includes(post.id) ? <FavoriteIcon style={{ fontSize: 30 }} className='post__liked' /> : <FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} className='post__like' />}
                                </button>

                                {post.userId === Number.parseInt(userId) &&
                                    <>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextDelete}>
                                            <DeleteOutlinedIcon style={{ fontSize: 30 }} className='post__delete' />
                                        </button>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextModal}>
                                            <EditOutlinedIcon style={{ fontSize: 30 }} className='post__edit' />
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                )
            } else if (post.postTypeId === 3) {
                return (
                    <div className='container' key={post.id}>
                        <div className='post__profile-pic-container'>
                            <img className='post__profile-pic' alt='profile-pic' src={post.User.profilePicPath} />
                        </div>
                        <div className='post__container'>
                            <div className='post__username'>{post.User.userName}</div>
                            <div className='post__quote'>{post.Quotes[0].quote}</div>
                            <div className='post__source'>{post.Quotes[0].source}</div>
                            <div className='post__icon-container'>
                                <button id={post.id} className='text-post__button' type='submit'>
                                    <ChatBubbleOutlineOutlinedIcon style={{ fontSize: 30 }} className='post__comment' />
                                </button>
                                <button id={post.id} className='text-post__button' type='submit' onClick={handleLike}>
                                    {likedPosts.includes(post.id) ? <FavoriteIcon style={{ fontSize: 30 }} className='post__liked' /> : <FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} className='post__like' />}
                                </button>
                                {post.userId === Number.parseInt(userId) &&
                                    <>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextDelete}>
                                            <DeleteOutlinedIcon style={{ fontSize: 30 }} className='post__delete' />
                                        </button>
                                        <button id={post.id} className='text-post__button' type='submit' onClick={handleTextModal}>
                                            <EditOutlinedIcon style={{ fontSize: 30 }} className='post__edit' />
                                        </button>
                                    </>
                                }
                            </div>
                            <div className='modal-quote-edit modal-quote-edit--hidden'>
                                <form className='post__quote-form'>
                                    <div>
                                        <p className='username'>{username}</p>
                                        <textarea className='quote-quote' value={quote} type='text' placeholder='Quote' onChange={updateQuote} />
                                    </div>
                                    <div>
                                        <input className='source-quote' value={source} type='text' placeholder='source' onChange={updateSource} />
                                    </div>
                                    <div className='button__container'>
                                        <button className='button__close' type='submit' onClick={handleQuoteClose}>Close</button>
                                        <button className='button__post' id={postId} type='submit' onClick={handleEditQuotePost}>Post</button>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </div>)
            }

        })
    )

}

export default Posts;
