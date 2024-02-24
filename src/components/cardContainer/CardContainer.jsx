import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../constants'
import { useEffect, useState } from 'react'
import Card from '../card/Card'
import './cardcontainer.css'
import { fillPosts, setHasNextPage, incCurrentPage, setLikedPostsIds } from '../../redux/postSlice'
import Shimmer from '../shimmer/Shimmer'

const CardContainer = ({ usingSearch, term, author }) => {
    const user = useSelector(store => store.auth.user)
    let category = useSelector(store => store.posts.category)
    const dispatch = useDispatch()
    let posts = useSelector(store => store.posts.posts)
    const has_next = useSelector(store => store.posts.has_next)
    let current_page = useSelector(store => store.posts.current_page)
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(user?.username)

    useEffect(() => {
        if (user && user?.username) {
            setUsername(user?.username);
        }
    }, [user]);

    const getIds = async () => {
        const likedPostsids = await axios.get(`${server}api/v1/reader/liked-posts-id/${username}`)
        const ids = likedPostsids.data.ids.map(id => id.id)
        dispatch(setLikedPostsIds(ids))
    }

    //only fetch when user requested to load by clicking load button
    //if not, it gets loaded even when you visit back the same page by going forward
    const fetchData = async (req) => {
        if (author) {
            if (user) {
                const res = await axios.get(`${server}api/v1/post/getAllPostsByAuthor/${user?.username}`)
                dispatch(fillPosts([]))
                dispatch(fillPosts(res.data.posts))
                dispatch(setHasNextPage(false))
            }

        }
        else {
            if (usingSearch && term.length != 0) {
                dispatch(fillPosts([]))
                const res = await axios.get(`${server}api/v1/post/get-posts-by-search-term/${term}`)
                dispatch(fillPosts(res.data.posts))
                dispatch(setHasNextPage(res.data.has_next))
            }
            else if (req === 'firsttime' && posts.length === 0) {
                const res = await axios.get(`${server}api/v1/post/${category == null ? `get-posts?page=${current_page}` : `get-posts-by-category-id/${category}`}`)
                dispatch(fillPosts(res.data.posts))
                dispatch(setHasNextPage(res.data.has_next))
            }
            else if (req === 'load' && has_next) {
                dispatch(incCurrentPage())
                current_page += 1
                const res = await axios.get(`${server}api/v1/post/${category == null ? `get-posts?page=${current_page}` : `get-posts-by-category-id/${category}`}`)
                dispatch(fillPosts(res.data.posts))
                dispatch(setHasNextPage(res.data.has_next))
            }
        }


        setLoading(false)
    }


    useEffect(() => {
        if (username != null && !user.is_author) getIds()
    }, [username])

    useEffect(() => {
        if (author) fetchData()
    }, [user])

    useEffect(() => {
        fetchData("firsttime")
    }, [category])


    return (
        <>
            {
                loading ? (<Shimmer />) : (
                    posts.length > 0 ? (
                        <div className="card-container">
                            {
                                posts.map(post => {
                                    return <Card post={post} />
                                })
                            }
                            {
                                has_next && <button onClick={() => fetchData("load")}>Load more...</button>
                            }
                        </div>
                    ) :
                        <h1>No post found</h1>
                )
            }
        </>
    )
}

export default CardContainer