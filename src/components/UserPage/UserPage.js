import React,{useState, useEffect} from 'react';
import {useSelector} from "react-redux";
// import ReactDom from 'react-dom';
// import moment from "moment";
import {useDispatch} from "react-redux";
// import {deletePost,likePost} from "../../../actions/posts";
import {Link,useParams, useLocation, useHistory} from "react-router-dom";
import { PlusCircleOutlined, HeartFilled,HeartOutlined,EditOutlined,
    PictureOutlined, DatabaseOutlined, LineChartOutlined, DeleteOutlined,
    MinusCircleOutlined,ArrowDownOutlined} from '@ant-design/icons';
// import Auth from '../../Auth/Auth'
// // import Modal from '../Modal/Modal'
import {follow,collectionPic} from "../../actions/auth";
import {fetchPostsById, followUsers, fetchMyCollection, deletePost, fetchPostByPostId, downloadCount} from '../../api'

import {Avatar,Modal,message,  Button, Tabs, Row, Col, Spin, Popconfirm} from 'antd'
import './UserPage.css'
import Post from "../Posts/Post/Post";
import Masonry from "react-responsive-masonry";


const UserPage = () => {
    // const user = useSelector((state) => state?.auth?.authData?.result);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [post,setPost] = useState([])
    const [isMine,setIsMine] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(true);
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [followUser, setFollowUser] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false)
    const [myCollection, setMyCollection] = useState([])
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteMyPost = async(id) => {
        const res = await deletePost(id)
        console.log(res)
        if(res?.data?.code === 200){
            messageApi.open({
                type:'success',
                content: res?.data?.message,
            })
            setPost(post.filter((item)=>item._id !== id))
        }else{
            messageApi.open({
                type:'error',
                content: res?.data?.message,
            })
        }
    };
    const cancel = (e) => {

    };

    const downLoadFile = async(postId, userId) => {
        const res = await fetchPostByPostId(postId);
        downloadCount(userId)
        if(res?.data?.code === 200){
            let a = document.createElement('a')
            a.href = res?.data?.data?.selectFile
            a.download = 'picture'
            a.dispatchEvent(new MouseEvent('click'))
        }
    }

    const PostsList = () => {
        return <div>
            {!isLoading?<div style={{margin: '10px 70px'}}>
                    <Row gutter={[24, 12]}>
                        {post.map((item) => {
                                return <Col span={4} key={item._id}>
                                    {item.isPermit ?
                                        <div className="myPicture">
                                            <img src={item.selectFile} style={{width: '200px', height: '150px'}}/>
                                            <div className="deleteContent">
                                                <div className="likeIcon nodeCenter">
                                                    {item.likes.length}<HeartFilled style={{marginLeft:'10px',color:'#ff7875'}}/>
                                                </div>
                                                <Popconfirm
                                                    title="确定删除这张照片吗？"
                                                    description=""
                                                    onConfirm={()=>{deleteMyPost(item._id)}}
                                                    onCancel={cancel}
                                                    okText="确定"
                                                    cancelText="取消"
                                                >
                                                    <DeleteOutlined className="deleteIcon"/>
                                                </Popconfirm>
                                                <ArrowDownOutlined className="downLoadIcon" onClick={()=>{downLoadFile(item._id,item.creator)}}/>
                                            </div>
                                        </div> :
                                        <div style={{width: '200px', height: '150px'}}>
                                            <img src={item.selectFile} style={{width: '200px', height: '150px'}}/>
                                            <div style={{
                                                position: 'absolute',
                                                zIndex: 800,
                                                width: '200px',
                                                height: '150px',
                                                top: 0,
                                                backgroundColor: 'rgba(191,191,191,0.8)'
                                            }}>
                                                <div style={{
                                                    position: "absolute",
                                                    bottom: '10px',
                                                    left: '50%',
                                                    transform: 'translate(-50%,0%)',
                                                    color: 'white'
                                                }}>
                                                    审核中
                                                </div>
                                            </div>
                                        </div>}
                                </Col>
                            }
                        )}
                    </Row>
                </div>:<Spin size="large"/>}
                </div>
    }

    const goToUserPage = (id) =>{
        history.push(`/user/${id}`)
    }

    const deleteCollection = async(id) => {
        const res = await dispatch(collectionPic(user?.result?._id, id));
        if(res?.code === 200){
            messageApi.open({
                type:'success',
                content: res?.message,
            })
            setMyCollection(myCollection.filter((item)=>item._id !== id))
        }

    }
    const MyCollection = () => {
        return <div>
            {
                !isLoading?<div style={{margin: '10px 70px'}}>
                    <Row gutter={[24, 12]}>
                        {myCollection.map((item) => {
                                return <Col span={4} key={item._id}>
                                        <div className="myPicture">
                                            <img src={item.selectFile} style={{width: '200px', height: '150px'}}/>
                                            <div className="deleteContent">
                                                {/*<div className="likeIcon nodeCenter">*/}
                                                {/*    {item.likes.length}<HeartFilled style={{marginLeft:'10px',color:'#ff7875'}}/>*/}
                                                {/*</div>*/}
                                                <Popconfirm
                                                    title="确定取消收藏吗？"
                                                    description=""
                                                    onConfirm={()=> {deleteCollection(item._id)}}
                                                    onCancel={cancel}
                                                    okText="确定"
                                                    cancelText="取消"
                                                >
                                                    <DeleteOutlined className="deleteIcon"/>
                                                </Popconfirm>
                                                <ArrowDownOutlined className="downLoadIcon" onClick={()=>{downLoadFile(item._id,item.creator)}}/>
                                            </div>
                                        </div>
                                </Col>
                            }
                        )}
                    </Row>
                </div>:<Spin size="large"/>
            }
        </div>
    }

    const FollowList = () =>{
        return <div style={{margin: '10px 70px'}}>
            <Row gutter={[24,24]}>
            {
                followUser.map((item)=>{
                    return <Col span={3} key={item._id}>
                            <div style={{display:'flex',flexDirection:'column', alignItems:'center', cursor:'pointer'}} onClick={()=>{goToUserPage(item._id)}}>
                                <Avatar src={item?.imageUrl} size={64}/>
                                <div>{item?.name}</div>
                            </div>
                    </Col>
                })
            }
            </Row>
        </div>
    }

    const UserData = () => {
        
    }

    const items = [
        {
            key: '1',
            label: <div className="nodeCenter"><PictureOutlined />图片</div>,
            children: <PostsList/>,
        },
        {
            key: '2',
            label: <div className="nodeCenter"><DatabaseOutlined />收藏</div>,
            children: <MyCollection/>,
        },
        {
            key: '3',
            label: <div className="nodeCenter"><HeartOutlined />关注</div>,
            children: <FollowList/>,
        },
        {
            key: '4',
            label: <div className="nodeCenter"><LineChartOutlined />数据</div>,
            children: `Content of Tab Pane 4`,
        },
    ];
    const { id } = useParams();
    const loaction = useLocation()
    console.log(loaction)
    useEffect(async ()=>{
        setIsLoading(true)
        const resData = {isMine:false}
        if(user && id === user.result._id){
            resData.isMine = true;
            setIsMine(true);
            setUserName(user?.result.name)
            setUserImage(user?.result.imageUrl)
            const users = await followUsers({userId:user?.result?.follow})

            if(users?.data?.code === 200){
                setFollowUser(users?.data?.data)
            }
            const myCollection = await fetchMyCollection({id:user?.result?.myCollection})
            if(myCollection?.data?.code === 200){
                setMyCollection(myCollection?.data?.data)
            }
        }else{
            resData.isMine = false;
            if(user.result.follow.includes(id)) {
                setIsSubscribe(true)
            }else{
                setIsSubscribe(false)
            }
            setIsMine(false)
        }
        const res = await fetchPostsById(id,resData)
        console.log(res)
        if(res?.data?.code === 200){
            setPost(res?.data?.data)
            setUserName(res?.data?.data[0]?.name);
            setUserImage(res?.data?.data[0]?.creatorFile)
        }
        setIsLoading(false)
    },[loaction])

    const handleFollow = async() =>{
        const res = await follow(user.result._id, {userId:id})
        console.log(res)
        if(res?.code === 200){
            messageApi.open({
                type:'success',
                content: res?.message,
            })
            setIsSubscribe(!isSubscribe)
        }
    }

    return <div className="userContent">
        {contextHolder}
        <div style={{display:'flex', alignItems:'center', marginTop:'30px'}}>
            <Avatar size={160} src={userImage}/>
            <div style={{margin:'0px 20px', fontSize:'32px', fontWeight:'bold'}}>
                {userName}
            </div>
            {isMine?<Button className="nodeCenter"><EditOutlined/>修改名字</Button>:
                !isSubscribe?<Button className="nodeCenter" onClick={handleFollow}><PlusCircleOutlined />关注</Button>:
                    <button className="nodeCenter cancelSubscribe" onClick={handleFollow}><MinusCircleOutlined style={{marginRight:'7px'}}/>取消关注</button>
            }
        </div>
        {isMine?<Tabs defaultActiveKey="1" items={items} style={{width:'100%',fontSize:'32px'}}/>:!isLoading?<div style={{width:'calc(100% - 160px)',margin:'30px 80px'}}>
            <Masonry columnsCount={3} gutter="20px" className="">
                {post.map((item) =>
                        <Post post={item} key={item} />

                    )}
            </Masonry>
            </div>:<Spin size='large'/>
        }
    </div>
            
    
}
export default UserPage