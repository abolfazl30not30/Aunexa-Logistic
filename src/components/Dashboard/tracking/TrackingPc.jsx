'use client'
import React, {useState} from "react";
import dynamic from "next/dynamic";
import {Tab} from '@headlessui/react'
import {useGetAllTrackingMachineListQuery} from "@/redux/features/tracking/TrackingSlice";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import {useGetAllVehicleCategoryQuery} from "@/redux/features/category/CategorySlice";
import {FormControl, InputAdornment, OutlinedInput} from "@material-ui/core";

const TrackingMap = dynamic(
    () =>
        import(
            "./TrackingMap"
            ),
    {ssr: false}
);

function TrackingPc() {

    const [searchValue, setSearchValue] = useState("");
    const [filterType, setFilterType] = useState("filter");
    const [filterItem, setFilterItem] = useState(null);
    const handleSearchBox = (e) => {
        setSearchValue(e.target.value);
        let params = new URLSearchParams();
        params.set(filterType, e.target.value);
        setFilterItem(params.toString());
    };

    const {
        data: organizationList = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllTrackingMachineListQuery({filterItem}, {refetchOnMountOrArgChange: true});

    const {
        data: vehicleCategoryList = [],
        isLoading: isVehicleCategoryLoading,
        isError: isVehicleCategoryError
    } = useGetAllVehicleCategoryQuery()

    const handleChangeChecked = (event, machine) => {
        if (event.target.checked) {
            const obj = {...machine};
            let updateList = [...trackingMachineList, obj];
            setTrackingMachineList(updateList);
        } else {
            let temp = trackingMachineList.filter((item) => item.id !== machine.id);
            setTrackingMachineList(temp);

        }
    };

    const [trackingVehicleList, setTrackingVehicleList] = useState([]);

    const handleChangeCheckedVehicle = (event, vehicle) => {
        if (event.target.checked) {
            const obj = {...vehicle};
            let updateList = [...trackingVehicleList, obj];
            setTrackingVehicleList(updateList);
        } else {
            let temp = trackingVehicleList.filter((item) => item.name !== vehicle.name);
            setTrackingVehicleList(temp);

        }

    };

    const [trackingMachineList, setTrackingMachineList] = useState([]);

    const handleChangeAllChecked = (event, item) => {
        if (event.target.checked) {
            const obj = item?.machines

            let updateList = trackingMachineList?.filter((machine) => !item.machines.find(vehicle => (vehicle.id === machine.id)))
            updateList = [...updateList, ...obj]
            setTrackingMachineList(updateList)
        } else {

            let updateList = trackingMachineList.filter((machine) => !item.machines.find(vehicle => (vehicle.id === machine.id)))
            setTrackingMachineList(updateList)
        }
    }

    const [trackingData, setTrackingData] = useState({
        altitude: 1226,
        angle: 292,
        id: "6597fe44d4eb903333925d93",
        imei: "350424065730184",
        latitude: 29.120738496597934,
        longitude: 55.33779332882627,
        satellites: 12,
        speed: 8,
        timestamp: "1402/10/15 16:13:11"
    })

    return (
        <>
            <div className="flex">
                <div className="bg-white w-[30%] p-4 h-screen">
                    <Tab.Group>
                        <Tab.List className="m-2 flex justify-center border border-1 border-[#BBCDCD] rounded">
                            <Tab className="w-1/2 m-1">
                                {({selected}) => (
                                    <button
                                        className={
                                            selected ? 'w-full bg-mainPurple text-white rounded-md px-7 py-2' : 'w-full bg-transparent text-black rounded-md px-7 py-2'
                                        }
                                    >
                                        گروه‌متحرک
                                    </button>
                                )}
                            </Tab>
                            <Tab className="w-1/2 m-1">
                                {({selected}) => (
                                    <button
                                        className={
                                            selected ? 'w-full bg-mainPurple text-white rounded-md px-7 py-2' : 'w-full bg-transparent text-black rounded-md px-7 py-2'
                                        }>
                                        نوع وسیله‌نقلیه
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-5 border-t border-1 border-[#BBCDCD]">
                            <Tab.Panel>
                                <div className="p-2">
                                    <div className="w-full">
                                        <FormControl fullWidth>
                                            <OutlinedInput
                                                value={searchValue}
                                                onChange={handleSearchBox}
                                                className=""
                                                size="small"
                                                sx={{
                                                    py: "0.1rem",
                                                    borderRadius: 0,
                                                }}
                                                placeholder="جستوجو..."
                                                id="outlined-adornment-amount"
                                                inputProps={{
                                                    style: {
                                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                        fontSize: "0.9rem",
                                                    },
                                                }}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                                stroke="#9F9F9F"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <List
                                        sx={{
                                            bgcolor: 'background.paper',
                                            paddingBottom: 0,
                                            color: "#29262A"
                                        }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader">
                                        {
                                            organizationList?.map((item, page) => (
                                                item?.machines.length > 0 && (<div>
                                                    <details className="group py-1">
                                                        <summary
                                                            className="flex items-center justify-between gap-2 font-medium marker:content-none hover:cursor-pointer px-2">
                                                            <div className="flex items-center py-1 gap-2">
                                                                <div className="text-gray70 whitespace-nowrap ">
                                                                    <Checkbox
                                                                        id={item?.machines[0]?.id}
                                                                        checked={item.machines?.every((data) => trackingMachineList?.some((machine) => machine.id === data.id))}
                                                                        onClick={(e) => {
                                                                            handleChangeAllChecked(e, item)
                                                                        }}
                                                                        style={{
                                                                            width: 10,
                                                                            height: 10
                                                                        }}
                                                                        inputProps={{"aria-label": "controlled"}}/>
                                                                </div>
                                                                <div>
                                                                    <label
                                                                           className="text-textGray  text-[0.9rem] text-sm">{item?.subOrganizationName}</label>
                                                                </div>
                                                            </div>
                                                            <svg
                                                                className="transition group-open:rotate-90"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 16 16"
                                                                fill="none">
                                                                <path
                                                                    d="M10 4L6 8L10 12"
                                                                    stroke="#797979"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </summary>
                                                        <ul className="flex flex-col px-5">
                                                            {item.machines?.map((machine, index) => (
                                                                <li className="flex gap-3 items-center px-2 py-2 ">
                                                                    <div className="gap-3 flex items-center">
                                                                        <div className="text-gray70 whitespace-nowrap ">
                                                                            <Checkbox
                                                                                id={machine.id}
                                                                                checked={trackingMachineList.some(
                                                                                    (item) => item?.id === machine.id
                                                                                )}
                                                                                onClick={(e) => {
                                                                                    handleChangeChecked(e, machine);
                                                                                }}
                                                                                style={{
                                                                                    width: 10,
                                                                                    height: 10
                                                                                }}
                                                                                inputProps={{"aria-label": "controlled"}}/>
                                                                        </div>
                                                                        <div>
                                                                            <label htmlFor={machine.id}
                                                                                   className="text-sm text-gray70 whitespace-nowrap ">{machine?.type}</label>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-sm">
                                                                            {machine?.tag ? (machine?.tag?.slice(2, 5) +
                                                                                "-" +
                                                                                machine?.tag?.slice(5, 7) +
                                                                                " " +
                                                                                machine?.tag?.slice(7, 8) +
                                                                                " " +
                                                                                machine?.tag?.slice(0, 2)) : machine?.code}
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </details>
                                                </div>)
                                            ))
                                        }
                                    </List>
                                </div>
                            </Tab.Panel>

                            <Tab.Panel>
                                <ul className="grid grid-cols-2 gap-1 p-3 rounded-sm h-64">
                                    {vehicleCategoryList?.map((vehicle, index) => (
                                        <li className="flex justify-between items-center px-2 py-0.5">
                                            <div className="gap-3 flex items-center px-4">
                                                <div className="text-gray70 whitespace-nowrap">
                                                    <Checkbox
                                                        id={vehicle.name}
                                                        checked={trackingVehicleList.some((item) => item?.name === vehicle.name)}
                                                        onClick={(e) => {
                                                            handleChangeCheckedVehicle(e, vehicle);
                                                        }}
                                                        style={{width: 10, height: 10}}
                                                        inputProps={{"aria-label": "controlled"}}/>
                                                </div>
                                                <label htmlFor={vehicle.name}
                                                       className="text-sm text-gray70 whitespace-nowrap">{vehicle?.name}</label>
                                            </div>
                                        </li>)
                                    )}
                                </ul>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <div className="m-5  w-[70%]">
                    <TrackingMap trackingData={trackingData}/>
                </div>
            </div>
        </>
    )
}

export default TrackingPc