import * as Types from "../types";

const initState = { isOpen: false, typeAlert: "success", label: "" };

const AlertReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.OPEN_ALERT:
      return { isOpen: true, ...action.payload };
    case Types.CLOSE_ALERT:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default AlertReducer