'use client'

import {FeatureGroup, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import React, {useEffect} from "react";
import {EditControl} from "react-leaflet-draw";
import osm from "@/helper/osm-providers";
import {useState} from "react";
import {  iconCar  } from '../../../helper/icon';
import AllGeofences from "@/components/Dashboard/geofence/geographicArea/AllGeofences";
import Control from 'react-leaflet-custom-control'
import {Button, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {FormControl} from "@mui/material";

const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
}

export default function TrackingMap(props) {

    const [center, setCenter] = useState([29.120738496597934,55.33779332882627]);

    const [radioValue, setRadioValue] = useState("default")
    const handleChangeSatelliteMode = (e) =>{
        setRadioValue(e.target.value)
    }

    const ZOOM_LEVEL = 14;

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


    return(
        <>
            <div className="report-map">
                <MapContainer center={[props.trackingData?.latitude,props.trackingData?.longitude]} zoom={ZOOM_LEVEL} >
                    {
                       radioValue === "satelliteMap"  ? (
                            <SatelliteMap/>
                        ) : (
                            <DefaultMap/>
                        )
                    }
                    <Marker position={[props.trackingData?.latitude,props.trackingData?.longitude]} icon={ iconCar }>
                        <Popup>
                            <div>
                                <div className="flex">
                                    <div className="ml-1">
                                        شماره پلاک:
                                    </div>
                                    <div className="text-bold">
                                        40- 475 ق 53
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="ml-1">
                                        سرعت:
                                    </div>
                                    <div className="text-bold">
                                        {props.trackingData?.speed}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="ml-1">
                                        ساعت:
                                    </div>
                                    <div className="text-bold">
                                        {props.trackingData?.timestamp}
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                    <RecenterAutomatically lat={props.trackingData?.latitude} lng={props.trackingData?.longitude}/>
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


