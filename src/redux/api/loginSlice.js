"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

let base64encodedData = Buffer.from(
  "client1" + ":" + "myClientSecretValue"
).toString("base64");

const baseQuery = fetchBaseQuery({
  baseUrl: "https://auth.aunexa.net",
  prepareHeaders: (headers) => {
    headers.set("Authorization", "Basic " + base64encodedData);
    return headers;
  },
});

export const loginSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/oauth2/token",
        method: "POST",
        body: new URLSearchParams(credentials),
      }),
    }),
  }),
});

export const { useLoginMutation } = loginSlice;
