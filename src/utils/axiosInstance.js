import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

const check = async () => {
    let res
    try {
        const access = localStorage.getItem('access')
        res = await axios.post("http://127.0.0.1:8000/api/token/verify/", {
            "token": access
        })
    } catch (error) {
        const refresh = localStorage.getItem("refresh")
        if (refresh) {
            console.log(refresh)
            res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
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