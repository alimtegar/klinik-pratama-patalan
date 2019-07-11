import React, { useReducer } from 'react';

// Contexts
import { AuthContext } from './contexts';

// Reducers
import { AuthReducer } from './reducers';

const ContextsProvider = (props) => {
    const [auth, dispatchAuth] = useReducer(AuthReducer, {
        user: {
            id: 0,
            name: '',
            email: '',
            role: '',
        },
        api_token: '',
    });

    const setAuth = (data) => {
        dispatchAuth({
            type: 'SET_AUTH',
            payload: data,
        });
    };

    const removeAuth = () => {
        dispatchAuth({
            type: 'REMOVE_AUTH',
        });
    };
    
    return (
        <AuthContext.Provider
            value={{
                ...auth,
                setAuth: setAuth,
                removeAuth: removeAuth,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default ContextsProvider;