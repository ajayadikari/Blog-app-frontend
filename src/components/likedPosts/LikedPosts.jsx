import { useEffect } from "react"
import Card from "../card/Card"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setLikedPosts } from "../../redux/postSlice"
import { server } from "../../constants"
import './likedposts.css'
import axiosInstance from "../../utils/axiosInstance"
import { setCurrentIcon } from "../../redux/sideBarSlice"

const LikedPosts = () => {
    const user = useSelector(store => store.auth.user)
    const likedPosts = useSelector(store => store.posts.likedPosts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCurrentIcon("Liked blogs"))
        const fetch = async () => {
            const res = await axiosInstance.get(`${server}api/v1/reader/liked-posts/${user.username}`)
            dispatch(setLikedPosts([...res.data.likedPosts]))
        }
        if (!user.is_author) {
            fetch()
        }
    }, [])
    return (
        <div className="liked-posts-container">
            {likedPosts?.length > 0 && <h1>your liked posts...</h1>}
            {
                likedPosts?.length > 0 ? (
                    <div className="card-container">
                        {
                            likedPosts.map(post => {
                                return <Card post={post} />
                            })
                        }
                    </div>
                ) :
                    <h1>You dont have any liked posts</h1>
            }
        </div>
    )
}

export default LikedPosts