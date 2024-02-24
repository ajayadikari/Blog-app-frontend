import './button.css'
import { setCategory, setMultiCategory, fillPosts, setCurrentPageToDefault } from '../../redux/postSlice'
import { useDispatch, useSelector } from 'react-redux'

const Button = ({ name, action, id }) => {
    const dispatch = useDispatch()
    const category = useSelector(store => store.posts.category)
    const multiCategories = useSelector(store => store.posts.multiCategories)
    const current_page = useSelector(store => store.posts.current_page)
    const clickHandler = () => {
        if(action === 'single') {
            dispatch(fillPosts([]))
            dispatch(setCurrentPageToDefault())
        }
        dispatch(action === 'single' ? setCategory(id) : setMultiCategory(id))
    }
    return (
        <button className={`${action === 'single' ? (`${category == id ? 'activeButton' : ""}`) : (`${multiCategories.includes(id) === true ? 'activeButton' : ""}`)}`} onClick={() => clickHandler()}>{name}</button>
    )
}

export default Button