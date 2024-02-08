"use client";

import React, { useEffect, useState } from "react";

import {
  FormControl,
  InputAdornment,
  Menu,
  OutlinedInput,
  Pagination,
  Skeleton,
} from "@mui/material";

import FilterDialog from "@/components/Dashboard/geofence/geographicArea/FilterDialog";
import DeleteDialog from "@/components/Dashboard/geofence/geographicArea/DeleteDialog";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useGetAllPurchaseRequestQuery } from "@/redux/features/purchase-request/PurchaseRequestSlice";
import dynamic from "next/dynamic";
import { useGetAllGeofenceQuery } from "@/redux/features/geofence/GeofenceSlice";

const AddDataDialog = dynamic(
  () =>
    import(
      "../../../../../components/Dashboard/geofence/geographicArea/AddDataDialog"
    ),
  { ssr: false }
);

const MoreInfoDialog = dynamic(
  () =>
    import(
      "../../../../../components/Dashboard/geofence/geographicArea/MoreInfoDialog"
    ),
  { ssr: false }
);

function GeographicArea() {
  let permission = useSelector(
    (state) => state.access?.pages?.primaryStoreInput
  );

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");

  const [openAddData, setOpenAddData] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState("");

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [moreInfoTarget, setMoreInfoTarget] = useState({
    name: "",
    subOrganizationId: "",
    subOrganizationName: "",
    speed: "",
    stopTimeInMinutes: "",
    fenceType: "",
    description: "",
    centerPoint: {
      latitude: "",
      longitude: "",
    },
    radius: "",
    points: [
      {
        latitude: "",
        longitude: "",
      },
    ],
  });

  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [editInfoTarget, setEditInfoTarget] = useState({
    name: "",
    subOrganizationId: "",
    subOrganizationName: "",
    fenceType: "",
    description: "",
    centerPoint: {
      latitude: "",
      longitude: "",
    },
    radius: "",
    points: [
      {
        latitude: "",
        longitude: "",
      },
    ],
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [filterItem, setFilterItem] = useState("");
  const [filterItemCounter, setFilterItemCounter] = useState(0);
  const [anchorElSort, setAnchorElSort] = useState(null);
  const openSort = Boolean(anchorElSort);
  const handleOpenSortMenu = (event) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleCloseSortMenu = () => {
    setAnchorElSort(null);
  };

  const handleOpenAddData = () => {
    setOpenAddData(true);
  };
  const handleCloseAddData = () => {
    setOpenAddData(false);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenMoreInfo = (info) => {
    setMoreInfoTarget(info);
    setOpenMoreInfo(true);
  };

  const handleCloseMoreInfo = () => {
    setMoreInfoTarget({
      name: "",
      subOrganizationId: "",
      subOrganizationName: "",
      fenceType: "",
      description: "",
      centerPoint: {
        latitude: "",
        longitude: "",
      },
      radius: "",
      points: [
        {
          latitude: "",
          longitude: "",
        },
      ],
    });
    setOpenMoreInfo(false);
  };
  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setDeleteTargetId("");
    setOpenDelete(false);
  };

  const handleOpenEditInfo = (info) => {
    setEditInfoTarget(info);
    setOpenEditInfo(true);
  };
  const handleCloseEditInfo = () => {
    setEditInfoTarget({
      name: "",
      subOrganizationId: "",
      subOrganizationName: "",
      fenceType: "",
      description: "",
      centerPoint: {
        latitude: "",
        longitude: "",
      },
      radius: "",
      points: [
        {
          latitude: "",
          longitude: "",
        },
      ],
    });
    setOpenEditInfo(false);
  };

  const handleOpenMoreInfoRow = (info) => {
    if (window.innerWidth <= 768) {
      handleOpenMoreInfo(info);
    }
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const {
    data: inventoryData = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllGeofenceQuery(
    { page, sort, filterItem },
    { refetchOnMountOrArgChange: true }
  );
  const handleCounterOfFilter = () => {
    let params = new URLSearchParams(filterItem);
    setFilterItemCounter(params.size);
  };

  useEffect(() => {
    handleCounterOfFilter();
  }, [filterItem]);

  return (
    <>
      <div>
        <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-5 md:px-10">
          <div className="">
            <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
              ناحیه جغرافیایی
            </h2>
          </div>
          <div className="">
            {
              <button
                className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
                onClick={handleOpenAddData}
              >
                <span className="hidden md:inline">ثبت ناحیه جغرافیایی</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 12H17"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 7V17"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            }
          </div>
        </header>
        <section className="py-4 md:px-8 mt-5 bg-white h-[55rem]">
          <div className="px-4 flex justify-between">
            <div className="w-[50%] md:w-[37%]">
              {/*<FormControl fullWidth>*/}
              {/*    <OutlinedInput*/}
              {/*        size="small"*/}
              {/*        sx={{py: "0.2rem"}}*/}
              {/*        placeholder="جستوجو ..."*/}
              {/*        id="outlined-adornment-amount"*/}
              {/*        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.9rem"}}}*/}
              {/*        startAdornment={<InputAdornment position="start">*/}
              {/*            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
              {/*                 viewBox="0 0 24 24" fill="none">*/}
              {/*                <path*/}
              {/*                    d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"*/}
              {/*                    stroke="#9F9F9F" stroke-width="1.5" stroke-linecap="round"*/}
              {/*                    stroke-linejoin="round"/>*/}
              {/*            </svg>*/}
              {/*        </InputAdornment>}*/}
              {/*    />*/}
              {/*</FormControl>*/}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleOpenFilter}
                className="flex relative items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z"
                    stroke="#9F9F9F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {filterItemCounter !== 0 && (
                  <div className="absolute md:top-1 md:right-2 top-1 right-1">
                    <span className=" rounded-full bg-mainRed w-[1rem] h-[1rem] text-[0.49rem] flex  items-center justify-center text-center text-white">
                      {filterItemCounter}
                    </span>
                  </div>
                )}
                <span className="hidden md:inline">فیلتر کردن</span>
              </button>
              <div>
                <button
                  onClick={handleOpenSortMenu}
                  className="flex items-center gap-2 text-[0.9rem] text-gray9F border border-1 border-solid border-borderGray rounded px-2 md:px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12H18M3 6H21M9 18H15"
                      stroke="#9F9F9F"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="hidden md:inline">مرتب سازی</span>
                </button>
                <Menu
                  anchorEl={anchorElSort}
                  id="account-menu"
                  open={openSort}
                  onClose={handleCloseSortMenu}
                  onClick={handleCloseSortMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      width: "10rem",
                      bgcolor: "#fff",
                      borderRadius: "0.5rem",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))",
                      mt: 1.5,
                      fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <div className="px-2 py-2">
                    <div>
                      <button
                        onClick={() => {
                          setSort("desc");
                        }}
                        className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100"
                      >
                        <span className="text-gray70 text-[0.8rem] tracking-tighter">
                          بر اساس جدید ترین
                        </span>
                      </button>
                      <button
                        onClick={() => setSort("asc")}
                        className="w-full flex gap-2 py-3 px-2 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                      >
                        <span className="text-gray70 text-[0.8rem] tracking-tighter">
                          بر اساس قدیمی ترین
                        </span>
                      </button>
                    </div>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="overflow-x-auto">
              <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">
                  <tr>
                    <th className="hidden md:table-cell px-6 py-4">#</th>
                    <th className="px-2 md:px-6 px-6 py-4">نام</th>
                    <th className="px-2 md:px-6 px-6 py-4">گروه</th>
                    <th className="hidden md:table-cell px-6 py-4">عملیات</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {isDataLoading
                    ? [...Array(8)].map(() => (
                        <tr className="border-b">
                          <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                          >
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                          </td>
                        </tr>
                      ))
                    : inventoryData?.content?.map((data, index) => (
                        <tr
                          onClick={() => {
                            handleOpenMoreInfoRow(data);
                          }}
                          className="table-row border-b"
                        >
                          <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            {data?.name}
                          </td>
                          <td className="px-6 py-4  text-gray70 whitespace-nowrap ">
                            {data?.subOrganizationName}
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                          >
                            <button
                              onClick={() => {
                                handleOpenMoreInfo(data);
                              }}
                              className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M9 4.56442V4.55554"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 13.4445V7.22223"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                                  stroke="#797979"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                            {/*<button*/}
                            {/*  onClick={() => {*/}
                            {/*    handleOpenEditInfo(data);*/}
                            {/*  }}*/}
                            {/*  className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"*/}
                            {/*>*/}
                            {/*  <svg*/}
                            {/*    xmlns="http://www.w3.org/2000/svg"*/}
                            {/*    width="16"*/}
                            {/*    height="16"*/}
                            {/*    viewBox="0 0 16 16"*/}
                            {/*    fill="none"*/}
                            {/*  >*/}
                            {/*    <g clip-path="url(#clip0_197_250)">*/}
                            {/*      <path*/}
                            {/*        d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"*/}
                            {/*        stroke="#2492FF"*/}
                            {/*        stroke-linecap="round"*/}
                            {/*        stroke-linejoin="round"*/}
                            {/*      />*/}
                            {/*    </g>*/}
                            {/*    <defs>*/}
                            {/*      <clipPath id="clip0_197_250">*/}
                            {/*        <rect*/}
                            {/*          width="16"*/}
                            {/*          height="16"*/}
                            {/*          fill="white"*/}
                            {/*        />*/}
                            {/*      </clipPath>*/}
                            {/*    </defs>*/}
                            {/*  </svg>*/}
                            {/*</button>*/}
                            <button
                              onClick={() => {
                                handleOpenDelete(data.id);
                              }}
                              className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"
                                  stroke="#FE4949"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="flex justify-center mb-5 mt-7"
            style={{ direction: "rtl" }}
          >
            <Pagination
              page={page}
              count={inventoryData.totalPages}
              onChange={handlePagination}
              shape="rounded"
            />
          </div>
        </section>
        <AddDataDialog
          handleCloseAddData={handleCloseAddData}
          openAddData={openAddData}
        />
        <FilterDialog
          filterItem={filterItem}
          setFilterItem={setFilterItem}
          openFilter={openFilter}
          handleCloseFilter={handleCloseFilter}
        />
        <MoreInfoDialog
          handleOpenDelete={handleOpenDelete}
          handleOpenEditInfo={handleOpenEditInfo}
          moreInfoTarget={moreInfoTarget}
          openMoreInfo={openMoreInfo}
          handleCloseMoreInfo={handleCloseMoreInfo}
        />
        <DeleteDialog
          deleteTargetId={deleteTargetId}
          openDelete={openDelete}
          handleCloseDelete={handleCloseDelete}
        />
        {/*<EditInfoDialog*/}
        {/*  editInfoTarget={editInfoTarget}*/}
        {/*  handleCloseEditInfo={handleCloseEditInfo}*/}
        {/*  openEditInfo={openEditInfo}*/}
        {/*/>*/}
      </div>
    </>
  );
}

export default GeographicArea;
