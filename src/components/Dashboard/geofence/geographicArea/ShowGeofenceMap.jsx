'use client'

import React, {useEffect, useRef, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import "react-multi-date-picker/styles/colors/red.css"
import {useLazyGetAllSubOrganizationQuery,} from "@/redux/features/category/CategorySlice";
import osm from "../../../../helper/osm-providers";
import L from "leaflet";
import {Circle, FeatureGroup, MapContainer, Polygon, TileLayer} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import {useGetAllGeofenceListQuery, useSaveGeofenceMutation} from "@/redux/features/geofence/GeofenceSlice";
import {ConvertToNull} from "@/helper/ConvertToNull";
import {FormControl} from "@mui/material";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Control from "react-leaflet-custom-control";
import {useSelector} from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


export default function DrawGeofenceMap(props) {
    const [center, setCenter] = useState([29.120738496597934, 55.33779332882627]);
    const [radioValue, setRadioValue] = useState("default")
    const handleChangeSatelliteMode = (e) =>{
        setRadioValue(e.target.value)
    }
    const {
        data: geofenceList = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllGeofenceListQuery({ refetchOnMountOrArgChange: true });
    const selectedGeofence = useSelector((state)=> state.geofence.selectedGeofence)
    const SatelliteMap = () =>{
        return<TileLayer
            url={ osm.googleSat.url}
            attribution={osm.googleSat.attribution}
            maxZoom={osm.googleSat.maxZoom }
            subdomains={ osm.googleSat.subdomains}
        />
    }

    const DefaultMap = () =>{
        return <TileLayer
            url={ osm.maptiler.url}
            attribution={osm.maptiler.attribution}/>

    }

    let edit = useRef();

    const ZOOM_LEVEL = 14;

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
            <div className="geofence-map-pc">
            <MapContainer center={center} zoom={ZOOM_LEVEL}>
                {
                    radioValue === "satelliteMap" ? (
                        <SatelliteMap/>
                    ) : (
                        <DefaultMap/>
                    )
                }
                <Control position={'bottomleft'}>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={radioValue}
                                onChange={handleChangeSatelliteMode}
                            >
                                <FormControlLabel className="rounded bg-white bg-opacity-70" value="default" control={<Radio />} label="حالت پیش فرض" />
                                <FormControlLabel className="rounded bg-white bg-opacity-70" value="satelliteMap" control={<Radio />} label="حالت ماهواره" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Control>
                {
                    selectedGeofence?.map((geo)=>(
                        <>
                            {geo.fenceType === "CIRCLE" ? (
                                <Circle center={[geo.centerPoint.latitude, geo.centerPoint.longitude]} pathOptions={{fillColor: 'blue'}} radius={geo.radius}/>
                            ):(
                                <Polygon pathOptions={{fillColor: 'blue'}} positions={changePolygonFormat(geo.points)}/>
                            )}
                        </>
                    ))
                }
            </MapContainer>
            </div>
        </>
    )
}