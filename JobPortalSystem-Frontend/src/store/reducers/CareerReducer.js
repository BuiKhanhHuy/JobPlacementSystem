import * as Types from "../types";

const initState = {
  careers: [],
};

const CareerReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_CAREERS:
      return { ...state, careers: action.payload };
    default:
      return state;
  }
};

export default CareerReducer;

