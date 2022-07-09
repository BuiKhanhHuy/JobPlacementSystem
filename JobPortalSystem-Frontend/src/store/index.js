import { configureStore } from "@reduxjs/toolkit";
import CityReducer from "./reducers/CityReducer";
import CareerReducer from "./reducers/CareerReducer";
import PositionReducer from "./reducers/PositionReducer";
import SalaryReducer from "./reducers/SalaryReducer";
import ExperienceReducer from "./reducers/ExperienceReducer";
import WorkingFormsReducer from "./reducers/WorkingFormReducer";
import AlertReducer from "./reducers/AlertReducer";

import UserReducer from "./reducers/UserReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
    cities: CityReducer,
    careers: CareerReducer,
    positions: PositionReducer,
    salaries: SalaryReducer,
    experiences: ExperienceReducer,
    workingForms: WorkingFormsReducer,
    alert: AlertReducer,
  },
});

export default store;
