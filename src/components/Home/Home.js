import React, {useEffect, useState} from 'react';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";
import {BrowserRouter, Route} from "react-router-dom";

const Home = () => {
    const [currentId,setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    },[currentId,dispatch]);
    return (
        <div className="mx-32 justify-center items-center grid grid-cols-3">
            <Posts setCurrentId={setCurrentId}/>
            <Route path="/form"><Form currentId={currentId} setCurrentId={setCurrentId}/></Route>
        </div>
    );
}

export default Home;