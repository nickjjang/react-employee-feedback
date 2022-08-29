import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../app/store";
console.log(process.env);
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:8000/",
  prepareHeaders: (headers, { getState }) => {
    const admin = (getState() as RootState).authAdmin.authAdmin;
    if (admin) {
      headers.set("Authorization", `Bearer ${admin.token}`);
    }
    return headers;
  },
});

export default baseQuery;
