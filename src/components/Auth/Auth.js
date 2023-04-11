import React, {useState} from 'react';
// import Input from "./Input";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signin, signup} from "../../actions/auth"
import ReactFileReader from "react-file-reader";
import './style.css'
import {Form, Input, Upload, message,Image} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

const initialState = {name:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const [imagePreview,setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState()
    const dispatch = useDispatch();
    const history = useHistory();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (info) => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }
        console.log(info)


        getBase64(info.file.originFileObj, (url) => {
                // setLoading(false);
            setImageUrl(url);
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            setImagePreview(null);
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history))
        }
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            messageApi.open({
                type: 'error',
                content: '只能上传JPG/PNG文件!',
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            messageApi.open({
                type: 'error',
                content: '图片大小必须小于2MB!',
            });
        }
        return isJpgOrPng && isLt2M;
    };
    return (
        // <div className="container mx-auto mt-10 p-6  space-y-4 w-96">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div>
                <i className="fa fa-expeditedssl"></i>
                {isSignup ? '注册' : '登录'}
            </div>
            {/*<form className="space-y-6 justify-center items-center flex flex-col px-6 relative" onSubmit={handleSubmit}>*/}
            <Form layout={"vertical"}>
                {isSignup && <Form.Item label="用户名" name="name"><Input /></Form.Item>}
                <Form.Item label="邮箱" name="email"><Input /></Form.Item>
                <Form.Item label="密码" name="password"><Input.Password/></Form.Item>
                {isSignup && <Form.Item label="再次输入密码" name="confirmPassword"><Input.Password/></Form.Item>}
                {isSignup && <div style={{display:"flex",alignItems:"center"}}>
                    <span style={{width:'100px'}}>上传图片</span>
                        <Upload
                            // action={()=>{return  Promise.resolve()}}
                            listType={"picture-circle"}
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            style={{width:'70px',height:'70px'}}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '70px',height:'70px', borderRadius:'50%' }} /> : uploadButton}
                        </Upload>
                    </div>
                }
                <button type="submit" className="custom-btn btn-13">{isSignup ? '注册' : '登录'}</button>
                <button onClick={switchMode}>{isSignup ? '已经注册?登录' : '没有注册?注册'}</button>
            </Form>
        </div>
    )
};

export default Auth;