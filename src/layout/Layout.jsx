import Navbar from "../components/navbar/NavBar"
import Sidebar from "../components/sidebar/Sidebar"
import SearchBar from "../components/searchbar/SearchBar"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const Layout = () => {
    const auth = useSelector(store => store.auth.user)
    return (
        <>
            <Navbar />
            {
                auth && !auth?.is_author && <SearchBar/> 
            }
            <Outlet />
            <Sidebar />
        </>
    )
}

export default Layout