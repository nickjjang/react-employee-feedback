import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery,
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `reviews`,
        method: "GET",
      }),
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `reviews`,
        method: "POST",
        body,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `reviews/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
    }),
    assignFeedback: builder.mutation({
      query: (body) => ({
        url: "feedbacks",
        method: "POST",
        body,
      }),
    }),
  }),
});

export default reviewsApi;
