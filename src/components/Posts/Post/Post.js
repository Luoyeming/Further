import React from 'react';
import moment from "moment";
import {useDispatch} from "react-redux";
import {deletePost,likePost} from "../../../actions/posts";
import {Link} from "react-router-dom";

const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = () => {
        if(post.likes.length > 0){
            return post.likes.find((like) => like === (user?.result?._id))
                ?(
                    <>
                        <i className="fa fa-thumbs-o-up fa-lg"></i>
                        {post.likes.length > 2 ? `you and ${post.likes.length-1}other`:`${post.likes.length} like${post.likes.length>1?'s':''}`}
                    </>
                ):(
                    <>
                        <i className="fa fa-thumbs-o-up fa-lg"></i>
                        {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                )
        }
        return <><i className="fa fa-thumbs-o-up fa-lg"></i>Like</>
    }
    return (
        <div className={post?"w-full block relative shadow-inner":"w-full block relative loading"}>
            <img src={`${post.selectFile}`} className="rounded-t-2xl"/>
            <div className="absolute left-2 top-2 text-xl text-gray-900">
                <h1>{moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h1>
                <h1>{post.name}</h1>
            </div>
            {(user?.result?._id === post?.creator) &&(
                <Link to="/form"><button className=" absolute right-2 top-2" onClick={() => setCurrentId(post._id)}><i className="fa fa-ellipsis-h fa-2x text-gray-200"></i></button></Link>
/*
                <button className=" absolute right-2 top-2" onClick={() => setCurrentId(post._id)}><i className="fa fa-ellipsis-h fa-2x text-gray-200"></i></button>
*/

                )}
            <div className="bg-gray-100 rounded-b-2xl">
                <p className="p-2  text-gray-700">{post.tags.map((tag) => `#${tag}`)}</p>
                <h1 className="p-1 text-2xl text-gray-900">{post.title}</h1>
                <p className="p-2 text-xl text-gray-900 description">{post.message}</p>
                <div className="px-3 text-gray-900 pb-2">
                    <button className="text-base" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                       <Likes/>
                    </button>
                    {(user?.result?._id === post?.creator) &&(
                    <button className="float-right text-base" onClick={() => dispatch(deletePost(post._id))}><i className="fa fa-close fa-lg"></i>删除</button>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Post;