import axios from "axios"
import { useEffect, useState } from "react"
import { server } from "../../constants"
import './blogcontainer.css'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fillPosts } from "../../redux/searchbarSlice"
import CardIcons from "../cardIcons/CardIcons"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../../redux/authSlice"
import { setLikedPostsIds } from "../../redux/postSlice"
import Shimmer from "../shimmer/Shimmer"

const BlogContainer = () => {
    const dispatch = useDispatch()
    dispatch(fillPosts([]))
    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    const auth = useSelector(store => store.auth.user)
    const [loading, setLoading] = useState(true)
    const likedBlogIds = useSelector(store => store.posts.likedPostIds)
    useEffect(() => {
        const getData = async () => {
            const res = await axios(`${server}api/v1/post/getPostByid/${id}`)
            setBlog(res.data.post)
        }
        getData()
    }, [])


    useEffect(() => {
        if (!auth) {
            const access = localStorage.getItem('access')
            if (access) {
                const decode = jwtDecode(access)
                dispatch(setUser(decode))
            }
        }
        setLoading(false)
    }, [])


    const getIds = async () => {
        const likedPostsids = await axios.get(`${server}api/v1/reader/liked-posts-id/${auth?.username}`)
        const ids = likedPostsids.data.ids.map(id => id.id)
        dispatch(setLikedPostsIds(ids))
    }

    useEffect(() => {
        if (auth && !auth?.is_author && likedBlogIds?.length == 0) {
            getIds()
        }
    }, [auth])


    return (
        <>{loading ? (<Shimmer></Shimmer>) : (blog ? (
            <div className="blogContainer">
                <div className="top1">
                    <h1>{blog.name}</h1>
                    <div className="det">
                        <p>by {blog.author_name}</p>
                        <p>posted on: {blog.created_at}</p>
                    </div>
                </div>
                <img src={`${blog.imgUrl ? (blog.imgUrl) : ("")}`} alt="" />
                <div className="blog-content">
                    <p>{blog.content} ocnwinvinv onionwenvenrvr</p>
                </div>
                {
                    auth ? (
                        <CardIcons liked={likedBlogIds?.includes((Number)(id)) ? (true) : (false)} className="custom" author_id={auth.user_id} postId={blog.id} blog={true} />
                    ) : ("")
                }
            </div>
        ) : <>
            Post not found
        </>)}</>
    )
}


export default BlogContainer