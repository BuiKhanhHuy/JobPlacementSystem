import { authApi, endpoints } from "../../configs/Api";
import * as Types from "../types";
import cookie from "react-cookies";

const updateUser = () => async (dispatch) => {
  try {
    if (cookie.load("access_token")) {
      const res = await authApi().get(endpoints["current-user"]);
      if (res.status === 200) {
        cookie.save("current_user", res.data);
        dispatch({ type: Types.USER_LOGIN, payload: res.data });
      } else {
        cookie.remove("access_token");
        cookie.remove("current_user");
        dispatch({ type: Types.USER_UPDATE, payload: null });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const logoutUser = (payload = null) => {
  return { type: Types.USER_LOGOUT, payload: payload };
};

// const loginUser = (payload = null) => {
//   return { type: Types.USER_UPDATE, payload: payload };
// };

export { logoutUser, updateUser };
