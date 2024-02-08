'use client'
import { createSlice } from "@reduxjs/toolkit"

const accessSlice = createSlice({
    name: 'access',
    initialState: {
        pages:[]

    },
    reducers: {
        setAccess: (state, action) => {
            state.pages = action.payload
        },
    },
})

export const { setAccess } = accessSlice.actions
export default accessSlice.reducer

