import React, {useEffect, useState} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginAndSignup from "./components/LoginAndSingup/LoginAndSignup";
import UploadImg from "./components/UploadImg/UploadImg";
import {useDispatch} from "react-redux";
import {getPosts} from "./actions/posts";
import Posts from "./components/Posts/Posts";
import UserPage from "./components/UserPage/UserPage";

const App = () => {
    const [currentId,setCurrentId] = useState(null);
    const [searchItem,setSearchItem] = useState();
    const [postData,setPostData] = useState({title:'',message:'',tags:'',selectFile:''})
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    },[currentId,dispatch,searchItem]);
    return(
        <BrowserRouter>
                <Navbar setCurrentId={setCurrentId} setSearchItem={setSearchItem} setPostData={setPostData}/>
                <Switch>
                    <Route exact path="/">
                        <Posts setCurrentId={setCurrentId} searchItem={searchItem}/>
                    </Route>
                    <Route exact path="/form">
                        <UploadImg currentId={currentId} setCurrentId={setCurrentId} postData={postData} setPostData={setPostData}/>
                    </Route>
                    <Route exact path="/auth" component={LoginAndSignup}/>
                    <Route exact path="/user/:id" component={UserPage}/>
                </Switch>
        </BrowserRouter>
    )
};

export default App;