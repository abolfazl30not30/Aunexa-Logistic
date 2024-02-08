'use client'
import React, {useEffect, useRef, useState} from "react";
import {DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {Circle, MapContainer, Polygon, TileLayer, useMap} from "react-leaflet";
import osm from "@/helper/osm-providers";


export default function MoreInfoDialog(props) {

    const [center, setCenter] = useState([29.120738496597934, 55.33779332882627]);


    const changePolygonFormat = (pointArray) => {
        let points = []
        for (let location of pointArray) {
            let loc = []
            loc = [location.latitude, location.longitude]
            points.push(loc)
        }
        return points
    }

    const DrawVector = () => {

        if (props.moreInfoTarget.fenceType === "CIRCLE") {
            let centerPoint = [props.moreInfoTarget?.centerPoint.latitude, props.moreInfoTarget?.centerPoint.longitude]
            const map = useMap();
            map.setView(centerPoint);
            return <Circle center={centerPoint} pathOptions={{fillColor: 'blue'}}
                           radius={props.moreInfoTarget?.radius}/>
        } else {
            const points = changePolygonFormat(props.moreInfoTarget?.points)
            const map = useMap();
            map.setView(points[0]);
            return <Polygon pathOptions={{fillColor: 'blue'}} positions={points}/>
        }
    }

    const ZOOM_LEVEL = 14;
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreInfo}
                keepMounted
                // onClose={props.handleCloseMoreInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">جزییات</h3>
                        </div>
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                 {props.moreInfoTarget?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">گروه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.subOrganizationName}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">حداكثر سرعت مجاز</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.speed}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">حداكثر زمان توقف</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget?.stopTimeInMinutes}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget?.description && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">
                                                        {props.moreInfoTarget?.description}
                                                     </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="geofence-map mt-2">
                                    <MapContainer center={center} zoom={ZOOM_LEVEL}>
                                        <TileLayer
                                            url={osm.maptiler.url}
                                            attribution={osm.maptiler.attribution}/>
                                        <DrawVector/>
                                    </MapContainer>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        گروه  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.subOrganizationName}
                                    </span>
                                </div>
                                {
                                    props.moreInfoTarget?.description && (
                                        <div>
                                            <span className="ml-1 text-gray9F text-[0.8rem]">
                                     توضیحات  :
                                            </span>
                                            <span className="text-[#29262A] text-[0.8rem]">
                                                {props.moreInfoTarget?.description}
                                            </span>
                                        </div>
                                    )
                                }
                                <div className="geofence-map mt-2">
                                    <MapContainer center={center} zoom={ZOOM_LEVEL}>
                                        <TileLayer
                                            url={osm.maptiler.url}
                                            attribution={osm.maptiler.attribution}/>
                                        <DrawVector/>
                                    </MapContainer>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={() => {
                                props.handleOpenDelete(props.moreInfoTarget.id);
                                props.handleCloseMoreInfo()
                            }}
                                    className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            {/*<button onClick={() => {*/}
                            {/*    props.handleOpenEditInfo(props.moreInfoTarget);*/}
                            {/*    props.handleCloseMoreInfo()*/}
                            {/*}}*/}
                            {/*        className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">*/}
                            {/*    ویرایش*/}
                            {/*</button>*/}
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}