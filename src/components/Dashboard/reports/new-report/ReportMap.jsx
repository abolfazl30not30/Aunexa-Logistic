'use client'

import {Circle, CircleMarker, MapContainer, Marker, Polygon, Polyline, TileLayer, useMap} from "react-leaflet";
import React, {useEffect, useState} from "react";
import osm from "@/helper/osm-providers";
import {iconCar} from '../../../../helper/icon';
import AllGeofences from "@/components/Dashboard/geofence/geographicArea/AllGeofences";
import {Button, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Control from "react-leaflet-custom-control";
import {FormControl} from "@mui/material";


const RecenterAutomatically = ({lat, lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

export default function ReportMap(props) {

    const [center, setCenter] = useState([29.120738496597934, 55.33779332882627]);

    const ZOOM_LEVEL = 15;
    const location = [
        {
            altitude: 1226,
            angle: 292,
            id: "6597fe44d4eb903333925d93",
            imei: "350424065730184",
            latitude: 29.121938496597934,
            longitude: 55.33259332882627,
            satellites: 12,
            speed: 8,
            timestamp: "1402/10/15 16:13:11"
        },
        {
            altitude: 1226,
            angle: 292,
            id: "6597fe44d4eb903333925d93",
            imei: "350424065730184",
            latitude: 29.120738496597934,
            longitude: 55.33779332882627,
            satellites: 12,
            speed: 8,
            timestamp: "1402/10/15 16:13:11"
        },
        {
            altitude: 1226,
            angle: 292,
            id: "6597fe44d4eb903333925d93",
            imei: "350424065730184",
            latitude: 29.120838496597934,
            longitude: 55.33209332882627,
            satellites: 12,
            speed: 8,
            timestamp: "1402/10/15 16:13:11"
        },
    ]
    const [locationArray, setLocationArray] = useState([]);
    const [locations ,setLocations] = useState([])

    const [radioValue, setRadioValue] = useState("default")
    const handleChangeSatelliteMode = (e) =>{
        setRadioValue(e.target.value)
    }

    useEffect(() => {
        if(props.locations.length){
            let updateArray = []
            for (let loc of props.locations){
                const newLoc = [loc.latitude,loc.longitude]
                updateArray.push(newLoc)
            }
            setLocationArray(updateArray)
            setLocations(props.locations)
            setCenter([props.locations[props.locations.length - 1].latitude,props.locations[props.locations.length - 1].longitude])
        }
    }, [props.locations]);

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
    return (
        <>
            <div className="report-map">
                <MapContainer center={center} zoom={ZOOM_LEVEL}>
                    {
                        radioValue === "satelliteMap" ? (
                            <SatelliteMap/>
                        ) : (
                            <DefaultMap/>
                        )
                    }
                    {
                        locationArray.length && (
                            <CircleMarker radius={8} center={locationArray[0]} fillColor="navy"/>
                        )
                    }
                    {
                        locationArray.length && (
                            <CircleMarker radius={8} center={locationArray[locationArray.length - 1]} fillColor="navy"/>
                        )
                    }
                    <Polyline pathOptions={{color: "blue"}} positions={locationArray}/>
                    <RecenterAutomatically lat={center[0]} lng={center[1]}/>
                    <AllGeofences/>
                    <Control position={'topmright'}>
                        <div>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={radioValue}
                                    onChange={handleChangeSatelliteMode}
                                >
                                    <FormControlLabel className="rounded bg-white bg-opacity-50" value="default" control={<Radio />} label="حالت پیش فرض" />
                                    <FormControlLabel className="rounded bg-white bg-opacity-50" value="satelliteMap" control={<Radio />} label="حالت ماهواره" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Control>
                </MapContainer>
            </div>
        </>
    )
}


