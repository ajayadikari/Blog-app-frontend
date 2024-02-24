import { useEffect, useState } from 'react'
import './dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'
import { server } from '../../constants'
import { setCurrentIcon } from '../../redux/sideBarSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const Dashboard = () => {
    const auth = useSelector(store => store.auth.user)
    const [stats, setStats] = useState(null)
    const dispatch = useDispatch()
    dispatch(setCurrentIcon('home'))
    const navigate = useNavigate()
    const fetch = async () => {
        if (auth) {
            const res = await axiosInstance(`${server}api/v1/author/get-stats/${auth.user_id}`)
            setStats(res.data.stats)
            console.log(res.data.stats)
        }
    }
    useEffect(() => {
        if (auth) fetch()
    }, [auth])
    return (
        <div className="dashboard">
            <h1>DASHBOARD</h1>
            <div className="lower">
                <div className="leftOne">
                    <div className='col'>
                        <h3>Total posts: {stats?.total_posts}</h3>
                        <h3>Total subscribers: {stats?.total_subscribers}</h3>
                    </div>
                    <div>
                        <h3>Top 5 most liked posts: </h3>
                        {
                            stats?.most_liked_posts.length > 0 ? (<>
                                {
                                    stats?.most_liked_posts.map((post, i) => <p>{i + 1}: <span title='go to post' onClick={() => navigate(`/blog/${post.id}`)}>{post.name}</span> likes: <span>{post.total_likes}</span></p>)
                                }
                            </>) : (<p>you dont have posts</p>)
                        }
                        <h3>Most reported posts: {stats?.most_reported_posts}</h3>
                    </div>
                    <div className="col">
                        <button onClick={() => navigate('/author/my-posts')}>Your posts</button>
                        <button onClick={()=> toast.error('Feature is under develop')}>Reported posts</button>
                    </div>
                </div>
                <div className="rightOne">

                </div>
            </div>
        </div>
    )
}

export default Dashboard