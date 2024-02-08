'use client'
import { configureStore } from "@reduxjs/toolkit"
import {loginSlice} from "@/redux/api/loginSlice";
import authReducer from "@/redux/api/authSlice";
import accessReducer from "@/redux/permission/accessSlice";
import { apiSlice } from '../redux/api/apiSlice';
import { apiAuthServerSlice} from "@/redux/api/apiAuthServerSlice";
import {getAccessSlice} from "@/redux/features/access/getAccessSlice";

export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer,
        [getAccessSlice.reducerPath] : getAccessSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [apiAuthServerSlice.reducerPath]: apiAuthServerSlice.reducer,
        auth:authReducer,
        access:accessReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,loginSlice.middleware,getAccessSlice.middleware,apiAuthServerSlice.middleware)
})