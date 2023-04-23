import React, {useState} from 'react';
// import Input from "./Input";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {signin, signup} from "../../actions/auth"
import ReactFileReader from "react-file-reader";
import Auth from "../Auth/Auth";
import './LoginAndSignup.css'
import {Form, Input, Upload, message,Button,Image} from 'antd'
import {PlusOutlined, LockOutlined} from '@ant-design/icons'

const initialState = {name:'',email:'',password:'',confirmPassword:''}

const LoginAndSignup = ({handleClose,creator}) => {
    return <div className="LoginAndSignupContent">
        <Auth/>
    </div>
}

export default LoginAndSignup