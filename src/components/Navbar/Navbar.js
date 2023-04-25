import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import UploadImg from '../UploadImg/UploadImg'
import {Modal} from 'antd'
import decode from "jwt-decode";
import './style.css';
import SvgIcon from './SvgIcon'
const Navbar = ({setSearchItem,setPostData,setCurrentId}) => {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [showUpload, setShowUpload] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const users = useSelector((state) => state?.auth?.authData?.result);

    const dispatch = useDispatch();

    const history = useHistory();

    const location = useLocation();

    const handleUploadSuccess = () =>{
        setUploadSuccess(!uploadSuccess)
    }

    const logout = () => {
        dispatch({type:'LOGOUT'});
        history.push('/');
        setUser(null);
    };

    const handleSearch = (event) => {
        const {target,keyCode} = event;
        if(keyCode !== 13) return;
        if(target.value.trim() === '') return;
        setSearchItem(target.value);
        target.value='';
    }

    const handleUpload = () =>{
        setShowUpload(true)
    }

    const cancelUpload = () =>{
        setShowUpload(false);
        setUploadSuccess(false)
    }

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location,users]);

    return (
        <div className="navContent">
            <Link className="grid grid-col-2" to="/" onClick={()=> {
                setSearchItem(null);
                setCurrentId(null);
                setPostData({title:'',message:'',tags:'',selectFile:''});
            }}>
                <SvgIcon/>
                <div className="absolute top-8 left-48">
                    <span style={{fontFamily: 'Lobster'}} className="text-3xl block">Further</span>
                    <span className="block text-base text-gray-700">分享美好生活</span>
                </div>
            </Link>
            {/*<div className="pt-10">*/}
            {/*    <i className="fa fa-search bottom-0 "></i>*/}
            {/*    <input type="text" onKeyUp={handleSearch} className="h-8 w-72 bg-gray-200 border-b-2 relative border-gray-900 border-transparent focus:border-b-2 focus:outline-none focus:border-transparent focus:border-gray-900"/>*/}
            {/*</div>*/}
            {/*{!user && (<div></div>)}*/}
                {user ?(
                    <div className="pt-3 col-span-2">
                        <div className="grid grid-cols-3 gap-x-4">
                            <Link className="pl-32 flex justify-center items-center flex-col" to={`/user/${user?.result?._id}`}>
                                <div className="flex rounded-full w-14 h-14 bg-cover">
                                    <img src={user?.result?.imageUrl} className="rounded-full"/>
                                </div>
                                <div>
                                    <div>{user?.result?.name}</div>
                                </div>
                            </Link>
                            <button className="custom-btn btn-13 w-24 mt-4 ml-14" onClick={handleUpload}>发布</button>
                            <button onClick={logout} className="custom-btn btn-5 w-24 mt-4 ml-8">登出</button>
                        </div>
                        <Modal open={showUpload} onCancel={cancelUpload} title={uploadSuccess?"":"请选择图片上传"} width={450} footer={null} destroyOnClose={true}>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                <UploadImg handleUploadSuccess={handleUploadSuccess} uploadSuccess={uploadSuccess}/>
                            </div>
                        </Modal>
                    </div>
                    ):(
                    <div className="pt-7 pl-40">
                        <Link to="/auth"><button className="custom-btn btn-13">登录</button></Link>
                    </div>
                    )}
        </div>
    );
}

export default Navbar;