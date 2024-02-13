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
        setFenceType: (state, action) => {
            state.fenceType = action.payload
        },
        setCenterPoint: (state, action) => {
            state.centerPoint = action.payload
        },
        setRadius: (state, action) => {
            state.radius = action.payload
        },
        setPoints: (state, action) => {
            state.points = action.payload
        },
        resetStates:(state,action)=>{
            state.fenceType = ""
            state.centerPoint = ""
            state.radius = ""
            state.points = ""

        }
    },
})

export const { setSelectedGeofence,setMapStatus,setShapeColor,setFenceType,setCenterPoint,setRadius,setPoints,resetStates } = geofenceSlice.actions
export default geofenceSlice.reducer

