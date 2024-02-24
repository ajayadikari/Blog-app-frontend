import './card.css'
import CardIcons from '../cardIcons/CardIcons'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { server } from '../../constants';
import axios from 'axios';

const Card = ({ post }) => {
    const dateObject = new Date(post.created_at)
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const date = `${year}/${month}/${day}`;
    const likedPostsIds = useSelector(store => store.posts.likedPostIds)
    const auth = useSelector(store => store.auth.user)
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`/blog/${post.id}`)
    }
    const name = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio adipisci voluptas vitae ea commodi tempore, harum iste dolorum aliquid esse totam. Est perferendis accusantium quod reiciendis minima enim veritatis laboriosam dignissimos labore esse mollitia, deleniti quos quidem totam quo! Quae dolor minima, recusandae maxime tenetur quidem. Earum laudantium eos voluptatibus debitis odio animi aut facere accusantium incidunt labore harum rem voluptatem asperiores voluptatum aliquam, dolores quos veritatis quia delectus cumque molestias commodi? Aliquid, iusto ullam cum corporis nobis sint. Corrupti obcaecati aperiam exercitationem provident odio, consequatur soluta nostrum odit a nulla pariatur, necessitatibus, eum corporis reprehenderit ea distinctio quasi. Cupiditate.'

    return (
        <div className="card">
            <div className="left" onClick={() => clickHandler()}>
                {/* <img src="" alt="image not loaded" /> */}
                <div className='upper'>
                    <div className="box">
                        <img src={`${post.imgUrl}`} alt="" srcset="" />
                    </div>
                    <div className="content">
                        <h3 style={{ marginBottom: '10px' }}>Description</h3>
                        <p>{post.content.substring(0, 250)}{post.length > 250 ? ('...') : ("") }</p>
                    </div>
                </div>
                <hr />
                <div className="lower">
                    <h2>{post.name.substring(0, 55)}{post.name.length > 55 ? ('...') : ("")}</h2>
                    <hr />
                    <div className="detail-box">
                        <div>
                            <h6>{post.category_name}</h6>
                        </div>
                        <div>
                            <p>created:- {date}</p>
                            <p>author:- {post.author_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                auth ? (
                    <>
                        <div className="right">
                            <CardIcons card={true} postId={post.id} user={true} heading={"Author Profile"} author_id={post.author_id} liked={likedPostsIds.includes(post.id)} />
                        </div>
                    </>
                ) : ("")
            }
        </div>
    )
}


export default Card