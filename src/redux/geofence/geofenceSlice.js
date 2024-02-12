'use client'
import { createSlice } from "@reduxjs/toolkit"

const geofenceSlice = createSlice({
    name: 'geofence',
    initialState: {
        selectedGeofence:[],
        mapStatus:"show",
    },
    reducers: {
        setSelectedGeofence: (state, action) => {
            state.selectedGeofence = action.payload
        },
        setMapStatus: (state, action) => {
            state.mapStatus = action.payload
        },
    },
})

export const { setSelectedGeofence,setMapStatus } = geofenceSlice.actions
export default geofenceSlice.reducer

