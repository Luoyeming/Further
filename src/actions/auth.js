import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    // try{
        const {data} = await api.signIn(formData);
        return data
        // console.log(data)
        // return data
        // dispatch({type:'AUTH', data});
        // history.push('/');
    // }catch (e) {
    //     return e.message
    // }
}

export const signup = (formData, history) => async (dispatch) => {
    const {data} = await api.signUp(formData);
    return data
    // try{
    //     const {data} = await api.signUp(formData);
    //     dispatch({type:'AUTH', data});
    //     history.push('/');
    // }catch (e) {
    //     console.log(e);
    // }
}

export const follow = (id, userId) => async(dispatch) =>{
    const {data} = await api.follow(id,userId);
    console.log(data)
    if(data?.code === 200)
        dispatch({type:'AUTHUPDATE', data});
    return data
}

export const collectionPic = (id, pictureId) => async(dispatch) =>{
    const {data} = await api.collectionPic(id,{pictureId});
    console.log(data)
    if(data?.code === 200)
        dispatch({type:'AUTHUPDATE', data});
    return data
}