import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getSalaries = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["salaries"]);

    dispatch({ type: Types.GET_SALARIES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getSalaries;
