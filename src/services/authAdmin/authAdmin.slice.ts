import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthAdmin } from "../types";

export interface AuthAdminState {
  authAdmin: IAuthAdmin | null;
}

const initialState: AuthAdminState = {
  authAdmin: null,
};

export const authAdminSlice = createSlice({
  name: "authAdminSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuthAdmin: (state, action: PayloadAction<IAuthAdmin | null>) => {
      state.authAdmin = action.payload;
    },
    logout: () => initialState,
  },
});

export default authAdminSlice.reducer;
