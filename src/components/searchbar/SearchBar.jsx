import { useDispatch, useSelector } from 'react-redux'
import './searchbar.css'
import { toggleSearchBar } from '../../redux/searchbarSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../constants';
import { fillPosts } from '../../redux/searchbarSlice';
import Bar from '../bar/Bar';
import { useNavigate } from 'react-router-dom';
import { fillPosts as fill } from '../../redux/postSlice';


const SearchBar = () => {
    const dispatch = useDispatch();
    const showSearchBar = useSelector(store => store.searchBar.searchBar);
    const [term, setTerm] = useState("")
    const posts = useSelector(store => store.searchBar.posts)
    const navigate = useNavigate()

    const searchHandler = (term) => {
        setTerm(term)
        const fetch = async () => {
            if (term.length > 0) {
                const res = await axios(`${server}api/v1/post/get-posts-by-search-term/${term}`)
                dispatch(fillPosts(res.data.posts))
            }
            else dispatch(fillPosts([]))
        }
        fetch()
    }
    const search = (e) => {
        if (e.key === 'Enter') {
            dispatch(fillPosts([]))
            navigate(`/results/${term}`)
        }

    }

    return (
        <div className='parent'>
            <div className={`search-bar ${showSearchBar ? 'active' : ''}`} title='search'>
                <i class="fa-solid fa-magnifying-glass" onClick={() => dispatch(toggleSearchBar())}></i>
                <input type="text" placeholder='search post...' onChange={(e) => searchHandler(e.target.value)} onKeyDown={search} />
            </div>
            <div className='bars'>
                {
                    posts.map(post => {
                        { console.log(posts) }
                        return <Bar name={post.name} id={post.id} />
                    })
                }
            </div>
        </div>
    )
}

export default SearchBar