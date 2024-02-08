'use client'
import {useGetAllGeofenceListQuery} from "@/redux/features/geofence/GeofenceSlice";
import {Circle, Polygon, useMap} from "react-leaflet";
import React from "react";

export default function AllGeofences(props) {

    const {
        data: geofenceList = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllGeofenceListQuery({ refetchOnMountOrArgChange: true });

    const changePolygonFormat = (pointArray) => {
        let points = []
        for (let location of pointArray) {
            let loc = []
            loc = [location.latitude, location.longitude]
            points.push(loc)
        }
        return points
    }

    return (
        <>
            {
                geofenceList.map((geo)=>(
                    <>
                        {geo.fenceType === "CIRCLE" ? (
                            <Circle center={[geo.centerPoint.latitude, geo.centerPoint.longitude]} pathOptions={{fillColor: 'blue'}} radius={geo.radius}/>
                        ):(
                            <Polygon pathOptions={{fillColor: 'blue'}} positions={changePolygonFormat(geo.points)}/>
                        )}
                    </>
                ))
            }
        </>
    )
}