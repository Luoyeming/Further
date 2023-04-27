import React, {useState} from 'react';
// import Input from "./Input";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {signin, signup} from "../../actions/auth"
import ReactFileReader from "react-file-reader";
import './style.css'
import {Form, Input, Upload, message,Button,Image} from 'antd'
import {PlusOutlined, LockOutlined} from '@ant-design/icons'

const initialState = {name:'',email:'',password:'',confirmPassword:''}

const Auth = ({handleClose,creator,modalState}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const [imagePreview,setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    // const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const location = useLocation();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const handleChange = (info) => {
        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }


        getBase64(info.file.originFileObj, (url) => {
                // setLoading(false);
            setImageUrl(url);
        });

    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log(e)
        if(isSignup){
            const res = await dispatch(signup({...e, imageUrl},history))
            // console.log(res)
            if(res?.code !== 200){
                messageApi.open({
                    type:'error',
                    content: res?.message,
                })
            }else{
                messageApi.open({
                    type:'success',
                    content: '注册成功',
                })
                setTimeout(()=>{
                    dispatch({type:'AUTH', res});
                    if(location.pathname === '/')
                        handleClose();
                    else
                        history.push('/')
                },500)
            }
            // dispatch(signup({...e, imageUrl},history));
        }else{
            // console.log(location)
            const res = await dispatch(signin(e,history))
            if(res?.code !== 200){
                messageApi.open({
                    type:'error',
                    content: res?.message,
                })
            }else{
                messageApi.open({
                    type:'success',
                    content: '登录成功',
                })
                setTimeout(()=>{
                    dispatch({type:'AUTH', res});
                    if(location.pathname === '/')
                        handleClose();
                    else
                        history.push('/')
                },500)
            }
        }
        // handleClose();
    }

    const switchMode = () => {
        form.resetFields()
        setIsSignup((prevIsSignup) => !prevIsSignup);
        // setShowPassword(false);
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
            {contextHolder}
            <div style={{display:"flex",justifyContent:"center",alignItems:"center", fontSize:'32px'}}>
                <LockOutlined />
                {isSignup ? '注册' : '登录'}
            </div>
            {creator?<div style={{margin:'7px 0px'}}>想{modalState}{creator}的图片？请{isSignup ? '注册' : '登录'}</div>:<></>}
            {/*<form className="space-y-6 justify-center items-center flex flex-col px-6 relative" onSubmit={handleSubmit}>*/}
            <Form layout={"vertical"}  onFinish={handleSubmit} form={form}>
                {isSignup && <Form.Item label="用户名" name="name" rules={[{ required: true,message:'请输入用户名' }]}><Input /></Form.Item>}
                <Form.Item label="邮箱" name="email" rules={[{ required: true,message:'请输入邮箱' }]}><Input /></Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true,message:'请输入密码' }]}
                >
                    <Input.Password/>
                </Form.Item>
                {isSignup && <Form.Item
                    label="再次输入密码"
                    name="confirmPassword"
                    rules={[{ required: true,message:'请再次输入密码' },({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                        return Promise.reject(new Error('密码不相同'));
                    },
                    }),]}
                >
                    <Input.Password/>
                </Form.Item>}
                {isSignup && <div style={{display:"flex",alignItems:"center" }}>
                    <span style={{width:'100px'}}>上传图片</span>
                        <Upload
                            // action={()=>{return  Promise.resolve()}}
                            listType={"picture-circle"}
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            style={{width:'70px!important',height:'70px!important'}}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '70px',height:'70px', borderRadius:'50%' }} /> : uploadButton}
                        </Upload>
                    </div>
                }
                    <button  className="custom-btn btn-13" type={"submit"}>{isSignup ? '注册' : '登录'}</button>
                <Button type="link" onClick={switchMode} style={{color:'black',border:'none',backgroundColor:'transparent'}}>{isSignup ? '已经注册?登录' : '没有注册?注册'}</Button>
            </Form>
        </div>
    )
};

export default Auth;