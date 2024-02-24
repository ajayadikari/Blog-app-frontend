import { useLocation } from "react-router-dom"
import Profile from "../components/profile/Profile"
import { setCurrentIcon } from "../redux/sideBarSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const ProfilePage = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const user = query.get('user')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setCurrentIcon("profile"))
    }, [])

    return (
        <Profile user={user} />
    )
}

export default ProfilePage