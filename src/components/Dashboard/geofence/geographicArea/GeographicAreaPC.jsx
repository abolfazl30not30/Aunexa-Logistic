'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Tab } from '@headlessui/react'
import Geofence from "@/components/Dashboard/geofence/geographicArea/Geofence";
import Group from "@/components/Dashboard/geofence/geographicArea/Group";
import DeleteDialog from "@/components/Dashboard/geofence/geographicArea/DeleteDialog";
import {useSelector} from "react-redux";
const DrawGeofenceMap = dynamic(
    () =>
        import(
            "./DrawGeofenceMap"
            ),
    { ssr: false }
);
const ShowGeofenceMap = dynamic(

    () =>
        import(
            "./ShowGeofenceMap"
            ),
    { ssr: false }
);
function  GeographicAreaPC (){

    const mapStatus = useSelector((state)=> state.geofence.mapStatus)

    return(
        <>
            <div className="flex">
                <div className="bg-white w-[30%] p-4 h-screen">
                    <Tab.Group>
                        <Tab.List className="m-2 flex justify-center border border-1 border-[#BBCDCD] rounded">
                            <Tab className="w-1/2 m-1">
                                {({ selected }) => (
                                    <button
                                        className={
                                            selected ? 'w-full bg-mainPurple text-white rounded-md px-7 py-2' : 'w-full bg-transparent text-black rounded-md px-7 py-2'
                                        }
                                    >
                                        ژئوفنس
                                    </button>
                                )}
                            </Tab>
                            <Tab className="w-1/2 m-1">
                                {({ selected }) => (
                                    <button
                                        className={
                                            selected ? 'w-full bg-mainPurple text-white rounded-md px-7 py-2' : 'w-full bg-transparent text-black rounded-md px-7 py-2'
                                        }
                                    >
                                        گروه
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-5 border-t border-1 border-[#BBCDCD]">
                            <Tab.Panel >
                                <Geofence/>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Group/>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <div className="m-5  w-[70%]">
                    {mapStatus === "show" ? (
                        <ShowGeofenceMap/>
                    ):(
                        <DrawGeofenceMap/>
                    )}

                </div>
            </div>

        </>
    )
}
export default GeographicAreaPC