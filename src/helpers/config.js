const config = {};

config.apiUrl = "http://ecom.negoo.tech/api";
config.loginUrl = config.apiUrl + "/login";
config.registerUrl = config.apiUrl + "/register";
config.userInfoUrl =  config.apiUrl + "/token/info";
config.checkTokenUrl  =  config.apiUrl + "/token/status";

module.exports = config;