const authReducer = (state = {authData:null}, action) => {
    console.log(action)
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({...action?.res}));
            return {...state, authData:action?.res};
        case 'LOGOUT':
            localStorage.clear();
            return {...state, authData: null};
        case 'AUTHUPDATE':
            let local = localStorage.getItem('profile');
            console.log(action.data)
            localStorage.setItem('profile',JSON.stringify({...JSON.parse(local), result:action.data.data}));
            return {...state, authData:action.data.data}
        default:
            return state;
    }
};

export default authReducer;