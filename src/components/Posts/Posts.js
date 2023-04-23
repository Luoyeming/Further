import React from 'react';
import Post from "./Post/Post";
import {useSelector} from "react-redux";
import Masonry from 'react-responsive-masonry'
import {Spin} from 'antd'
import './style.css'

const Posts = ({setCurrentId,searchItem}) =>{

    const posts = useSelector((state) => state.posts);
    // const posts = []
    // console.log(posts);
    // console.log(styles)
    return (
        <>
        {posts?.length?<div style={{padding:'10px 80px', position:'relative', top:'110px', backgroundColor:'#fafafa'}}>
                    <Masonry columnsCount={3} gutter="20px" className="">
                        {!searchItem ? posts.map((post) =>
                            <Post post={post} key={post} setCurrentId={setCurrentId}/>) :
                            posts.filter((post) => post.name === searchItem).map((post) =>
                                <Post post={post} key={post} setCurrentId={setCurrentId}/>
                        )}
                    </Masonry>
                </div>:<div className="loading">
                    <Spin tip="加载中" size="large"/>
                </div>
        }
        </>
    );

}

export default Posts;