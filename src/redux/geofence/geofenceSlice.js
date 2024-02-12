'use client'
import { createSlice } from "@reduxjs/toolkit"

const geofenceSlice = createSlice({
    name: 'geofence',
    initialState: {
        selectedGeofence:[],
        mapStatus:"show",
        fenceType: "",
        centerPoint: "",
        radius: "",
        points: "",
        color:"blue",
    },
    reducers: {
        setSelectedGeofence: (state, action) => {
            state.selectedGeofence = action.payload
        },
        setMapStatus: (state, action) => {
            state.mapStatus = action.payload
        },
        setShapeColor: (state, action) => {
            state.color = action.payload
        },
    },
})

export const { setSelectedGeofence,setMapStatus,setShapeColor } = geofenceSlice.actions
export default geofenceSlice.reducer

