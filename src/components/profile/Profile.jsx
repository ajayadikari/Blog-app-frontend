import './profile.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { server } from '../../constants'
import axios from 'axios'

const Profile = ({ user }) => {
    const { id } = useParams()
    const [profile, setProfile] = useState({})
    const auth = useSelector(store => store.auth.user)
    const navigate = useNavigate()
    const [subStat, setSubStat] = useState(false)
    const fetchProfile = async () => {
        try {
            let res
            res = await axiosInstance(`/api/v1/account/get-user-account/${id}`)
            setProfile(res.data.account)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const res = await axios(`${server}api/v1/reader/is-reader-subscribed/${auth?.user_id}/${id}`)
            setSubStat(res.data.subscribed)
        }
        if(user) fetch()
    }, [])

    const subscribeHandler = async () => {
        if (!subStat) {
            try {
                const res = await axiosInstance.post(`${server}api/v1/reader/subscribe/${auth?.username}/${profile?.username}`)
                setSubStat(true)
                toast.success(`subscribed to ${profile?.username}`)
            } catch (error) {
                console.log(error)
                toast.error('something went wrong')
            }
        }
        else {
            try {
                const res = await axiosInstance.post(`${server}api/v1/reader/unsubscribe/${auth?.username}/${profile?.username}`)
                setSubStat(false)
                toast.success(`unsubscribed to ${profile?.username}`)
            } catch (error) {
                console.log(error)
                toast.error('something went wrong')
            }
        }
    }


    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <div className="profile">
            <div className="upper">
                <img src={profile.imageUrl} alt="" />
            </div>
            <div className="lower">
                <div>
                    <label htmlFor="username">Username: </label>
                    <p>{profile.username}</p>
                </div>
                <div>
                    <label htmlFor="">Full name: </label>
                    <p>{profile.first_name} {profile.last_name}</p>
                </div>
                <div>
                    <label htmlFor="">Email: </label>
                    <p>{profile.email}</p>
                </div>
                <div>
                    <label htmlFor="">Contact: </label>
                    <p>{profile.contact}</p>
                </div>
                <div>
                    <label htmlFor="">Bio: </label>
                    <p>{profile.bio}</p>
                </div>
                <div>
                    <label htmlFor="">Address: </label>
                    <p>{profile.address}</p>
                </div>
            </div>
            {
                user ? <button onClick={subscribeHandler} style={{ width: "100%", height: "35px" }}>{(subStat ? ("unsubscribe") : ("subscribe"))}</button> : <button style={{ width: "100%", height: "35px" }} onClick={() => navigate(`/update-profile/${auth.user_id}`)}>Update</button>
            }
        </div>
    )
}

export default Profile