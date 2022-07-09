import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getCities = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["cities"]);

    dispatch({ type: Types.GET_CITIES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getCities