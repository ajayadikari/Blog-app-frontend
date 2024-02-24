import { useEffect, useState } from 'react'
import './filterbar.css'
import axios from 'axios'
import { server } from '../../constants'
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fillPosts } from '../../redux/postSlice'

const FilterBar = () => {
    const [cat, setCat] = useState([])
    const [selectedFilter, setSelectedFilter] = useState('')
    const multiCat = useSelector(store => store.posts.multiCategories)
    const dispatch = useDispatch()
    useEffect(() => {
        const getCat = async () => {
            const res = await axios(`${server}api/v1/category/get-all-categories`)
            setCat(res.data.categories)
        }
        getCat()
    }, [])

    const clickHandler = (selected) => {
        if (selectedFilter !== selected) setSelectedFilter(selected)
        else setSelectedFilter("")
    }

    const multipleCatHandler = () => {
        dispatch(fillPosts([]))
        const fetch = async () => {
            let query = "?"
            multiCat.map(cat => {
                query += `category=${cat}&`
            })
            query = query.substring(0, query.length-1)
            const res =  await axios(`${server}api/v1/post/get-filtered-posts${query}`)
            dispatch(fillPosts(res.data.posts))
        }

        fetch()
        
    }

    return (
        <div className='allfilters'>
            <div className={`filterbar`}>
                <div className={`up ${selectedFilter == 'category' ? 'activate' : ""}`} onClick={() => clickHandler("category")}>
                    <h3>Category</h3>
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div className={`categories ${selectedFilter === 'category' ? 'activate' : ""}`}>
                    <div className={`in ${selectedFilter == 'category' ? 'activate' : ""}`}>
                        <p style={{ marginBottom: '15px' }}>select multiple categories</p>
                        {
                            cat.map(c => {
                                return <Button name={c.name} id={c.id} action="single" />
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`filterbar`}>
                <div className={`up ${selectedFilter == 'multiple' ? 'activate' : ""}`} onClick={() => clickHandler("multiple")}>
                    <h3>Filters</h3>
                    <i class="fa-solid fa-angle-down"></i>
                </div>
                <div className={`categories ${selectedFilter == 'multiple' ? 'activate' : ""}`}>
                    <div className={`in ${selectedFilter === 'multiple' ? 'activate' : ""}`}>
                        <p style={{ marginBottom: '15px' }}>select multiple categories</p>
                        {
                            cat.map(c => {
                                return <Button name={c.name} id={c.id} action={"multiple"} />
                            })
                        }
                        <div className="">
                            <button style={{ width: '100%', height: '30px', marginTop: '15px' }} onClick={() => multipleCatHandler()}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar