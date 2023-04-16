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