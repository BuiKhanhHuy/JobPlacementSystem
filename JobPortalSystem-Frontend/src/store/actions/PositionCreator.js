import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getPositions = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["positions"]);

    dispatch({ type: Types.GET_POSITIONS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getPositions