import React, {useState,useEffect} from 'react';
// import ReactFileReader from "react-file-reader";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
import {PictureOutlined, PlusOutlined, DeleteOutlined, ZoomInOutlined, CloseOutlined} from '@ant-design/icons'
import {Form, Upload, Modal, Switch, Button,message} from 'antd'
import './style.css'
import {useHistory} from "react-router-dom";
import watermark from "watermarkjs/lib";
import moment from "moment";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

// const UploadImg = ({currentId,setCurrentId,postData,setPostData}) => {
const UploadImg = ({uploadSuccess,handleUploadSuccess}) => {
    // const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();
    const [isImage,setIsImage] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [uploadImage, setUploadImage] = useState('');
    const [isPublish, setIsPublish] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    // const [uploadSuccess, setUploadSuccess] = useState(true)
    // useEffect(() => {
    //     if(post) {
    //         setPostData(post);
    //         setIsImage(post.selectFile);
    //     }
    // },[post])

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = (e) => {
        e.stopPropagation();
        setPreviewOpen(true);
    };
    const handleChange = async (e) => {
        let file = await getBase64(e.file.originFileObj);
        setUploadImage(file)
    };

    const handleSubmit = () => {
        let waterImg = null;
        watermark([uploadImage]).image(
            watermark.text.lowerRight(user?.result?.name, '48px Josefin Slab', '#fff', 0.5))
            .then(async function (img) {
                waterImg = img.src;
                const postData = {creator:user?.result?._id,
                    name:user?.result?.name,
                    isPublish,
                    selectFile:uploadImage,
                    waterImg,
                    isPermit:0,
                    creatorFile:user?.result?.imageUrl,
                    createdAt:moment().format('YYYY-MM-DD')
                }
                const res = await dispatch(createPost(postData));
                console.log(res)
                if(res?.code === 201){
                    handleUploadSuccess();
                }else{
                    messageApi.open({
                        type:'error',
                        content:'发布失败'
                    })
                }
            });

        // if(currentId){
        //     dispatch(updatePost(currentId, {...postData, name:user?.result?.name}));
        // }else{
        //     dispatch(createPost({...postData, name:user?.result?.name}));
        // }
        // clear();
        // history.push('/');

    }
    // const clear = () => {
    //     setCurrentId(null);
    //     setIsImage(null);
    //     setPostData({title:'',message:'',tags:'',selectFile:''});
    // }
    // const handleFiles = (files) => {
    //     setPostData({...postData,selectFile: files.base64});
    //     setIsImage(files.base64);
    // }
    // if(!user?.result?.name){
    //     return <h1>请登录</h1>
    // }

    const deleteImg = (e) => {
        e.stopPropagation();
        setUploadImage('');
    }

    const handleSwitch = (value) =>{
        if(value)
            setIsPublish(1)
        else
            setIsPublish(0)
    }

    const continueUpload = () =>{
        handleUploadSuccess()
        setUploadImage("")
    }
    return (
        <div>
            {contextHolder}
            {!uploadSuccess?<Form onFinish={handleSubmit}>
                {/*<h2 className="text-center">{currentId ? '更新' : '发送'}动态</h2>*/}
                {/*<input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"*/}
                {/*       type="text" name="title" placeholder="标题" value={postData.title} onChange={(e)=>setPostData({...postData,title: e.target.value})}/>*/}
                {/*<input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"*/}
                {/*       type="text" name="message" placeholder="内容" value={postData.message} onChange={(e)=>setPostData({...postData,message: e.target.value})}/>*/}
                {/*<input className="w-56 h-12 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl;"*/}
                {/*       type="text" name="tags" placeholder="标签" value={postData.tags} onChange={(e)=>setPostData({...postData,tags: e.target.value.split(',')})}/>*/}
                {/*<ReactFileReader fileTypes={[".png",".jpg",".gif", "jpeg"]} value={postData.selectedFile} base64={true} multipleFiles={false} handleFiles={handleFiles}>*/}
                {/*    <div>*/}
                {/*        <i className="fa fa-photo cursor-pointer"></i>*/}
                {/*        {isImage && <span className="text-base text-gray-700">你已选择图片</span>}*/}
                {/*    </div>*/}
                {/*</ReactFileReader>*/}
                {/*<button type="submit" className="custom-btn btn-13">{!currentId ? '提交' : '更新'}</button>*/}
                {/*<button type="button" onClick={clear} className="custom-btn btn-5">清空</button>*/}
                <Form.Item>
                    <Upload
                        onChange={handleChange}
                        onPreview={handlePreview}
                        // listType="picture-card"
                        // className="avatar-uploader"
                        showUploadList={false}
                        // style={{width:'400px',height:'280px'}}
                    >
                        <div className="uploadImgContent">
                            {uploadImage.length ?
                                <>
                                    <img src={uploadImage} style={{width: '100%', height: '100%'}}/>
                                    <div className="previewImg">
                                        <div style={{
                                            display: "flex",
                                            justifyContent: 'space-between',
                                            position: "absolute",
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            width: '70px'
                                        }}>
                                            <DeleteOutlined className="del-preV-icon" onClick={deleteImg}/>
                                            <ZoomInOutlined className="del-preV-icon" onClick={handlePreview}/>
                                        </div>
                                    </div>
                                </> : <>
                                    <PictureOutlined className="imageIcon"/>
                                    <div className="uploadButton">
                                        <PlusOutlined/>
                                    </div>
                                </>}
                        </div>
                    </Upload>
                    <Modal
                        open={previewOpen}
                        onCancel={handleCancel}
                        footer={null}
                        closeIcon={<div style={{
                            position: "absolute",
                            top: '-100px',
                            left: '-950px',
                            color: '#fafafa',
                            fontSize: '24px'
                        }}>
                            <CloseOutlined/>
                        </div>}
                        wrapClassName={"previewModal"}
                        width={800}
                    >
                        <img
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            src={uploadImage}
                        />
                    </Modal>
                </Form.Item>
                <Form.Item label={"是否公开"} name="isPublish">
                    <Switch defaultChecked className={"switchButton"} onChange={handleSwitch}/>
                </Form.Item>
                <Form.Item>
                    <button type="submit" className="custom-btn btn-13" style={{
                        width: '90px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>发布
                    </button>
                </Form.Item>
            </Form>:<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div className="tickContent" style={{marginTop:'30px'}}>
                    <svg width="150" height="150">
                        <polyline fill="none" stroke="#68E534" strokeWidth="14" points="33,80 65,106 114,51" strokeLinecap="round" strokeLinejoin="round" className="tick"/>
                    </svg>
                </div>
                <div style={{margin:'20px 0'}}>
                    图片已上传成功！请等待管理员审核
                </div>
                <div className="uploadSuccessFooter">
                    <button className="custom-btn btn-13" style={{width: '150px', height: '40px',}} onClick={continueUpload}>继续上传</button>
                    <Button style={{width: '150px', height: '40px',}}>我的主页</Button>
                </div>
            </div>}
        </div>
    );
}

export default UploadImg;