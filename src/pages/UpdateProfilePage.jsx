import { useEffect } from "react"
import RegistrationForm from "../components/register/RegisterForm"
import { setCurrentIcon } from "../redux/sideBarSlice"
import { useDispatch } from "react-redux"


const UpdateProfilePage = () =>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setCurrentIcon("profile"))
    }, [])
    return(
        <RegistrationForm profile={true} heading="Update profile"/>
    )
}

export default UpdateProfilePage