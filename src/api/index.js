import axios from "axios";

const API = axios.create({baseURL:'http://192.168.1.6:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts',newPost);

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const fetchMyCollection = (data) => API.post('/posts/myCollection',data)

export const signIn = (formData) => API.post('/user/signin', formData);

export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchPostsById = (id,data) => API.post(`/posts/${id}/userPost`, data);

export const follow = (id,data) => API.post(`/user/follow/${id}`,data)

export const followUsers = (data) => API.post('/user/followUsers', data)

export const collectionPic = (id,data) => API.post(`/user/collection/${id}`,data)
