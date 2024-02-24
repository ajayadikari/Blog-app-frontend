import { useNavigate } from 'react-router-dom'
import './bar.css'

const Bar = ({name, id}) => {
    const navigate = useNavigate()
    const clickHandler = () =>{
        navigate(`/blog/${id}`)
    }
    return (
        <div className='bar' onClick={clickHandler}>
            <p>{name}</p>
        </div>
    )
}

export default Bar