import axios from "axios"
import { useState } from "react"
import { server } from "../../constants"
import { Link, useNavigate } from "react-router-dom";
import './login.css'
import toast from "react-hot-toast";


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const data = { username, password }
            const res = await axios.post(`${server}api/token/`, { username, password })
            const access = res.data.access
            const refresh = res.data.refresh
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            navigate('/')
            toast.success('logged in')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required placeholder="Enter your registered username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Enter your password" name="password" />
                </div>
                <input type="submit" />
                <p>not a user? <Link to={'/register'}>register</Link></p>
            </form>
        </div>
    )
}

export default Login