import {createContext} from 'react';

export const AuthContext = createContext({
    user: null,
    api_token: '',
    login: () => {},
    register: () => {},
});