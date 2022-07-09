import * as Types from "../types";

const initState = {
  cities: [],
};

const CityReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_CITIES:
      return { ...state, cities: action.payload };
    default:
      return state;
  }
};

export default CityReducer;
