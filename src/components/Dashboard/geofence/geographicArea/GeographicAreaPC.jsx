'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Tab } from '@headlessui/react'
const GeofenceMap = dynamic(

    () =>
        import(
            "./GeofenceMap"
            ),
    { ssr: false }
);
function  GeographicAreaPC (){
    return(
        <>
            <div className="flex">
                <div className="bg-white w-[30%] p-4">
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
                        <Tab.Panels>
                            <Tab.Panel>Content 1</Tab.Panel>
                            <Tab.Panel>Content 2</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <div className="m-5  w-[70%]">
                    <GeofenceMap/>
                </div>
            </div>
        </>
    )
}
export default GeographicAreaPC