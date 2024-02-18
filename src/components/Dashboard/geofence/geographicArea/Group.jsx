'use client'
import React, {useState} from "react";
import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import Checkbox, {checkboxClasses} from "@mui/material/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import List from "@mui/material/List";
import AddNewGroupDialog from "@/components/Dashboard/geofence/geographicArea/AddNewGroupDialog";
import {useGetAllGroupQuery} from "@/redux/features/geofence/GroupOfGeofencSlice";
import DeleteGroupDialog from "@/components/Dashboard/geofence/geographicArea/DeleteGroupDialog";
import {setSelectedGroup} from "@/redux/geofence/geofenceSlice";
import EditGroupDialog from "@/components/Dashboard/geofence/geographicArea/EditGroupDialog";

function Group() {
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const [editInfoTarget, setEditInfoTarget] = useState({
        groupName: "",
        description: "",
        geoFenceIds:[],
    });

    const handleOpenEditInfo = (info) => {
        setEditInfoTarget(info);
        setOpenEditInfo(true);
    };

    const handleCloseEditInfo = () => {
        setEditInfoTarget({
            groupName: "",
            description: "",
            geoFenceIds:[],
        });
        setOpenEditInfo(false);
    };

    const selectedGroup = useSelector((state) => state.geofence.selectedGroup)

    const [openAddData, setOpenAddData] = useState(false);
    const handleOpenAddData = () => {
        setOpenAddData(true);
    };
    const handleCloseAddData = () => {
        setOpenAddData(false);
    };

    const [searchValue, setSearchValue] = useState("");
    const [listOf, setTrackingMachineList] = useState([]);
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

    // const handleChangeChecked = (event, data) => {
    //     if (event.target.checked) {
    //         const obj = {...data};
    //         let updateList = [...selectedGeofence, obj];
    //         dispatch(setSelectedGroup(updateList));
    //     } else {
    //         let temp = selectedGeofence.filter((item) => item.id !== data.id);
    //         dispatch(setSelectedGroup(temp));
    //     }
    // };

    const handleChangeAllChecked = (event, data) => {
        if (event.target.checked) {
            const obj = {...data};
            console.log(selectedGroup)
            let updateList = [...selectedGroup, obj];
            dispatch(setSelectedGroup(updateList));
        } else {
            let temp = selectedGroup.filter((item) => item.id !== data.id);
            dispatch(setSelectedGroup(temp));
        }
    }

    const handleSearchBox = (e) => {
        setSearchValue(e.target.value);
        let params = new URLSearchParams();
        params.set("name", e.target.value);
        setFilterItem(params.toString());
    };

    const handlePagination = (event, value) => {
        setPage(value);
    };


    const {
        data: groupList = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllGroupQuery({page, sort, filterItem}, {refetchOnMountOrArgChange: true});

    return (
        <>
            <div className="p-3">
                <div>
                    <div className="flex gap-2 items-center">
                        <div>
                            <button onClick={handleOpenAddData}
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
                                    paddingBottom: 0,
                                    color: "#29262A"
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader">
                                {
                                    groupList?.content?.map((item, page) => (
                                        item?.geoFenceIds.length > 0 && (<div>
                                            <details
                                                className="group py-3 border-b border-b-1 border-solid  border-borderGray">
                                                <summary
                                                    className="flex items-center justify-between gap-2  font-medium marker:content-none hover:cursor-pointer px-2">
                                                    <div className="text-gray70 flex items-center py-1 gap-3">
                                                        <Checkbox
                                                            id={item?.id}
                                                            checked={selectedGroup.some((group) => group?.id === item.id)}
                                                            onClick={(e) => {
                                                                handleChangeAllChecked(e, item);
                                                            }}
                                                            style={{
                                                                width: 13,
                                                                height: 13
                                                            }}
                                                            sx={{
                                                                [`&.${checkboxClasses.checked}`]: {
                                                                    color: '#4D51DF',
                                                                },
                                                            }}
                                                            inputProps={{"aria-label": "controlled"}}/>
                                                        <label htmlFor={item?.id}
                                                               className="text-textGray  text-[0.9rem] text-sm">{item?.groupName}</label>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <button className="rounded-full hover:bg-neutral-100 p-2" onClick={()=>{handleOpenEditInfo(item)}}>
                                                            <svg width="21" height="22" viewBox="0 0 15 16"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M7.1875 5.5625V3.0625M4.0625 9.3125V11.8125M10.3125 10.5625V11.8125M7.1875 11.8125V8.0625M4.0625 3.0625V6.8125M10.3125 3.0625V8.0625M5.9375 5.5625H8.4375M2.8125 9.3125H5.3125M9.0625 10.5625H11.5625"
                                                                    stroke="#797979" stroke-width="0.5"
                                                                    stroke-linecap="round"/>
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => {
                                                            handleOpenDelete(item.id)
                                                        }} className="rounded-full hover:bg-neutral-100 p-2">
                                                            <svg width="15" height="17" viewBox="0 0 9 11"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M1.75937 10.7508C1.48021 10.7508 1.24208 10.6524 1.045 10.4558C0.848333 10.2591 0.75 10.021 0.75 9.74141V2.00078H0.125V1.37578H2.625V0.894531H6.375V1.37578H8.875V2.00078H8.25V9.74141C8.25 10.0289 8.15375 10.2689 7.96125 10.4614C7.76833 10.6543 7.52813 10.7508 7.24063 10.7508H1.75937ZM7.625 2.00078H1.375V9.74141C1.375 9.85349 1.41104 9.94557 1.48312 10.0177C1.55521 10.0897 1.64729 10.1258 1.75937 10.1258H7.24063C7.33646 10.1258 7.42458 10.0858 7.505 10.0058C7.585 9.92537 7.625 9.83724 7.625 9.74141V2.00078ZM3.13 8.87578H3.755V3.25078H3.13V8.87578ZM5.245 8.87578H5.87V3.25078H5.245V8.87578Z"
                                                                    fill="#797979"/>
                                                            </svg>
                                                        </button>
                                                        <div>
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
                                                        </div>
                                                    </div>
                                                </summary>
                                                <ul className="flex flex-col pr-4">
                                                    {item.geoFenceIds?.map(
                                                        (geo, index) => (
                                                            <li className="geofence-in-group flex justify-between  items-center px-2 py-2 border-b border-b-1 border-solid  border-borderGray">
                                                                <div className="gap-3 flex items-center">
                                                                    {/*<div className="table-cell text-gray70 whitespace-nowrap ">*/}
                                                                    {/*        <Checkbox*/}
                                                                    {/*            id={geo.id}*/}
                                                                    {/*            checked={trackingMachineList.some((item) => item?.id === geo.id)}*/}
                                                                    {/*            onClick={(e) => {*/}
                                                                    {/*                handleChangeChecked(e, geo);*/}
                                                                    {/*            }}*/}
                                                                    {/*            style={{*/}
                                                                    {/*                width: 10,*/}
                                                                    {/*                height: 10*/}
                                                                    {/*            }}*/}
                                                                    {/*            sx={{*/}
                                                                    {/*                [`&.${checkboxClasses.checked}`]: {*/}
                                                                    {/*                    color: '#4D51DF',*/}
                                                                    {/*                },*/}
                                                                    {/*            }}*/}
                                                                    {/*            inputProps={{"aria-label": "controlled"}}/></div>*/}
                                                                    <label htmlFor={geo.id}
                                                                           className="table-cell text-sm   text-gray70 whitespace-nowrap ">{geo?.name}</label>
                                                                </div>
                                                                <div>
                                                                    <div className="flex item-center">
                                                                        {/*<button className="rounded-full hover:bg-neutral-100 p-2">*/}
                                                                        {/*    <svg width="19" height="20" viewBox="0 0 15 16"*/}
                                                                        {/*         fill="none"*/}
                                                                        {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                                                        {/*        <path*/}
                                                                        {/*            d="M14.0625 6.92969H13.3289L11.6883 4.06152C11.6162 3.9366 11.5124 3.8329 11.3874 3.76089C11.2624 3.68888 11.1206 3.6511 10.9764 3.65137H4.02187C3.87763 3.6511 3.73586 3.68888 3.61087 3.76089C3.48588 3.8329 3.38209 3.9366 3.30996 4.06152L1.66934 6.93262H0.9375C0.84426 6.93262 0.754839 6.96966 0.688908 7.03559C0.622977 7.10152 0.585938 7.19094 0.585938 7.28418C0.585938 7.37742 0.622977 7.46684 0.688908 7.53277C0.754839 7.5987 0.84426 7.63574 0.9375 7.63574H1.52344V12.4404C1.52344 12.658 1.60986 12.8666 1.7637 13.0205C1.91754 13.1743 2.12619 13.2607 2.34375 13.2607H3.75C3.96756 13.2607 4.17621 13.1743 4.33005 13.0205C4.48389 12.8666 4.57031 12.658 4.57031 12.4404V11.3828H10.4297V12.4375C10.4297 12.6551 10.5161 12.8637 10.67 13.0175C10.8238 13.1714 11.0324 13.2578 11.25 13.2578H12.6562C12.8738 13.2578 13.0825 13.1714 13.2363 13.0175C13.3901 12.8637 13.4766 12.6551 13.4766 12.4375V7.63281H14.0625C14.1557 7.63281 14.2452 7.59577 14.3111 7.52984C14.377 7.46391 14.4141 7.37449 14.4141 7.28125C14.4141 7.18801 14.377 7.09859 14.3111 7.03266C14.2452 6.96673 14.1557 6.92969 14.0625 6.92969ZM3.92051 4.41016C3.93078 4.39236 3.94556 4.37758 3.96335 4.36729C3.98114 4.35701 4.00132 4.35158 4.02187 4.35156H10.9781C10.9987 4.35158 11.0189 4.35701 11.0367 4.36729C11.0544 4.37758 11.0692 4.39236 11.0795 4.41016L12.5191 6.92969H2.48086L3.92051 4.41016ZM3.86719 12.4375C3.86719 12.4686 3.85484 12.4984 3.83286 12.5204C3.81089 12.5423 3.78108 12.5547 3.75 12.5547H2.34375C2.31267 12.5547 2.28286 12.5423 2.26089 12.5204C2.23891 12.4984 2.22656 12.4686 2.22656 12.4375V11.3828H3.86719V12.4375ZM12.6562 12.5547H11.25C11.2189 12.5547 11.1891 12.5423 11.1671 12.5204C11.1452 12.4984 11.1328 12.4686 11.1328 12.4375V11.3828H12.7734V12.4375C12.7734 12.4686 12.7611 12.4984 12.7391 12.5204C12.7171 12.5423 12.6873 12.5547 12.6562 12.5547ZM12.7734 10.6797H2.22656V7.63281H12.7734V10.6797ZM3.39844 9.15625C3.39844 9.06301 3.43548 8.97359 3.50141 8.90766C3.56734 8.84173 3.65676 8.80469 3.75 8.80469H4.6875C4.78074 8.80469 4.87016 8.84173 4.93609 8.90766C5.00202 8.97359 5.03906 9.06301 5.03906 9.15625C5.03906 9.24949 5.00202 9.33891 4.93609 9.40484C4.87016 9.47077 4.78074 9.50781 4.6875 9.50781H3.75C3.65676 9.50781 3.56734 9.47077 3.50141 9.40484C3.43548 9.33891 3.39844 9.24949 3.39844 9.15625ZM9.96094 9.15625C9.96094 9.06301 9.99798 8.97359 10.0639 8.90766C10.1298 8.84173 10.2193 8.80469 10.3125 8.80469H11.25C11.3432 8.80469 11.4327 8.84173 11.4986 8.90766C11.5645 8.97359 11.6016 9.06301 11.6016 9.15625C11.6016 9.24949 11.5645 9.33891 11.4986 9.40484C11.4327 9.47077 11.3432 9.50781 11.25 9.50781H10.3125C10.2193 9.50781 10.1298 9.47077 10.0639 9.40484C9.99798 9.33891 9.96094 9.24949 9.96094 9.15625ZM5.74219 2.125C5.74219 2.03176 5.77923 1.94234 5.84516 1.87641C5.91109 1.81048 6.00051 1.77344 6.09375 1.77344H8.90625C8.99949 1.77344 9.08891 1.81048 9.15484 1.87641C9.22077 1.94234 9.25781 2.03176 9.25781 2.125C9.25781 2.21824 9.22077 2.30766 9.15484 2.37359C9.08891 2.43952 8.99949 2.47656 8.90625 2.47656H6.09375C6.00051 2.47656 5.91109 2.43952 5.84516 2.37359C5.77923 2.30766 5.74219 2.21824 5.74219 2.125Z"*/}
                                                                        {/*            fill="#797979"/>*/}
                                                                        {/*    </svg>*/}
                                                                        {/*</button>*/}
                                                                        {/*<button className="rounded-full hover:bg-neutral-100 p-2"*/}
                                                                        {/*        onClick={() => {*/}
                                                                        {/*            handleOpenDelete(goe.id);*/}
                                                                        {/*        }}>*/}
                                                                        {/*    <svg width="15" height="17" viewBox="0 0 9 11"*/}
                                                                        {/*         fill="none"*/}
                                                                        {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                                                        {/*        <path*/}
                                                                        {/*            d="M1.75937 10.7508C1.48021 10.7508 1.24208 10.6524 1.045 10.4558C0.848333 10.2591 0.75 10.021 0.75 9.74141V2.00078H0.125V1.37578H2.625V0.894531H6.375V1.37578H8.875V2.00078H8.25V9.74141C8.25 10.0289 8.15375 10.2689 7.96125 10.4614C7.76833 10.6543 7.52813 10.7508 7.24063 10.7508H1.75937ZM7.625 2.00078H1.375V9.74141C1.375 9.85349 1.41104 9.94557 1.48312 10.0177C1.55521 10.0897 1.64729 10.1258 1.75937 10.1258H7.24063C7.33646 10.1258 7.42458 10.0858 7.505 10.0058C7.585 9.92537 7.625 9.83724 7.625 9.74141V2.00078ZM3.13 8.87578H3.755V3.25078H3.13V8.87578ZM5.245 8.87578H5.87V3.25078H5.245V8.87578Z"*/}
                                                                        {/*            fill="#797979"/>*/}
                                                                        {/*    </svg>*/}
                                                                        {/*</button>*/}
                                                                    </div>
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
            <DeleteGroupDialog
                deleteTargetId={deleteTargetId}
                openDelete={openDelete}
                handleCloseDelete={handleCloseDelete}
            />
            <AddNewGroupDialog
                handleCloseAddData={handleCloseAddData}
                openAddData={openAddData}
            />
            <EditGroupDialog
                editInfoTarget={editInfoTarget}
                handleCloseEditInfo={handleCloseEditInfo}
                openEditInfo={openEditInfo}
            />
        </>
    )

}

export default Group