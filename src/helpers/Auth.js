import Axios from "axios";
import config from "./config";
const appName = config.appName;
export const getToken = () => {
  let token = localStorage.getItem(appName + "token");
  return token;
};

const saveToken = token => {
  localStorage.setItem(appName  + "token", token);
};

// getHeader
export const getHeader = () => {
  if (!getToken()) return null;
  let header = {
    Authorization: "Baerer " + getToken()
  };
  return header;
};

//
export const getAuthInfo = () => {
  let token = localStorage.getItem(appName + "token");
  if (!token) return null;
  let role = localStorage.getItem(appName + "role");
  let imgCode = localStorage.getItem(appName + "imgCode");
  return { token, role, imgCode };
};

// Login
export const login = (token, role, imgCode) => {
  saveToken(token);
  localStorage.setItem(appName + "role", role);
  localStorage.setItem(appName + "imgCode", imgCode);
};

// Logout
export const logout = () => {
  localStorage.removeItem(appName + "token");
  localStorage.removeItem(appName + "userType");
  return true;
};

// Get userinfo
export const getUserInfo = () => {
  return Axios.get(config.userInfoUrl, { headers: getHeader() });
};

// Get userinfo
export const checkTokenStatus = () => {
  const options = {
    headers: getHeader()
  };
  console.log(options);
  return Axios.get(config.checkTokenUrl, options);
};
