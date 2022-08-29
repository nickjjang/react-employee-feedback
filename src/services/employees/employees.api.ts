import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery,
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: `employees`,
        method: "GET",
      }),
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
        url: `employees`,
        method: "POST",
        body,
      }),
    }),
    updateEmployee: builder.mutation({
      query: ({ id, body }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export default employeesApi;
