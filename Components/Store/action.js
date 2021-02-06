export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const LoginUser = userdata =>{
    return {
        type: LOGIN_USER,
        payload: userdata
    }
};

export const LogoutUser = () =>{
    return {
        type: LOGOUT_USER,

    }
};