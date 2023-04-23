import * as api from '../api';
export const getPosts = () => async (dispatch) => {

    try {
        const {data} = await api.fetchPosts();
        dispatch ({type:'FETCH_ALL',payload:data});
    }catch (e) {
        console.log(e.message);
    }
}
export const getPostByItem = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({type:'FETCH_ITEM',payload:data});
    }catch (e) {
        console.log(e.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    const {data} = await api.createPost(post);
    if(data.code === 209){
        dispatch({type:'CREATE', payload:data.data});
        return data
    }else{
        return data
    }


}

export const updatePost = (id,post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id,post);
        dispatch({type:'UPDATE', payload: data })
    }catch(e){
        console.log(e);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type:'DELETE',payload:id});
    }catch (e){
        console.log(e);
    }
}

export const likePost = (id) => async (dispatch) => {
    const {data} = await api.likePost(id);
    if(data.code !== 200){
        return data
    }
    dispatch({type:'UPDATE', payload: data })
    return data
}