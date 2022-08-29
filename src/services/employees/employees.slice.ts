import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../types";

export interface AuthAdminState {
  employee: IEmployee | null;
}

const initialState: AuthAdminState = {
  employee: null,
};

export const employeesSlice = createSlice({
  name: "employeeSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setEmployee: (state, action: PayloadAction<IEmployee | null>) => {
      state.employee = action.payload;
    },
  },
});

export default employeesSlice.reducer;
