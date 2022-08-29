import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery,
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: `home/employees`,
        method: "GET",
      }),
    }),
    getFeedbacks: builder.query({
      query: (giverId) => ({
        url: `home/employees/${giverId}/feedbacks`,
        method: "GET",
      }),
    }),
    submitFeedback: builder.mutation({
      query: ({ id, body }) => ({
        url: `home/feedbacks/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export default homeApi;
