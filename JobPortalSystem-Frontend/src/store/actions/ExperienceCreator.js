import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getExperiences = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["experiences"]);

    dispatch({ type: Types.GET_EXPERIENCES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getExperiences;
