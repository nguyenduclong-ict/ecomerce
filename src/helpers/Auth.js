import Axios from "axios";
import * as config from './config';
// 
export const getToken = () => {
    let token = localStorage.getItem('token');
    return token;
}

const saveToken = (token) => {
    localStorage.setItem('token', token);
}

// getHeader
export const getHeader = () => {
    if(!getToken()) return null;
    let header = {
        'Authorization' : 'Baerer ' + getToken()
    }
    return header;
}

// 
export const getAuthInfo = () => {
    let token = localStorage.getItem('token');
    if(!token) return null;
    let role = localStorage.getItem('role');
    let imgCode = localStorage.getItem('imgCode');
    return {token, role, imgCode};
}

// Login
export const login = (token, role, imgCode) => {
    saveToken(token);
    localStorage.setItem('role', role);
    localStorage.setItem('imgCode', imgCode);
}

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
}

// Get userinfo
export const getUserInfo = () => {
    if(!getToken()) return null;
    return Axios.get(config.userInfoUrl,{ headers : getHeader()});
}

// Get userinfo
export const checkTokenStatus = () => {
    if(!getToken()) return null;
    return Axios.get(config.checkTokenUrl,{ headers : getHeader()});
}