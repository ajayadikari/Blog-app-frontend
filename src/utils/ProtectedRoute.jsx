import { useDispatch, useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { setUser } from "../redux/authSlice"
import { useEffect, useState } from "react"

const ProtectedRoute = ({ children }) => {
    const user = useSelector(store => store.auth.user)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            const access = localStorage.getItem('access')
            if (access) {
                const decode = jwtDecode(access)
                console.log(decode)
                dispatch(setUser(decode))
            }
        }
        setLoading(false)
    }, [])

    return (<>
        {
            loading ? (<>loading</>) : (user ? children : <Navigate to='/login' />)
        }
    </>)
}

export default ProtectedRoute