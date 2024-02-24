import { useEffect, useState } from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentIcon } from '../../redux/sideBarSlice'
import toast from 'react-hot-toast'


const Sidebar = () => {
    const [hoveredEle, setHoveredEle] = useState(null)
    const [activeIcon, setActiveIcon] = useState('home')
    const navigate = useNavigate()
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const currentIcon = useSelector(store => store.sideBar.currentIcon)


    const logoutHandler = () => {
        if (user) {
            localStorage.clear()
            navigate('/')
            toast.success('logged out')
            window.location.reload()
        }
    }

    const clickHandler = (name) => {
        if (name === 'home') navigate('/')
        else if (name === 'Liked blogs') navigate('/liked-posts')
        else if (name === 'profile') navigate(`/profile/${user.user_id}`)
        else if (name === 'creatPost') navigate('/post/create-post')
        dispatch(setCurrentIcon(name))
    }

    return (
        <div className="sidebar">
            <div className="cont">
                <div className={`icon`} title='home' onClick={() => clickHandler('home')}>
                    <i class={`fa-solid fa-house ${currentIcon === 'home' ? 'activeIcon' : ''}`}></i>
                </div>
                {
                    user ? (
                        <>
                            {
                                user.is_author !== true ? (<div className={`icon`} onClick={() => clickHandler('Liked blogs')} title='Liked blogs'>
                                    <i class={`fa-solid fa-heart ${currentIcon === 'Liked blogs' ? 'activeIcon' : ''}`}></i>
                                </div>) : (<></>)
                            }
                            <div className={`icon`} onClick={() => clickHandler('profile')} title='profile'>
                                <i class={`fa-solid fa-user ${currentIcon === 'profile' ? 'activeIcon' : ''}`}></i>
                            </div>
                            <div className={`icon`} onClick={() => clickHandler('theme')} title='theme'>
                                <i class={`fa-solid fa-moon ${currentIcon === 'theme' ? 'activeIcon' : ''}`}></i>
                            </div>
                            {
                                user?.is_author ? (
                                    <div className={`icon`} onClick={() => clickHandler('creatPost')} title='Create article' >
                                        <i class={`fa-solid fa-plus ${currentIcon === 'creatPost' ? 'activeIcon' : ''}`}></i>
                                    </div>
                                ) : ("")
                            }
                            {
                                user ? (
                                    <div className={`icon`} onMouseEnter={() => setHoveredEle('logout')} title='Logout' onClick={() => logoutHandler()}>
                                        <i class="fa-solid fa-right-from-bracket"></i>
                                    </div>
                                ) : ("")
                            }
                        </>
                    ) : (
                        <div className={`icon`} onMouseEnter={() => setHoveredEle('login')} title='Login' onClick={() => navigate('/login')}>
                            <i class="fa-solid fa-right-to-bracket"></i>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Sidebar