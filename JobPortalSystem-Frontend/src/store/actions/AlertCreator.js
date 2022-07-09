import * as Types from "../types";

const alertOpen = (typeAlert = "success", label = "Không có tin nhắn") => {
  return {
    type: Types.OPEN_ALERT,
    payload: {
      typeAlert: typeAlert,
      label: label,
    },
  };
};

const alertClose = () => {
  return { type: Types.CLOSE_ALERT };
};

export default alertOpen;
export { alertClose };
