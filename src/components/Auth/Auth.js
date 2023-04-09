import React, {useState} from 'react';
import Input from "./Input";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {signin, signup} from "../../actions/auth"
import ReactFileReader from "react-file-reader";

const initialState = {name:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const [imagePreview,setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

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

    return (
        <div className="container mx-auto mt-10 p-6  space-y-4 w-96">
            <div className="flex flex-col justify-center items-center text-2xl text-gray-900">
                <i className="fa fa-expeditedssl"></i>
                {isSignup ? '注册' : '登录'}
            </div>
            <form className="space-y-6 justify-center items-center flex flex-col px-6 relative" onSubmit={handleSubmit}>
                {isSignup && <Input name="name" label="name" handleChange={handleChange} autoFocus placeholder={"name"}/>}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" placeholder={"Email Address"}/>
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} placeholder={"Password"}/>
                {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" placeholder={"Repeat Password"}/>}
                {isSignup && <ReactFileReader fileTypes={[".png",".jpg",".gif", "jpeg"]} name="imageUrl" base64={true} multipleFiles={false} handleFiles={(files) => {
                    setFormData({...formData, imageUrl: files.base64});
                    setImagePreview(files.base64);
                } }>
                   {/* <i className="fa fa-photo flex"></i>*/}
                   <div>
                       <span className="text-gray-400 cursor-pointer">设置头像</span>
                        <div className={!imagePreview ? "flex rounded-full w-14 h-14 bg-cover hidden" : "flex rounded-full w-14 h-14 bg-cover"}>
                            <img src={imagePreview} className="rounded-full"/>
                        </div>
                   </div>
                </ReactFileReader>}
                <button type="submit" className="custom-btn btn-13">{isSignup ? '注册' : '登录'}</button>
                <button onClick={switchMode}>{isSignup ? '已经注册?登录' : '没有注册?注册'}</button>
            </form>
        </div>
    )
};

export default Auth;