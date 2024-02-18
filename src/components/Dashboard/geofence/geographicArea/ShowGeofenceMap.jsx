'use client'

import React, {useEffect, useRef, useState} from "react";

import osm from "../../../../helper/osm-providers";
import L from "leaflet";
import {Circle, FeatureGroup, MapContainer, Polygon, TileLayer, useMap} from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import {FormControl} from "@mui/material";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Control from "react-leaflet-custom-control";
import {useSelector} from "react-redux";
import {ChangePolygonFormat} from "@/helper/ChangePolygonFormat";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});



const RecenterAutomatically = ({selectedGeofence,selectedGroup}) => {
    const map = useMap();
    useEffect(() => {
        if(selectedGroup.length > 0){
            let bounds = []
            for(let group of selectedGroup){
                for(let geo of group.geoFenceIds){
                    let polygon =ChangePolygonFormat(geo.points)
                    bounds = [...bounds,polygon]
                }
            }
            console.log(bounds)
            map.fitBounds(bounds)
        }

        if(selectedGeofence.length > 0){
            let bounds = []
            for(let geo of selectedGeofence){
                let polygon =ChangePolygonFormat(geo.points)
                bounds = [...bounds,polygon]
            }
            console.log(bounds)
            map.fitBounds(bounds)
        }

    }, [selectedGeofence, selectedGroup]);
    return null;
}

export default function DrawGeofenceMap(props) {
    let edit = useRef();
    let mapRef = useRef();


    const [center, setCenter] = useState([29.120738496597934, 55.33779332882627]);
    const [radioValue, setRadioValue] = useState("satelliteMap")
    const handleChangeSatelliteMode = (e) =>{
        setRadioValue(e.target.value)
    }


    const selectedGeofence = useSelector((state)=> state.geofence.selectedGeofence)
    const selectedGroup = useSelector((state)=> state.geofence.selectedGroup)

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

    const ZOOM_LEVEL = 14;



    return (
        <>
            <div className="geofence-map-pc">
            <MapContainer key={new Date().getTime()} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                {
                    radioValue === "satelliteMap" ? (
                        <SatelliteMap/>
                    ) : (
                        <DefaultMap/>
                    )
                }
                <RecenterAutomatically selectedGroup={selectedGroup} selectedGeofence={selectedGeofence}/>
                <Control position={'bottomleft'}>
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={radioValue}
                                onChange={handleChangeSatelliteMode}
                            >
                                <FormControlLabel className="px-3 py-2 rounded bg-white bg-opacity-70" value="default" control={<Radio color="primary"/>} label="حالت پیش فرض" />
                                <FormControlLabel className="px-3 py-2 rounded bg-white bg-opacity-70" value="satelliteMap" control={<Radio color="primary"/>} label="حالت ماهواره" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Control>
                {
                    selectedGeofence?.map((geo)=>(
                        <>
                            {geo.fenceType === "CIRCLE" ? (
                                <Circle center={[geo.centerPoint.latitude, geo.centerPoint.longitude]} pathOptions={{fillColor: geo.color,color:geo.color}} radius={geo.radius}/>
                            ):(
                                <Polygon pathOptions={{fillColor: geo.color,color:geo.color}} positions={ChangePolygonFormat(geo.points)}/>
                            )}
                        </>
                    ))
                }
                {
                    selectedGroup?.map((group)=>(
                        group?.geoFenceIds?.map((geo)=>(
                            <>
                                {geo.fenceType === "CIRCLE" ? (
                                    <Circle center={[geo.centerPoint.latitude, geo.centerPoint.longitude]} pathOptions={{fillColor: geo.color,color:geo.color}} radius={geo.radius}/>
                                ):(
                                    <Polygon pathOptions={{fillColor: geo.color,color:geo.color}} positions={ChangePolygonFormat(geo.points)}/>
                                )}
                            </>
                        ))

                    ))
                }
            </MapContainer>
            </div>
        </>
    )
}