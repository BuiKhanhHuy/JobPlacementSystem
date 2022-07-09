import * as Types from "../types";

const initState = { salaries: [] };

const SalaryReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_SALARIES:
      return { ...state, salaries: action.payload };
    default:
      return state;
  }
};

export default SalaryReducer;
