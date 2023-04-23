import React,{useState, useEffect} from 'react';
import {useSelector} from "react-redux";
// import ReactDom from 'react-dom';
// import moment from "moment";
// import {Provider, useDispatch} from "react-redux";
// import {deletePost,likePost} from "../../../actions/posts";
import {Link,useParams, useLocation} from "react-router-dom";
import { PlusCircleOutlined, HeartFilled,HeartOutlined,EditOutlined,
    PictureOutlined, DatabaseOutlined, LineChartOutlined, DeleteOutlined,
    MinusCircleOutlined} from '@ant-design/icons';
// import Auth from '../../Auth/Auth'
// // import Modal from '../Modal/Modal'
import {fetchPostsById} from '../../api'
import {Avatar,Modal,message,  Button, Tabs, Row, Col, Spin} from 'antd'
import Navbar from "../Navbar/Navbar";
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

    const PostsList = () => {
        return <div>
            {post.length? isMine? <div style={{margin: '10px 70px'}}>
                    <Row gutter={[24, 12]}>
                        {post.map((item) => {
                                return <Col span={4}>
                                    {item.isPermit ?
                                        <div className="myPicture">
                                            <img src={item.selectFile} style={{width: '200px', height: '150px'}}/>
                                            <div className="deleteContent">
                                                <div className="likeIcon nodeCenter">
                                                    {item.likes.length}<HeartFilled style={{marginLeft:'10px',color:'#ff7875'}}/>
                                                </div>
                                                <DeleteOutlined className="deleteIcon"/>
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
                </div> : <div style={{margin:'0px 80px'}}><Masonry columnsCount={3} gutter="20px" className="">
                {post.map((item) =>
                        <Post post={item} key={item} />

                    )}
            </Masonry></div>:<Spin size="large"/>
            }
        </div>
    }

    const followList = () =>{
        return <div>
            
        </div>
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
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: <div className="nodeCenter"><HeartOutlined />关注</div>,
            children: `Content of Tab Pane 3`,
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
        const resData = {isMine:false}
        if(user && id === user.result._id){
            resData.isMine = true;
            setIsMine(true);
            setUserName(user?.result.name)
            setUserImage(user?.result.imageUrl)
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
        if(res?.data?.code === 200){
            setPost(res?.data?.data)
            setUserName(res?.data?.data[0].name);
            setUserImage(res?.data?.data[0].creatorFile)
        }
    },[loaction])



    return <div className="userContent">
        <div style={{display:'flex', alignItems:'center', marginTop:'30px'}}>
            <Avatar size={160} src={userImage}/>
            <div style={{margin:'0px 20px', fontSize:'32px', fontWeight:'bold'}}>
                {userName}
            </div>
            {isMine?<Button className="nodeCenter"><EditOutlined/>修改名字</Button>:
                !isSubscribe?<Button className="nodeCenter"><PlusCircleOutlined />关注</Button>:
                    <button className="nodeCenter cancelSubscribe"><MinusCircleOutlined style={{marginRight:'7px'}}/>取消关注</button>
            }
        </div>
        <Tabs defaultActiveKey="1" items={items} style={{width:'100%',fontSize:'32px'}}/>
    </div>
}
export default UserPage