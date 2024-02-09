"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setAccessToken } from "./authSlice";
import axios from "axios";



const baseQuery = fetchBaseQuery({
  baseUrl: "https://auth.aunexa.net/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const login = async () => {
  let base64encodedData = Buffer.from(
    "client1" + ":" + "myClientSecretValue"
  ).toString("base64");
  const formData = {
    client_id: "client1",
    refresh_token: window.sessionStorage.getItem("refresh_token"),
    grant_type: "refresh_token",
  };

  return await axios.post("https://auth.aunexa.net/oauth2/token", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64encodedData,
    },
  });
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 500) {
    const refreshResult = await login();
    api.dispatch(setAccessToken(refreshResult?.data?.access_token));
    if (refreshResult?.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiAuthServerSlice = createApi({
  reducerPath: "apiAuth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["role", "access", "code"],
  endpoints: (builder) => ({}),
});
