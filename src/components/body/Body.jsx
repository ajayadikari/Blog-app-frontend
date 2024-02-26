import FilterBar from "../filterbar/FilterBar"
import CardContainer from "../cardContainer/CardContainer"
import './body.css'
import { useEffect } from "react"
import { setUser } from "../../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode";
import { setCurrentIcon } from "../../redux/sideBarSlice"


const Body = ({ author=false }) => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.auth.user)
    useEffect(() => {
        const access = localStorage.getItem('access')
        if (access) {
            const decode = jwtDecode(access)
            dispatch(setUser(decode))
            console.log(user)
        }
        dispatch(setCurrentIcon("home"))
    }, [])
    return (
        <>
            {
                <>
                        {!user?.is_author && <FilterBar />}
                        <div className="body">
                            {
                                <CardContainer usingSearch={false} author={author} />
                            }
                        </div>
                    </>
            }
        </>

    )
}

export default Body