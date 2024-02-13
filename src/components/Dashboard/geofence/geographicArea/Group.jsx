'use client'
import React, {useState} from "react";
import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {useGetAllGeofenceQuery} from "@/redux/features/geofence/GeofenceSlice";
import {useDispatch, useSelector} from "react-redux";
import {setMapStatus, setSelectedGeofence, setShapeColor} from "@/redux/geofence/geofenceSlice";
import DeleteDialog from "@/components/Dashboard/geofence/geographicArea/DeleteDialog";
import List from "@mui/material/List";
import {useGetAllTrackingMachineListQuery} from "@/redux/features/tracking/TrackingSlice";

function Group() {
    const [searchValue, setSearchValue] = useState("");
    const [trackingMachineList, setTrackingMachineList] = useState([]);
    const [page, setPage] = useState(1);

    const [sort, setSort] = useState("desc");
    const [filterItem, setFilterItem] = useState("");
    const dispatch = useDispatch();

    const [openDelete, setOpenDelete] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState("");

    const handleOpenDelete = (id) => {
        setDeleteTargetId(id);
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setDeleteTargetId("");
        setOpenDelete(false);
    };

    const selectedGeofence = useSelector((state) => state.geofence.selectedGeofence)
    const mapStatus = useSelector((state) => state.geofence.mapStatus)

    const handleChangeChecked = (event, data) => {
        if (event.target.checked) {
            const obj = {...data};
            let updateList = [...selectedGeofence, obj];
            dispatch(setSelectedGeofence(updateList));
        } else {
            let temp = selectedGeofence.filter((item) => item.id !== data.id);
            dispatch(setSelectedGeofence(temp));
        }
    };
    const handleSearchBox = (e) => {
        setSearchValue(e.target.value);
        let params = new URLSearchParams();
        params.set("name", e.target.value);
        setFilterItem(params.toString());
    };
    const handleNewGeofence = () => {
        dispatch(setShapeColor("blue"))
        dispatch(setMapStatus("draw"))
    }
    const handlePagination = (event, value) => {
        setPage(value);
    };


    const {
        data: organizationList = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllTrackingMachineListQuery({filterItem},{ refetchOnMountOrArgChange: true });
    const [type,setType]=useState("movement")

    return (
        <>
            <div className="p-3">
                <div>
                    <div className="flex gap-2 items-center">
                        <div>
                            <button onClick={handleNewGeofence}
                                    className="text-[0.9rem] bg-mainBg py-2 px-6 rounded hover:bg-neutral-200">
                                جدید
                            </button>
                        </div>
                        {/*<div>*/}
                        {/*    <button className="text-[0.9rem] bg-mainBg py-2 px-6 rounded hover:bg-neutral-200">*/}
                        {/*        فیلتر*/}
                        {/*    </button>*/}
                        {/*</div>*/}
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
                    </div>
                    <div className="mt-5">
                        <div>
                            <List
                                sx={{
                                    bgcolor: 'background.paper',
                                    border: "1px solid #D9D9D9",
                                    borderBottom: "0px solid #FFF",
                                    paddingBottom: 0,
                                    color: "#29262A"
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader">
                                {
                                    organizationList?.map((item, page) => (
                                        item?.machines.length > 0 && (<div>
                                            <details
                                                className="group py-1 border-b border-b-1 border-b-solid  border-b-borderGray">
                                                <summary
                                                    className="flex items-center justify-between gap-2  font-medium marker:content-none hover:cursor-pointer px-2">
                                                    <div className="flex items-center py-1 gap-2"><span
                                                        className="table-cell text-gray70 whitespace-nowrap ">
                                                                <Checkbox
                                                                    id={item?.machines[0]?.id}
                                                                    checked={item.machines?.every(
                                                                        (data) => trackingMachineList?.some((machine) => machine.id === data.id)
                                                                    )}
                                                                    onClick={(e) => {
                                                                        handleChangeAllChecked(e, item);

                                                                    }}
                                                                    style={{
                                                                        width: 10,
                                                                        height: 10
                                                                    }}
                                                                    inputProps={{"aria-label": "controlled"}}/>
                                                                </span>
                                                        <span
                                                            className="text-textGray  text-[0.9rem] text-sm">{item?.subOrganizationName}</span>
                                                    </div>
                                                    <svg
                                                        className="transition group-open:rotate-90"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none">
                                                        <path
                                                            d="M10 4L6 8L10 12"
                                                            stroke="#9F9F9F"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </summary>
                                                <ul className="flex flex-col gap-1 pr-2">
                                                    {item.machines?.map(
                                                        (machine, index) => (
                                                            <li className="flex gap-4 items-center px-2 py-0.5">
                                                                <div className="gap-1.5 flex items-center"><span
                                                                    className="table-cell text-gray70 whitespace-nowrap ">
                                                                            <Checkbox
                                                                                id={machine.id}
                                                                                checked={trackingMachineList.some((item) => item?.id === machine.id)}
                                                                                onClick={(e) => {
                                                                                    handleChangeChecked(e, machine);
                                                                                }}
                                                                                style={{
                                                                                    width: 10,
                                                                                    height: 10
                                                                                }}
                                                                                inputProps={{"aria-label": "controlled"}}/></span>
                                                                    <span
                                                                        className="table-cell text-sm   text-gray70 whitespace-nowrap ">{machine?.type}</span>
                                                                </div>
                                                                <div>
                                                                    <sppan className="text-sm">
                                                                        {machine?.tag ? (machine?.tag?.slice(2, 5) +
                                                                            "-" +
                                                                            machine?.tag?.slice(5, 7) +
                                                                            " " +
                                                                            machine?.tag?.slice(7, 8) +
                                                                            " " +
                                                                            machine?.tag?.slice(0, 2)) : machine?.code}
                                                                    </sppan>
                                                                </div>
                                                            </li>))}
                                                </ul>
                                            </details>
                                        </div>)
                                    ))
                                }
                            </List>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteDialog
                deleteTargetId={deleteTargetId}
                openDelete={openDelete}
                handleCloseDelete={handleCloseDelete}
            />
        </>
    )

}

export default Group