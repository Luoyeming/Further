const authReducer = (state = {authData:null}, action) => {
    console.log(action)
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({...action?.res}));
            return {...state, authData:action?.res};
        case 'LOGOUT':
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;