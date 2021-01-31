import { LOGIN_USER} from "./action";
import {combineReducers} from 'redux';

const LoginUser = (state = {}, action) => {
  if (action.type == LOGIN_USER) {
    return { ...state, ...action.payload };
  }

  return state;
};


const reducer = combineReducers({
  user: LoginUser,
});
export default reducer;