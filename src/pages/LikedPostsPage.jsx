import LikedPosts from "../components/likedPosts/LikedPosts"
import { useDispatch } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../redux/authSlice"
import { useEffect } from "react"

const LikedPostsPage = () =>{
    const dispatch = useDispatch()
    useEffect(() => {
        const access = localStorage.getItem('access')
        if (access) {
            const decode = jwtDecode(access)
            console.log(decode)
            dispatch(setUser(decode))
        }
    }, [])
    return(
        <LikedPosts/>
    )
}
export default LikedPostsPage