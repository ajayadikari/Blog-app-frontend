import { useNavigate } from 'react-router-dom'
import './cardicons.css'
import axios from 'axios'
import { server } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { removeLIkedPostId, addLikedPostId, removePostFromLikedPosts } from '../../redux/postSlice'
import { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'

const CardIcons = ({ card, postId, user, liked, author_id, blog=false }) => {
    console.log(liked)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userObj = useSelector(state => state.auth.user)
    const [imgUrl, setImgUrl] = useState(null)
    const fetch = async () => {
        const res = await axios(`${server}api/v1/account/get-user-img/${author_id}`)
        if (res.data.imgUrl[0].imageUrl !== null) {
            setImgUrl(res.data.imgUrl[0].imageUrl)
        }
        console.log(imgUrl)
    }
    useEffect(() => {
        if (author_id) fetch()
    }, [])

    const LikeHandler = async () => {
        try {
            if (!liked) {
                const res = await axios.post(`${server}api/v1/reader/like-post/${userObj.username}/${postId}`)
                dispatch(addLikedPostId(postId))
                toast.success('Post Liked')
            }
            else {
                const res = await axios.post(`${server}api/v1/reader/unlike-post/${userObj.username}/${postId}`)
                dispatch(removeLIkedPostId(postId))
                dispatch(removePostFromLikedPosts(postId))
                toast.error('Like removed')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const deleteHandler = async () => {
        try {
            const res = await axiosInstance.delete(`${server}api/v1/post/delete-post/${postId}`)
            if(blog) navigate('/author')
            else window.location.reload()
            toast.success('Post deleted')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='card-icons'>
            {
                userObj.is_author ? (<div>
                    <div className={`icon`} onClick={() => navigate(`/post/update-post/${postId}`)}><i class="fa-solid fa-pen-to-square" title='edit post'></i></div>
                    <div className={`icon`} onClick={deleteHandler}><i class="fa-solid fa-trash" title='delete post'></i></div>
                </div>) : (<>
                    <div style={{ borderBottom: "2px solid gold" }}>
                        <div className={`icon`}><i class={`fa-solid fa-heart ${liked ? 'liked' : ""}`} title='like' onClick={LikeHandler}></i></div>
                        <div className='icon' onClick={() => navigate(`/profile/${author_id}?user=${user}`)}>
                            {
                                imgUrl ? (
                                    <img src={`${imgUrl}`} alt="" srcset="" />
                                ) : (
                                    <i class="fa-solid fa-user" title='author'></i>
                                )
                            }
                        </div>
                    </div>
                    <div className='icon' onClick={()=> toast.error('feature not developed yet')}><i class="fa-solid fa-flag" title='report'></i></div>
                </>)
            }
        </div>
    )
}

export default CardIcons