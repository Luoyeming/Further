import React,{useState} from 'react';
import ReactDom from 'react-dom';
import moment from "moment";
import {Provider, useDispatch} from "react-redux";
import {deletePost,likePost} from "../../../actions/posts";
import {collectionPic, signin} from "../../../actions/auth";
import {Link} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import { PlusOutlined, HeartFilled, ArrowDownOutlined } from '@ant-design/icons';
import Auth from '../../Auth/Auth'
// import Modal from '../Modal/Modal'
import {Avatar,Modal,message} from 'antd'
import './style.css'
import App from "../../../App";

const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const [postItem,setPostItem] = useState(post)
    const [showLogin, setShowLogin] = useState(false)
    const [isCollection, setIsCollection] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'));
    const [messageApi, contextHolder] = message.useMessage();
    const history = useHistory();
    console.log(postItem)
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
        if(postItem.likes.includes(user?.result?._id)){
            messageApi.open({
                type:'error',
                content: '已点赞',
            })
            return
        }
        if(postItem?.creator === user?.result?._id){
            messageApi.open({
                type:'warning',
                content: '不能点赞自己的图片',
            })
            return
        }
        const res = await dispatch(likePost(postItem?._id));
        console.log(res)
        if(res?.code !== 200){
            setShowLogin(true)
            return
        }
        messageApi.open({
            type:'success',
            content: '点赞成功',
        })
        setPostItem(res?.message)
    }
    const handleClose = () => {
        setShowLogin(false)
    }

    const handleCollection = async() =>{
        if(user?.result?._id === postItem.creator){
            messageApi.open({
                type:'warning',
                content: '不能收藏自己的图片',
            })
            return
        }
        if(user?.result?.myCollection.includes(postItem._id)){
            messageApi.open({
                type:'warning',
                content: '已收藏',
            })
            return
        }
        const res = await dispatch(collectionPic(user?.result?._id, postItem._id))
        console.log(res)
        if(res?.code === 200){
            messageApi.open({
                type:'success',
                content: '收藏成功',
            })
            setIsCollection(true)
        }else{
            messageApi.open({
                type:'error',
                content: '收藏失败',
            })
            setIsCollection(false)
        }
    }
    return (
        <>
            {contextHolder}
            <div className="post">
            <img src={`${postItem.waterImg}`} />
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
            <div className="maskImage">
                <div className="likeAndColl">
                    <div className="icon" onClick={handleLike}>
                        <HeartFilled className='likeButton' style={user && postItem  && postItem.likes.includes(user?.result?._id) ? {color:'#ff7875'}:{}}/>
                    </div>
                    <div className="icon" onClick={handleCollection}>
                        <PlusOutlined className='collectionButton' style={isCollection || (user && postItem  && user?.result?.myCollection.includes(postItem?._id)) ? {color:'#ffec3d'}:{}}/>
                    </div>
                </div>
                <div className="creatorAndDownLoad">
                    <div className="creator" onClick={()=>{history.push(`/user/${postItem.creator}`)}}>
                        <Avatar  src={`${postItem.creatorFile}`} />
                        <span>{postItem?.name}</span>
                    </div>
                    <div className="downLoad">
                        <div className="icon" >
                            <ArrowDownOutlined className='downloadButton'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Modal open={showLogin} onCancel={handleClose} destroyOnClose={true} style={{top:'60px'}} footer={null} width={900} wrapClassName={"loginModal"}>
                <div className="loginContent">
                    {/*<div style={{backgroundImage:`${post.selectFile}`}}>*/}
                    {/*</div>*/}
                    {/*<img src={post.selectFile} style={{clipPath:'polygon(40% 0%, 60% 0%,60% 100%,40% 100%)'}}/>*/}
                    <div style={{borderRadius:"10px 0 10px 0"}}>
                        <img src={postItem.waterImg} style={{width:"280px",height:'630px',objectFit:'cover',borderRadius:"8px 0 0 8px4"}}/>
                    </div>
                    <div style={{width:'620px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <Auth handleClose={handleClose} creator={postItem?.name}/>
                    </div>
                </div>
            </Modal>
            {/*<div className="loginModal">*/}

            {/*</div>*/}
        </>
    );

}

export default Post;