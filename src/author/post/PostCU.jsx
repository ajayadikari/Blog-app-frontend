import { useEffect, useState } from "react"
import axios from "axios"
import { server } from "../../constants"
import './post.css'
import Input from "../../input/Input"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../../utils/axiosInstance"
import { setCurrentIcon } from "../../redux/sideBarSlice"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

const PostCU = ({ edit = false }) => {
    const [name, setName] = useState(null)
    const [content, setContent] = useState(null)
    const [category, setCategory] = useState(null)
    const [allCategories, setAllCategories] = useState([])
    const [imageUrl, setImageUrl] = useState(null)
    const preset_key = "ainjr7eq"
    const cloud_name = "dwjgszcot"
    const user = useSelector(store => store.auth.user)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [values, setValues] = useState(null)

    useEffect(() => {
        dispatch(setCurrentIcon('creatPost'))
        const fetch = async () => {
            const res = await axios(`${server}api/v1/category/get-all-categories`)
            setAllCategories(res.data.categories)
            if (edit) {
                const res = await axios(`${server}api/v1/post/getPostByid/${id}`)
                setValues(res.data.post)
            }
        }
        fetch()
    }, [])

    useEffect(() => {

    }, [category])

    const fileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        setImageUrl(res.data.secure_url)
    }
    const submitHandler = async (e) => {
        let data = {
            name,
            content,
            category,
            imgUrl: imageUrl
        }
        const res = await axiosInstance.post(`${server}api/v1/post/create-post/${user.username}`, data = data)
        toast.success('Post created')
        
    }

    const updateHandler = async () => {
        let data = {
            name,
            content,
            category,
            imgUrl: imageUrl
        }
        const res = await axiosInstance.patch(`${server}api/v1/post/update-post/${id}`, data = data)
        toast.success('Post updated')
    }

    useEffect(() => {

    }, [imageUrl])

    useEffect(() => {
        setImageUrl(values?.imgUrl)
        setName(values?.name)
        setContent(values?.content)
        setCategory(values?.category_name)
    }, [values])

    return (
        <div className="post-container">
            <h1>Create new post</h1>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter post name" required />
            </div>
            <div>
                <label htmlFor="category">Select category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="" required>
                    {
                        allCategories.map(c => {
                            return <option value={c.name} onClick={() => setCategory(c.name)}>{c.name}</option>
                        })
                    }
                </select>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "row" }}>
                <p>Set image: </p>
                <input type="file" name="" id="" onChange={fileHandler} />
                <img className="postImg" src={edit ? (imageUrl ? (imageUrl) : (values?.imgUrl)) : ("")} alt="" srcset="" />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea value={content} name="content" onChange={(e) => setContent(e.target.value)} id="" cols="30" rows="10"></textarea>
            </div>
            {
                edit ? (<button onClick={updateHandler} >update</button>) : (<button onClick={submitHandler}>Create</button>)
            }
        </div>
    )
}

export default PostCU