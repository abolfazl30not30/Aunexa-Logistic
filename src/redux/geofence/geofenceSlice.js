'use client'
import { createSlice } from "@reduxjs/toolkit"

const geofenceSlice = createSlice({
    name: 'geofence',
    initialState: {
        selectedGeofence:[]
    },
    reducers: {
        setSelectedGeofence: (state, action) => {
            state.selectedGeofence = action.payload
        },
    },
})

export const { setSelectedGeofence } = geofenceSlice.actions
export default geofenceSlice.reducer

