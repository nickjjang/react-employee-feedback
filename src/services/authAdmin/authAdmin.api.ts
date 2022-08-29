import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { authAdminSlice } from "./authAdmin.slice";

export const authAdminApi = createApi({
  reducerPath: "authAdminApi",
  baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (body) => ({
        url: `auth-admins/signin`,
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authAdminSlice.actions.setAuthAdmin(data));
        } catch (error) {}
      },
    }),
  }),
});

export default authAdminApi;
