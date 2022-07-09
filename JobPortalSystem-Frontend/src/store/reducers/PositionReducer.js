import * as Types from "../types";

const initState = {
  positions: [],
};

const PositionReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_POSITIONS:
      return { ...state, positions: action.payload };
    default:
      return state;
  }
};

export default PositionReducer;
