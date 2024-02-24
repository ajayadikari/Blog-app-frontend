import { useSelector } from "react-redux"
import Body from "../components/body/Body"
import { Navigate } from "react-router-dom"

const HomePage = () => {
    const user = useSelector(store => store.auth.user)
    return (<>{
        user?.is_author ? (<Navigate to={'/author'} />) : (<Body />)
    }</>)
}

export default HomePage