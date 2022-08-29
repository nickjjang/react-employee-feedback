import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authAdminApi from "../services/authAdmin/authAdmin.api";
import authAdminReducer from "../services/authAdmin/authAdmin.slice";
import employeesApi from "../services/employees/employees.api";
import employeesReducer from "../services/employees/employees.slice";
import homeApi from "../services/home/home.api";
import reviewsApi from "../services/reviews/reviews.api";

export const store = configureStore({
  reducer: {
    authAdmin: authAdminReducer,
    employees: employeesReducer,
    [authAdminApi.reducerPath]: authAdminApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authAdminApi.middleware,
      employeesApi.middleware,
      reviewsApi.middleware,
    ]),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
