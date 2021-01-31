export const LOGIN_USER = "LOGIN_USER";
export const LoginUser = userdata =>{
    return {
        type: LOGIN_USER,
        payload: userdata
    }
};