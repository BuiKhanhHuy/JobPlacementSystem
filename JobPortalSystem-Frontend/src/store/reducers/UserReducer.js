import * as Types from "../types";
import cookie from "react-cookies";

const initState =
  cookie.load("current_user") !== undefined
    ? cookie.load("current_user")
    : null;

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.USER_LOGIN:
      return action.payload;
    case Types.USER_LOGOUT:
      return action.payload;
    case Types.USER_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
