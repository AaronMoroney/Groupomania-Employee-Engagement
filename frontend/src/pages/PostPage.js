import React, { useState, useEffect } from 'react';
//routerDom
import { useLocation } from 'react-router-dom';
//axios
import Axios from 'axios';
//components
import Navbar from '../components/navbar/Navbar';
//styles
import '../styles/components/buttons/_like-functionality.scss'
import '../styles/components/posts/_posts.scss';
//mui icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import Avatar from '@mui/material/avatar';

export const PostPage = (response) => {
    //Data
    const [onePostData, setOnePostData] = useState([]);
    // STORAGE 
    let token = sessionStorage.getItem('jwt');
    //let userIdStorage = JSON.parse(sessionStorage.getItem('userId'));
    //props
    const location = useLocation();
    const { id } = location.state;
    console.log( 'frontend id', id );

    /*
    ** | GET ONE POST |
    */

    useEffect(() => {
        //axios post
        Axios.get(`http://localhost:3000/posts/postpage/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then(async(response) => {
            setOnePostData(response.data);
            console.log(response.data)
        });
        },[] );
    return (
        <>
            <Navbar/>
            <div className='post-parent__one-post'>
                <div className='post-topline'>
                    <div className='post-topline__avatar-name'>
                        <Avatar  sx={{ width: 30, height: 30, margin: 'auto' }} />
                        <p className='post-topline__username' >  
                            {onePostData.userName}
                        </p>
                    </div>
                    <p>new</p>
                </div>
                <h4 className='post-title' > {onePostData.postTitle}</h4>
                <img className='post-img' alt='alt' src={ onePostData.imageContent} />
                <p className='post-content' > {onePostData.postContent} </p>
                <div className='like-functionality-parent'>
                    <div className='like-functionality__up'>
                        <ThumbUpOffAltIcon />
                        <h3> 1 </h3>
                    </div>
                    <div className='like-functionality__down'>
                        <ThumbDownOffAltIcon />
                        <h3> 0 </h3>
                    </div>
                </div>
            </div>
        </>
  )
}

export default PostPage