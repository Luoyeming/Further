import React, {useState} from 'react';

const Input = ({name,handleChange,handleShowPassword,label,autoFocus,type}) => {
    const [isShowEye, setShowEye] = useState(false);
    const inputDetail = (label) =>{
        switch (label){
            case 'name':
                return '请输入用户名';
            case 'Email Address':
                return '请输入邮箱地址';
            case 'Password':
                return '请输入密码';
            case 'Repeat Password':
                return '请再次输入密码';
        }
    }
    const handleShowEye = () => {
        if(name === 'password') setShowEye((prevShowEye) => !prevShowEye);
    };
    return (
        <div className="relative">
                <input
                    name={name}
                    onChange={handleChange}
                    required
                    label={label}
                    autoFocus={autoFocus}
                    placeholder={inputDetail(label)}
                    type={type}
                    onFocus={handleShowEye}
                    className="w-80 h-14 border relative border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent focus:round-xl"

                />
            {isShowEye ? <div className="absolute left-72 bottom-5">
                {name === 'password' && <button onClick={handleShowPassword} type="button">
                    {type === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                </button>}
            </div>:null}
        </div>
    );
};

export default Input;