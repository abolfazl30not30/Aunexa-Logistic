"use client";

import React, { useEffect, useState } from "react";

import { Menu, Pagination, Skeleton } from "@mui/material";

import FilterDialog from "@/components/Dashboard/geofence/geographicArea/FilterDialog";
import DeleteDialog from "@/components/Dashboard/geofence/geographicArea/DeleteDialog";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { useGetAllGeofenceQuery } from "@/redux/features/geofence/GeofenceSlice";

import NewReportPc from "@/components/Dashboard/reports/new-report/NewReportPc";
import NewReportMobile from "@/components/Dashboard/reports/new-report/NewReportMobile";
import GeographicAreaPC from "@/components/Dashboard/geofence/geographicArea/GeographicAreaPC";
import GeographicAreaMobile from "@/components/Dashboard/geofence/geographicArea/GeographicAreaMobile";
// const AddDataDialog = dynamic(
//   () =>
//     import(
//       "../../../../../components/Dashboard/reports/new-report/AddDataDialog"
//     ),
//   { ssr: false }
// );

// const MoreInfoDialog = dynamic(
//   () =>
//     import(
//       "../../../../../components/Dashboard/reports/new-report/MoreInfoDialog"
//     ),
//   { ssr: false }
// );

function NewReport() {
  // let permission = useSelector(
  //   (state) => state.access?.pages?.primaryStoreInput
  // );

  // const [page, setPage] = useState(1);
  // const [sort, setSort] = useState("desc");

  // const [openAddData, setOpenAddData] = useState(false);

  // const [openDelete, setOpenDelete] = useState(false);
  // const [deleteTargetId, setDeleteTargetId] = useState("");

  // const [openMoreInfo, setOpenMoreInfo] = useState(false);
  // const [moreInfoTarget, setMoreInfoTarget] = useState({
  //   name: "",
  //   subOrganizationId: "",
  //   subOrganizationName: "",
  //   speed: "",
  //   stopTimeInMinutes: "",
  //   fenceType: "",
  //   description: "",
  //   centerPoint: {
  //     latitude: "",
  //     longitude: "",
  //   },
  //   radius: "",
  //   points: [
  //     {
  //       latitude: "",
  //       longitude: "",
  //     },
  //   ],
  // });

  // const [openEditInfo, setOpenEditInfo] = useState(false);
  // const [editInfoTarget, setEditInfoTarget] = useState({
  //   name: "",
  //   subOrganizationId: "",
  //   subOrganizationName: "",
  //   fenceType: "",
  //   description: "",
  //   centerPoint: {
  //     latitude: "",
  //     longitude: "",
  //   },
  //   radius: "",
  //   points: [
  //     {
  //       latitude: "",
  //       longitude: "",
  //     },
  //   ],
  // });

  // const [openFilter, setOpenFilter] = useState(false);
  // const [filterItem, setFilterItem] = useState("");
  // const [filterItemCounter, setFilterItemCounter] = useState(0);
  // const [anchorElSort, setAnchorElSort] = useState(null);
  // const openSort = Boolean(anchorElSort);
  // const handleOpenSortMenu = (event) => {
  //   setAnchorElSort(event.currentTarget);
  // };
  // const handleCloseSortMenu = () => {
  //   setAnchorElSort(null);
  // };

  // const handleOpenAddData = () => {
  //   setOpenAddData(true);
  // };
  // const handleCloseAddData = () => {
  //   setOpenAddData(false);
  // };

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };
  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };
  // const handleOpenMoreInfo = (info) => {
  //   setMoreInfoTarget(info);
  //   setOpenMoreInfo(true);
  // };

  // const handleCloseMoreInfo = () => {
  //   setMoreInfoTarget({
  //     name: "",
  //     subOrganizationId: "",
  //     subOrganizationName: "",
  //     fenceType: "",
  //     description: "",
  //     centerPoint: {
  //       latitude: "",
  //       longitude: "",
  //     },
  //     radius: "",
  //     points: [
  //       {
  //         latitude: "",
  //         longitude: "",
  //       },
  //     ],
  //   });
  //   setOpenMoreInfo(false);
  // };
  // const handleOpenDelete = (id) => {
  //   setDeleteTargetId(id);
  //   setOpenDelete(true);
  // };

  // const handleCloseDelete = () => {
  //   setDeleteTargetId("");
  //   setOpenDelete(false);
  // };

  // const handleOpenEditInfo = (info) => {
  //   setEditInfoTarget(info);
  //   setOpenEditInfo(true);
  // };

  // const handleCloseEditInfo = () => {
  //   setEditInfoTarget({
  //     name: "",
  //     subOrganizationId: "",
  //     subOrganizationName: "",
  //     fenceType: "",
  //     description: "",
  //     centerPoint: {
  //       latitude: "",
  //       longitude: "",
  //     },
  //     radius: "",
  //     points: [
  //       {
  //         latitude: "",
  //         longitude: "",
  //       },
  //     ],
  //   });
  //   setOpenEditInfo(false);
  // };

  // const handleOpenMoreInfoRow = (info) => {
  //   if (window.innerWidth <= 768) {
  //     handleOpenMoreInfo(info);
  //   }
  // };

  // const handlePagination = (event, value) => {
  //   setPage(value);
  // };

  // const {
  //   data: inventoryData = [],
  //   isLoading: isDataLoading,
  //   isError: isDataError,
  // } = useGetAllGeofenceQuery(
  //   { page, sort, filterItem },
  //   { refetchOnMountOrArgChange: true }
  // );

  // const handleCounterOfFilter = () => {
  //   let params = new URLSearchParams(filterItem);
  //   setFilterItemCounter(params.size);
  // };

  // useEffect(() => {
  //   handleCounterOfFilter();
  // }, [filterItem]);

  return (

    <>
      <div className="hidden md:block">
        <NewReportPc />
      </div>
      <div className="block md:hidden">
        <NewReportMobile />
      </div>
    </>
  );
}

export default NewReport;
