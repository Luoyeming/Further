import React, {useState,useEffect} from 'react';
import ReactFileReader from "react-file-reader";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
import './style.css'
import {useHistory} from "react-router-dom";
const Form = ({currentId,setCurrentId,postData,setPostData}) => {
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [isImage,setIsImage] = useState(null);
    useEffect(() => {
        if(post) {
            setPostData(post);
            setIsImage(post.selectFile);
        }
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name:user?.result?.name}));
        }else{
            dispatch(createPost({...postData, name:user?.result?.name}));
        }
        clear();
        history.push('/');
    }
    const clear = () => {
        setCurrentId(null);
        setIsImage(null);
        setPostData({title:'',message:'',tags:'',selectFile:''});
    }
    const handleFiles = (files) => {
        setPostData({...postData,selectFile: files.base64});
        setIsImage(files.base64);
    }
    if(!user?.result?.name){
        return <h1>请登录</h1>
    }
    return (
        <div className="border-2 border-gray-400 rounded-2xl text-gray-900 text-xl container mx-auto w-72 p-8 mt-8">
            <form autoComplete="off" noValidate onSubmit={handleSubmit} className="space-y-6 grid grid-cols-1">
                <h2 className="text-center">{currentId ? '更新' : '发送'}动态</h2>
                <input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"
                       type="text" name="title" placeholder="标题" value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>
                <input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"
                       type="text" name="message" placeholder="内容" value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>
                <input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"
                       type="text" name="tags" placeholder="标签" value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>
                <ReactFileReader fileTypes={[".png",".jpg",".gif", "jpeg"]} value={postData.selectedFile} base64={true} multipleFiles={false} handleFiles={handleFiles}>
                    <div>
                        <i className="fa fa-photo cursor-pointer"></i>
                        {isImage && <span className="text-base text-gray-700">你已选择图片</span>}
                    </div>
                </ReactFileReader>
                <button type="submit" className="custom-btn btn-13">{!currentId ? '提交' : '更新'}</button>
                <button type="button" onClick={clear} className="custom-btn btn-5">清空</button>
            </form>
        </div>
    );
}

export default Form;