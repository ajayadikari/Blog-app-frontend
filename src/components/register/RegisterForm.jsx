import { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { server } from '../../constants'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const RegistrationForm = ({ profile, heading = "Form" }) => {
    const [username, setUsername] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('na')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [bio, setBio] = useState('')
    const [is_author, setIsAuthor] = useState(false)
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const preset_key = "ainjr7eq"
    const cloud_name = "dwjgszcot"
    const user = useSelector(store => store.auth.user)
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'gender': gender,
                'contact': contact,
                address,
                bio,
                is_author,
                password,
                imageUrl
            }
            let res
            if (is_author) res = await axios.post(`${server}api/v1/author/create-author`, data)
            else res = await axios.post(`${server}api/v1/reader/create-reader`, data)
            toast.success('Registration successful, login!')
            navigate('/login')
        } catch (error) {
            console.log(error)
        }

    }



    const fileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
        setImageUrl(res.data.secure_url)
    }

    const fetchProfile = async () => {
        try {
            const res = await axios(`${server}api/v1/account/get-user-account/${user.user_id}`)
            const account = res.data.account
            setUsername(account.username)
            setFirstName(account.first_name)
            setLastName(account.last_name)
            setContact(account.contact)
            setEmail(account.email)
            setAddress(account.address)
            setBio(account.bio)
            setImageUrl(account.imageUrl)
        } catch (error) {

        }
    }


    useEffect(() => {
        if (profile) {
            fetchProfile()
        }
    }, [])

    const updateHandler = async () => {
        try {
            const data = {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'gender': gender,
                'contact': contact,
                address,
                bio,
                is_author,
                password,
                imageUrl
            }
            const res = await axiosInstance.patch(`${server}api/v1/account/update-profile/${user.user_id}`, data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <h1>{heading}</h1>
            <form method="POST" onSubmit={submitHandler}>
                <div className="left">
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="no spaces please" required />
                    </div>
                    <div>
                        <label htmlFor="first_name">First name:</label>
                        <input type="text" name="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your firstname" required />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last name:</label>
                        <input type="text" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your lastname" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="gender" value={gender} onChange={(e) => setGender(e.target.value)}>Gender:</label>
                        <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="na">Choose</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="contact">Contact:</label>
                        <input type="number" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Enter your contact" />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <textarea name="address" id="" cols="30" rows="4" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <textarea name="bio" id="" cols="30" rows="4" placeholder="Enter bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="profilepic">Upload profile pic:</label>
                        <input type="file" name='profilepic' onChange={fileHandler} />
                    </div>
                    <div>
                        <label htmlFor="password" required>Password:</label>
                        <input type="password" placeholder='ex:123456' onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    {
                        profile ? (
                            <>
                                <input type="submit" value="update" className='btn' onClick={updateHandler} />
                            </>
                        ) : (
                            <>
                                <input type="submit" value={'Sign as Reader'} className='btn' onClick={() => setIsAuthor(false)} />
                                <input type="submit" value={'Sign as Author'} className='btn' onClick={() => setIsAuthor(true)} />
                            </>
                        )
                    }
                </div>
            </form>
        </>
    )
}

export default RegistrationForm