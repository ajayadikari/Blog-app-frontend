import axios from "axios";
import { server } from "../constants";

const axiosInstance = axios.create({
    baseURL: `${server}`
})

const check = async () => {
    let res
    try {
        const access = localStorage.getItem('access')
        res = await axios.post(`${server}api/token/verify/`, {
            "token": access
        })
    } catch (error) {
        const refresh = localStorage.getItem("refresh")
        if (refresh) {
            console.log(refresh)
            res = await axios.post(`${server}api/token/refresh/`, {
                "refresh": refresh
            })
            localStorage.setItem('access', res.data.access)
        }
    }
    return res
}

axiosInstance.interceptors.request.use(async (req) => {
    const res = await check()
    const access = localStorage.getItem('access')
    if (access) {
        req.headers.Authorization = `Bearer ${access}`
    }
    return req
})

export default axiosInstance