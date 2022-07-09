import * as Types from "../types";

const initState = {
  experiences: [],
};

const ExperienceReducer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_EXPERIENCES:
      return { ...state, experiences: action.payload };
    default:
      return state;
  }
};

export default ExperienceReducer;
