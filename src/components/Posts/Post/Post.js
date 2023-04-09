import React,{useState} from 'react';
import ReactDom from 'react-dom';
import moment from "moment";
import {Provider, useDispatch} from "react-redux";
import {deletePost,likePost} from "../../../actions/posts";
import {Link} from "react-router-dom";
import { PlusOutlined, HeartFilled, ArrowDownOutlined } from '@ant-design/icons';
import Auth from '../../Auth/Auth'
// import Modal from '../Modal/Modal'
import {Avatar,Modal} from 'antd'
import './style.css'
import App from "../../../App";

const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(post)
    // const Likes = () => {
    //     if(post.likes.length > 0){
    //         return post.likes.find((like) => like === (user?.result?._id))
    //             ?(
    //                 <>
    //                     <i className="fa fa-thumbs-o-up fa-lg"></i>
    //                     {post.likes.length > 2 ? `you and ${post.likes.length-1}other`:`${post.likes.length} like${post.likes.length>1?'s':''}`}
    //                 </>
    //             ):(
    //                 <>
    //                     <i className="fa fa-thumbs-o-up fa-lg"></i>
    //                     {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
    //                 </>
    //             )
    //     }
    //     return <><i className="fa fa-thumbs-o-up fa-lg"></i>Like</>
    // }
    const handleLike = async() =>{
        const res = await dispatch(likePost(post._id));
        console.log(res)
        if(res.message === 'Unauthenticated'){
            setShowLogin(true)
            // ReactDom.render(
            //     <Modal/>,
            //     document.getElementById('App'));
        }
    }
    const handleClose = () => {
        setShowLogin(false)
    }
    return (
        <>
            <div className="post">
            <img src={`${post.selectFile}`} />
            {/*<div className="absolute left-2 top-2 text-xl text-gray-900">*/}
            {/*    <h1>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h1>*/}
            {/*    <h1>{post.name}</h1>*/}
            {/*</div>*/}
            {/*{(user?.result?._id === post?.creator) &&(*/}
            {/*    <Link to="/form"><button className=" absolute right-2 top-2" onClick={() => setCurrentId(post._id)}><i className="fa fa-ellipsis-h fa-2x text-gray-200"></i></button></Link>*/}

            {/*    )}*/}
            {/*<div className="bg-gray-100 rounded-b-2xl">*/}
            {/*    <p className="p-2  text-gray-700">{post.tags.map((tag) => `#${tag}`)}</p>*/}
            {/*    <h1 className="p-1 text-2xl text-gray-900">{post.title}</h1>*/}
            {/*    <p className="p-2 text-xl text-gray-900 description">{post.message}</p>*/}
            {/*    <div className="px-3 text-gray-900 pb-2">*/}
            {/*        <button className="text-base" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>*/}
            {/*           <Likes/>*/}
            {/*        </button>*/}
            {/*        {(user?.result?._id === post?.creator) &&(*/}
            {/*        <button className="float-right text-base" onClick={() => dispatch(deletePost(post._id))}><i className="fa fa-close fa-lg"></i>删除</button>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="likeAndColl">
                <div className="icon" onClick={handleLike}>
                    <HeartFilled/>
                </div>
                <div className="icon" >
                    <PlusOutlined/>
                </div>
            </div>
            <div className="creatorAndDownLoad">
                <div className="creator">
                    <Avatar  src={`${post.creatorFile}`} />
                    <span>{post?.name}</span>
                </div>
                <div className="downLoad">
                    <div className="icon" >
                        <ArrowDownOutlined />
                    </div>
                </div>
            </div>
        </div>
            <Modal open={showLogin} onCancel={handleClose} footer={null} width={700} wrapClassName={"loginModal"}>
                <div className="loginContent">
                    {/*<div style={{backgroundImage:`${post.selectFile}`}}>*/}
                    {/*</div>*/}
                    {/*<img src={post.selectFile} style={{clipPath:'polygon(40% 0%, 60% 0%,60% 100%,40% 100%)'}}/>*/}
                    <div style={{width:"100px",height:'600px'}}>
                        <img src={post.selectFile} style={{width:"100px",height:'600px',objectFit:'cover'}}/>
                    </div>
                    <div>
                        <Auth></Auth>
                    </div>
                </div>
            </Modal>
            {/*<div className="loginModal">*/}

            {/*</div>*/}
        </>
    );

}

export default Post;