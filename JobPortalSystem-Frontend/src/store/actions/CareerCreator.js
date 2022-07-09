import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getCareers = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["careers"]);

    dispatch({ type: Types.GET_CAREERS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getCareers;
