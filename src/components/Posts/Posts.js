import React from 'react';
import Post from "./Post/Post";
import {useSelector} from "react-redux";
import Masonry from 'react-responsive-masonry'
const Posts = ({setCurrentId,searchItem}) =>{

    const posts = useSelector((state) => state.posts);
    return (
        <div>
        {posts?<div className="mt-11 mx-28 justify-center items-center">
                    <Masonry columnsCount={3} gutter="20px" className="">
                        {!searchItem ? posts.map((post) =>
                            <Post post={post} key={post} setCurrentId={setCurrentId}/>) :
                            posts.filter((post) => post.name === searchItem).map((post) =>
                                <Post post={post} key={post} setCurrentId={setCurrentId}/>
                        )}
                    </Masonry>
                </div>:<div>

                    <h1>is loading</h1>
                </div>
        }
        </div>
    );

}

export default Posts;