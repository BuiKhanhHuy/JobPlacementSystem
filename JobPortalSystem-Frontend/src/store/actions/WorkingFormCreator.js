import Api, { endpoints } from "../../configs/Api";
import * as Types from "../types";

const getWorkingForms = () => async (dispatch) => {
  try {
    const res = await Api.get(endpoints["working-forms"]);

    dispatch({ type: Types.GET_WORKING_FORMS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export default getWorkingForms;
