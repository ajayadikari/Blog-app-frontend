import { useSelector } from "react-redux"
import Login from "../components/login/Login"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const LoginPage = () => {
    const auth = useSelector(store => store.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (auth) navigate('/')
    }, [])
    return (
        <>
            <Login />
        </>
    )
}

export default LoginPage