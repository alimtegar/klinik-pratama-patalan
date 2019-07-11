const setAuth = (data, state) => {
    localStorage.setItem('auth', JSON.stringify(data));

    return {
        ...state,
        ...data,
    };
}

const removeAuth = (state) => {
    localStorage.removeItem('auth');

    return {
        ...state,
        user: {
            id: 0,
            name: '',
            email: '',
            role: '',
        },
        api_token: '',
    }
};

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return setAuth(action.payload, state);
        case 'REMOVE_AUTH':
            return removeAuth(state);
        default:
            return state;
    }
};