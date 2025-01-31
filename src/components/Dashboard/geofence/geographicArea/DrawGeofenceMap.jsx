'use client'

import React, {useEffect, useRef, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";

import {useLazyGetAllSubOrganizationQuery,} from "@/redux/features/category/CategorySlice";
import osm from "../../../../helper/osm-providers";
import L from "leaflet";
import {FeatureGroup, MapContainer, TileLayer} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import {useSaveGeofenceMutation} from "@/redux/features/geofence/GeofenceSlice";
import {ConvertToNull} from "@/helper/ConvertToNull";
import {FormControl} from "@mui/material";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Control from "react-leaflet-custom-control";
import {useDispatch, useSelector} from "react-redux";
import {setCenterPoint, setFenceType, setPoints, setRadius} from "@/redux/geofence/geofenceSlice";

const styles = theme => ({
    radio: {
        '&$checked': {
            color: '#4D51DF'
        }
    },
    checked: {}
})

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

    let color = useSelector((state) => state.geofence.color);
    let mapStatus = useSelector((state) => state.geofence.mapStatus);

    const dispatch = useDispatch();

    const [center, setCenter] = useState([29.120738496597934, 55.33779332882627]);

    const [radioValue, setRadioValue] = useState("satelliteMap")
    const handleChangeSatelliteMode = (e) =>{
        setRadioValue(e.target.value)
    }

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

    let lastAddedPolygonID = null;
    let layerType = null;

    const removeAllEditControlLayers = () => {
            let layerContainer = edit.current,
                layers = layerContainer?._layers,
                layer_ids = Object.keys(layers),
                layer;
            layer_ids.forEach(id => {
                layer = layers[id]
                layerContainer.removeLayer(layer);
            })
            lastAddedPolygonID = null;
            layer_ids = null
    }

    const convertPolygon = (arr) => {
        let newArr = []
        for (let location of arr[0]) {
            let obj = {}
            obj = {
                latitude: (Math.round(location.lat * 1000000) / 1000000),
                longitude: (Math.round(location.lng * 1000000) / 1000000)
            }
            newArr.push(obj)
        }
        return newArr
    }

    const onCreated = (e) => {
        if (lastAddedPolygonID !== null) {
            if (e.sourceTarget._layers[lastAddedPolygonID]) {
                e.sourceTarget._layers[lastAddedPolygonID].remove();
            }
            lastAddedPolygonID = null
        }

        if (e.layerType === 'circle') {
            dispatch(setFenceType("CIRCLE"))

            let radius = e.layer.getRadius()

            dispatch(setRadius(Math.round(radius * 1000000) / 1000000))
            const location = e.layer.getLatLng()
            const locationObject = {
                latitude: (Math.round(location.lat * 1000000) / 1000000),
                longitude: (Math.round(location.lng * 1000000) / 1000000)
            }
            dispatch(setCenterPoint(locationObject))
        } else {
            dispatch(setFenceType("POLYGON"))
            const polygonArr = convertPolygon(e.layer.getLatLngs())
            dispatch(setPoints(polygonArr))
        }
        lastAddedPolygonID = e.layer._leaflet_id;
        layerType = e.layerType;
    }

    const OnEdited = (e) => {
        const layer = e.layers._layers[lastAddedPolygonID]
        if (layerType === 'circle') {
            dispatch(setFenceType("CIRCLE"))

            let radius = layer.getRadius()
            dispatch(setRadius(Math.round(radius * 1000000) / 1000000))
            const location = layer.getLatLng()
            const locationObject = {
                latitude: (Math.round(location.lat * 1000000) / 1000000),
                longitude: (Math.round(location.lng * 1000000) / 1000000)
            }
            dispatch(setCenterPoint(locationObject))
        } else {
            dispatch(setFenceType("POLYGON"))
            const polygonArr = convertPolygon(layer.getLatLngs())
            dispatch(setPoints(polygonArr))
        }
    }

    const onDelete = (e) => {
        lastAddedPolygonID = null;
        layerType = null;
        dispatch(setFenceType(""))
        dispatch(setPoints(""))
        dispatch(setRadius(""))
        dispatch(setCenterPoint(""))
    }


    return (
        <>
            <div className="geofence-map-pc">
            <MapContainer key={new Date().getTime()} center={center} zoom={ZOOM_LEVEL}>
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
                                onChange={handleChangeSatelliteMode}>
                                <FormControlLabel className="px-3 py-2 rounded bg-white bg-opacity-70" value="default" control={<Radio color="primary"/>} label="حالت پیش فرض" />
                                <FormControlLabel className="px-3 py-2 rounded bg-white bg-opacity-70" value="satelliteMap" control={<Radio color="primary"/>} label="حالت ماهواره" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Control>
                <FeatureGroup ref={edit}>
                    <EditControl
                        position="topright"
                        onCreated={onCreated}
                        onEdited={(e) => {
                            OnEdited(e)
                        }}
                        onDeleted={onDelete}
                        draw={
                            {
                                circle: {
                                    icon: new L.DivIcon({
                                        iconSize: new L.Point(10, 10),
                                        className: "leaflet-div-icon leaflet-editing-icon"
                                    }),
                                    shapeOptions: {
                                        guidelineDistance: 10,
                                        color: color,
                                        weight: 2
                                    }
                                },
                                polygon:{
                                    icon: new L.DivIcon({
                                        iconSize: new L.Point(10, 10),
                                        className: "leaflet-div-icon leaflet-editing-icon"
                                    }),
                                    shapeOptions: {
                                        guidelineDistance: 10,
                                        color: color,
                                        weight: 2
                                    }
                                },
                                rectangle: false,
                                circlemarker: false,
                                marker: false,
                                polyline: false,
                            }
                        }/>
                </FeatureGroup>
            </MapContainer>
            </div>
        </>
    )
}