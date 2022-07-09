import * as Types from "../types";

const initState = { workingForms: [] };

const WorkingFormReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_WORKING_FORMS:
      return { ...state, workingForms: action.payload };
    default:
      return state;
  }
};

export default WorkingFormReducer;
