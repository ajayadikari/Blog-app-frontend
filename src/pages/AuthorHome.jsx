import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Dashboard from "../author/dashboard/Dashboard"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../redux/authSlice"



const AuthorHome = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.auth.user)
    useEffect(() => {
        const access = localStorage.getItem('access')
        if (access) {
            const decode = jwtDecode(access)
            dispatch(setUser(decode))
            console.log(user)
        }
    }, [])
    return (
        <Dashboard />
    )
}

export default AuthorHome