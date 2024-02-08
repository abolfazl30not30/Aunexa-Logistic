"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputAdornment,
  Menu,
  OutlinedInput,
  Pagination,
  Skeleton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddOrganizationDialog from "@/components/Panel/register-organization/AddOrganizationDialog";
import AddSubOrganizationDialog from "@/components/Panel/register-organization/AddSubOrganizationDialog";
import EditSubOrganizationInfoDialog from "@/components/Panel/register-organization/EditSubOrganizationInfoDialog";
import DeleteSubOrganizationDialog from "@/components/Panel/register-organization/DeleteSubOrganizationDialog";
import AddIndividualDialog from "@/components/Panel/register-organization/AddIndividualDialog";
import EditIndividualDialog from "@/components/Panel/register-organization/EditIndividualDialog";
import DeleteIndividualDialog from "@/components/Panel/register-organization/DeleteIndividualDialog";
import MoreIndividualInfoDialog from "@/components/Panel/register-organization/MoreIndividualInfoDialog";
import Link from "next/link";
import { useGetOneOrganizationQuery } from "@/redux/features/employee/EmployeeSlice";
import { useSelector } from "react-redux";
import RegisterUserDialog from "@/components/Panel/register-organization/RegisterUserDialog";
import UnregisterUserDialog from "@/components/Panel/register-organization/UnregisterUserDialog";
import { useSaveCodeMutation } from "@/redux/features/organization/individual/RegisterIndividualSlice";

export default function registerOrganization() {
  /* search bar */
  const [filter, setFilter] = useState("sub-organization");
  /* search bar */
  const [expanded, setExpanded] = React.useState(false);
  const [organizationIdTarget, setOrganizationIdTarget] = useState("");
  const [subOrganizationIdTarget, setSubOrganizationIdTarget] = useState("");
  const [individualIdTarget, setIndividualIdTarget] = useState("");

  const handleChangeIndividualList = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openAddOrganization, setOpenAddOrganization] = useState(false);
  const handleOpenAddOrganization = () => {
    setOpenAddOrganization(true);
  };
  const handleCloseAddOrganization = () => {
    setOpenAddOrganization(false);
  };

  const [openAddSubOrganization, setOpenAddSubOrganization] = useState(false);
  const handleOpenAddSubOrganization = (id) => {
    setOrganizationIdTarget(id);
    setOpenAddSubOrganization(true);
  };
  const handleCloseAddSubOrganization = () => {
    setOpenAddSubOrganization(false);
  };

  const [openDeleteSubOrganization, setOpenDeleteSubOrganization] =
    useState(false);
  const [deleteTargetSubOrganizationId, setDeleteTargetSubOrganizationId] =
    useState("");
  const handleOpenDeleteSubOrganization = (id) => {
    setDeleteTargetSubOrganizationId(id);
    setOpenDeleteSubOrganization(true);
  };
  const handleCloseDeleteSubOrganization = () => {
    setDeleteTargetSubOrganizationId("");
    setOpenDeleteSubOrganization(false);
  };

  const [openDeleteIndividual, setOpenDeleteIndividual] = useState(false);
  const [deleteTargetIndividualId, setDeleteTargetIndividualId] = useState("");
  const handleOpenDeleteIndividual = (id) => {
    setDeleteTargetIndividualId(id);
    setOpenDeleteIndividual(true);
  };
  const handleCloseDeleteIndividual = () => {
    setDeleteTargetIndividualId("");
    setOpenDeleteIndividual(false);
  };

  const [openAddIndividual, setOpenAddIndividual] = useState(false);
  const handleOpenAddIndividual = (organizationId, subOrganizationId) => {
    setSubOrganizationIdTarget(subOrganizationId);
    setOrganizationIdTarget(organizationId);
    setOpenAddIndividual(true);
  };
  const handleCloseAddIndividual = () => {
    setOpenAddIndividual(false);
  };

  const [openMoreInfoIndividual, setOpenMoreInfoIndividual] = useState(false);
  const [moreInfoIndividualTarget, setMoreInfoIndividualTarget] = useState({
    fullName: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: "",
    telephoneNumber: "",
    education: "",
    email: "",
    address: "",
    cLevel: "",
    relationshipsInformation: [
      {
        fullName: "",
        phoneNumber: "",
        address: "",
        relationship: "",
      },
      {
        fullName: "",
        phoneNumber: "",
        address: "",
        relationship: "",
      },
    ],
  });
  const handleOpenMoreInfoIndividual = (info) => {
    setMoreInfoIndividualTarget(info);
    setOpenMoreInfoIndividual(true);
  };

  const handleCloseMoreInfoIndividual = () => {
    setMoreInfoIndividualTarget({
      fullName: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telephoneNumber: "",
      education: "",
      email: "",
      address: "",
      cLevel: "",
      relationshipsInformation: [
        {
          fullName: "",
          phoneNumber: "",
          address: "",
          relationship: "",
        },
        {
          fullName: "",
          phoneNumber: "",
          address: "",
          relationship: "",
        },
      ],
    });
    setOpenMoreInfoIndividual(false);
  };

  const [openRegisterIndividual, setOpenRegisterIndividual] = useState(false);
  const [registerIndividualTarget, setRegisterIndividualTarget] = useState({
    fullName: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: "",
    telephoneNumber: "",
    education: "",
    email: "",
    address: "",
    cLevel: "",
    code: "",
    userName: "",
    password: "",
    name: "",
    phoneNumber: "",
    subOrganizationName: "",
    subOrganizationId: "",
    organizationId: "",
    profile: "",
  });

  const handleOpenRegisterIndividual = (info, code) => {
    setRegisterIndividualTarget(info);
    setCodeRequest(code);
    setOpenRegisterIndividual(true);
  };

  const handleCloseRegisterIndividual = () => {
    setRegisterIndividualTarget({
      fullName: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telephoneNumber: "",
      education: "",
      email: "",
      address: "",
      cLevel: "",
      code: "",
      userName: "",
      password: "",
      name: "",
      phoneNumber: "",
      subOrganizationName: "",
      subOrganizationId: "",
      organizationId: "",
      profile: "",
    });
    setOpenRegisterIndividual(false);
  };

  const [openUnregisterIndividual, setOpenUnregisterIndividual] =
    useState(false);
  const [unregisterIndividualTarget, setUnregisterIndividualTarget] = useState({
    fullName: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: "",
    telephoneNumber: "",
    education: "",
    email: "",
    address: "",
    cLevel: "",
  });
  const handleOpenUnregisterIndividual = (info) => {
    setUnregisterIndividualTarget(info);
    setOpenUnregisterIndividual(true);
  };

  const handleCloseUnregisterIndividual = () => {
    setUnregisterIndividualTarget({
      fullName: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telephoneNumber: "",
      education: "",
      email: "",
      address: "",
      cLevel: "",
    });
    setOpenUnregisterIndividual(false);
  };

  const [openEditSubOrganizationInfo, setOpenEditSubOrganizationInfo] =
    useState(false);
  const [editSubOrganizationInfoTarget, setEditSubOrganizationInfoTarget] =
    useState({
      name: "",
      capacity: "",
      unit: "",
      type: "",
    });
  const handleOpenEditSubOrganizationInfo = (info) => {
    setEditSubOrganizationInfoTarget(info);
    setOpenEditSubOrganizationInfo(true);
  };
  const handleCloseEditSubOrganizationInfo = () => {
    setEditSubOrganizationInfoTarget({
      name: "",
      capacity: "",
      unit: "",
      type: "",
    });
    setOpenEditSubOrganizationInfo(false);
  };

  const [openEditIndividualInfo, setOpenEditIndividualInfo] = useState(false);
  const [editIndividualInfoTarget, setEditIndividualInfoTarget] = useState({
    fullName: "",
    nationalCode: "",
    personalCode: "",
    birthDate: "",
    fatherName: "",
    gender: "",
    role: "",
    originalPhoneNumber: "",
    anotherPhoneNumber: "",
    telephoneNumber: "",
    education: "",
    email: "",
    address: "",
    cLevel: "",
  });
  const handleOpenEditIndividualInfo = (info) => {
    setEditIndividualInfoTarget(info);
    setOpenEditIndividualInfo(true);
  };
  const handleCloseEditIndividualInfo = () => {
    setEditIndividualInfoTarget({
      fullname: "",
      nationalCode: "",
      personalCode: "",
      birthDate: "",
      fatherName: "",
      gender: "",
      role: "",
      originalPhoneNumber: "",
      anotherPhoneNumber: "",
      telePhoneNumber: "",
      eduction: "",
      email: "",
      address: "",
    });
    setOpenEditIndividualInfo(false);
  };

  const [
    openEditIndividualRelationshipInfo,
    setOpenEditIndividualRelationshipInfo,
  ] = useState(false);
  const [
    editIndividualRelationshipInfoTarget,
    setEditIndividualRelationshipInfoTarget,
  ] = useState({
    relationshipsInformation: [
      {
        fullName: "",
        phoneNumber: "",
        relationship: "",
        address: "",
      },
      {
        fullName: "",
        phoneNumber: "",
        relationship: "",
        address: "",
      },
    ],
  });
  const handleOpenEditIndividualRelationshipInfo = (info) => {
    setEditIndividualRelationshipInfoTarget(info);
    setOpenEditIndividualRelationshipInfo(true);
  };
  const handleCloseEditIndividualRelationshipInfo = () => {
    setEditIndividualRelationshipInfoTarget({
      relationshipsInformation: [
        {
          fullName: "",
          phoneNumber: "",
          relationship: "",
          address: "",
        },
        {
          fullName: "",
          phoneNumber: "",
          relationship: "",
          address: "",
        },
      ],
    });
    editIndividualRelationshipInfoTarget;
    setOpenEditIndividualRelationshipInfo(false);
  };
  const [filterItem, setFilterItem] = useState("sub-organization");
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("sub-organization");
  const handleFilterType = (e) => {
    setFilterType(e.target.value);
    let params = new URLSearchParams();
    params.set(e.target.value, "");
    setFilterItem(params.toString());
    setSearchValue("");
  };

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
  } = useGetOneOrganizationQuery(
    { filterItem, filter },
    { refetchOnMountOrArgChange: true }
  );

  const [
    moreInfoIndividualRelationshipTarget,
    setMoreInfoIndividualRelationshipTarget,
  ] = useState({
    relationshipsInformation: [
      {
        fullName: "",
        phoneNumber: "",
        relationship: "",
        address: "",
      },
      {
        fullName: "",
        phoneNumber: "",
        relationship: "",
        address: "",
      },
    ],
  });
  const [codeRequest, setCodeRequest] = useState("");
  const [openAddIndividualRelationship, setOpenAddIndividualRelationship] =
    useState(false);
  const handleOpenAddIndividualRelationship = (individualId) => {
    setIndividualIdTarget(individualId);
    setOpenAddIndividualRelationship(true);
  };
  const handleCloseAddIndividualRelationship = () => {
    setOpenAddIndividualRelationship(false);
  };

  const [submitData, { isLoading: isSubmitLoading, error }] =
    useSaveCodeMutation();
  const formik = useFormik({
    initialValues: {},

    onSubmit: async (vehicle, helpers) => {
      let updateVehicle = {
        client_id: "msc_application",
        Authorization_validation:
          "Basic " +
          Buffer.from("msc_application" + ":" + "ytp%!wK$7sEN)cCP").toString(
            "base64"
          ),
      };
      const userData = await submitData(updateVehicle);
      setCodeRequest(userData.error.data);
    },
  });
  const [showPage, setShowPage] = useState("organ");
  return (
    <div>
      {showPage === "organ" && (
        <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 lg:px-10 px-4">
          <div className="">
            <h2 className="font-[800] md:text-[1.1rem] text-[0.9rem]">
              کارمندان
            </h2>
          </div>
        </header>
      )}
      <div>
        <div>
          {showPage === "organ" && (
            <div className="flex justify-between items-center text-[0.9rem] bg-white py-4 mt-4 lg:px-10 px-4">
              <div className="">
                <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
                  {organizationList.name}
                </h2>
              </div>
            </div>
          )}
          <div className="">
            <div className="overflow-x-auto">
              <table className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                <tbody className="div-body ">
                  {isDataLoading
                    ? [...Array(6)].map(() => (
                        <tr className="border-b">
                          <div className="hidden md:table-cell px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6 py-2  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="hidden md:table-cell px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div
                            scope="row"
                            className="hidden md:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap "
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
                          </div>
                        </tr>
                      ))
                    : organizationList.subOrganizations?.map(
                        (subOrganization, index) => (
                          <div className="">
                            {showPage === "organ" && (
                              <Accordion
                                className="div-body sm:block hidden"
                                onChange={handleChangeIndividualList(
                                  `panel${organizationList.id + index}`
                                )}
                              >
                                <AccordionSummary
                                  aria-controls="panelbh-content"
                                  id="panelbh-header"
                                >
                                  <div className="flex justify-between  items-center ">
                                    <div className="hidden lg:table-cell px-6   text-gray70 whitespace-nowrap ">
                                      {index + 1}
                                    </div>
                                    <div className="px-2  flex sm:w-1/2 md:w-2/5 lg:w-1/3  gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        اسم دپارتمان :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {subOrganization.name}
                                      </span>
                                    </div>
                                    <div className="px-2 md:px-6  hidden xl:table-cell xl:w-1/4   gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        ظرفیت :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {subOrganization.capacity}
                                      </span>
                                    </div>

                                    <div className="px-2 md:px-6    xl:table-cell xl:w-1/4  hidden gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        واحد :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {subOrganization.unit}
                                      </span>
                                    </div>
                                    <div className="px-2 md:px-6   md:flex md:w-1/3 xl:w-1/4  hidden gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        نوع :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {subOrganization.type}
                                      </span>
                                    </div>

                                    <div className="hidden sm:table-cell px-6    whitespace-nowrap ">
                                      <div>
                                        <button
                                          className="flex  text-gray60  border border-gray60 items-center  p-[0.4rem]  rounded"
                                          onClick={(e) => {
                                            handleOpenAddIndividual(
                                              organizationList.id,
                                              subOrganization.id
                                            );
                                            e.stopPropagation();
                                          }}
                                        >
                                          <span className="hidden sm:inline  md:text-base text-[0.7rem] font-bold md:font-normal text-gray9F">
                                            ثبت افراد
                                          </span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M7 12H17"
                                              stroke="#9F9F9F"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M12 7V17"
                                              stroke="#9F9F9F"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      scope="row"
                                      className="hidden sm:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap "
                                    >
                                      <button
                                        onClick={() => {
                                          handleChangeIndividualList(
                                            `panel${
                                              organizationList.id + index
                                            }`
                                          );
                                        }}
                                        className="border border-1 border-solid border-[#797979] rounded p-[0.4rem] hover:bg-red-100"
                                      >
                                        <svg
                                          className={
                                            expanded ===
                                            `panel${
                                              organizationList.id + index
                                            }`
                                              ? "rotate-180 transition-all duration-300"
                                              : " transition-all duration-300"
                                          }
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                        >
                                          <path
                                            d="M4 6L8 10L12 6"
                                            stroke="#797979"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <div className=" lg:px-16 sm:px-10 ">
                                    <div className="overflow-x-auto  border-r border-dotted border-black">
                                      <table className=" w-full overflow-scroll individual-table border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                        <tbody className=" ">
                                          {subOrganization.individuals?.map(
                                            (individual, index) => (
                                              <tr className=" individual-table flex justify-between my-1 items-center ">
                                                <Typography
                                                  sx={{
                                                    fontFamily:
                                                      "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                  }}
                                                  className="flex gap-2 items-center w-1/2 lg:w-2/5 xl:1/3"
                                                >
                                                  <span className="text-[#4E4E4E] text-sm  pr-2 ">
                                                    نام و نام خانوادگی :
                                                  </span>
                                                  <span className=" text-sm">
                                                    {individual.fullName}
                                                  </span>
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontFamily:
                                                      "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                  }}
                                                  className="w-1/3 lg:flex hidden  gap-2 items-center"
                                                >
                                                  <span className="text-[#4E4E4E] text-sm ">
                                                    {" "}
                                                    کد ملی:
                                                  </span>
                                                  <span className=" text-sm">
                                                    {individual.nationalCode}
                                                  </span>
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontFamily:
                                                      "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                  }}
                                                  className="w-1/4 xl:flex hidden gap-2 items-center"
                                                >
                                                  <span className="text-[#4E4E4E] text-sm ">
                                                    نقش:
                                                  </span>
                                                  <span className=" text-sm">
                                                    {individual?.role}
                                                  </span>
                                                </Typography>
                                                <div className="hidden sm:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap ">
                                                  <button
                                                    onClick={() => {
                                                      handleOpenMoreInfoIndividual(
                                                        individual
                                                      );
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
                                                  {
                                                    <button
                                                      onClick={() => {
                                                        handleOpenEditIndividualInfo(
                                                          individual
                                                        );
                                                      }}
                                                      className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"
                                                    >
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                      >
                                                        <g clip-path="url(#clip0_197_250)">
                                                          <path
                                                            d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                                            stroke="#2492FF"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                          />
                                                        </g>
                                                        <defs>
                                                          <clipPath id="clip0_197_250">
                                                            <rect
                                                              width="16"
                                                              height="16"
                                                              fill="white"
                                                            />
                                                          </clipPath>
                                                        </defs>
                                                      </svg>
                                                    </button>
                                                  }
                                                  {
                                                    <button
                                                      onClick={() => {
                                                        handleOpenDeleteIndividual(
                                                          individual.id
                                                        );
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
                                                  }
                                                </div>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            )}
                            {showPage === "organ" && (
                              <div className="flex sm:hidden justify-between  items-center bg-white py-3 px-3 border-t border-dashed border-t-[#D9D9D9] ">
                                <div className=" flex gap-2 text-xs text-gray70 whitespace-nowrap ">
                                  <span className="text-[#4E4E4E]">
                                    اسم دپارتمان :{" "}
                                  </span>
                                  <span className=" ">
                                    {subOrganization.name}
                                  </span>
                                </div>
                                <div
                                  scope="row"
                                  className=" flex  gap-1   justify-center text-gray70 whitespace-nowrap "
                                >
                                  <button
                                    onClick={() => {
                                      setShowPage(subOrganization?.id);
                                    }}
                                    className="border border-1 border-solid border-gray70 rounded p-[0.3rem] hover:bg-neutral-100"
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
                                </div>
                              </div>
                            )}
                            {showPage === subOrganization?.id && (
                              <div>
                                <div className="bg-white flex justify-end px-2 pt-1">
                                  <button
                                    onClick={() => setShowPage("organ")}
                                    className="flex justify-center border-mainRed border text-white items-center text- p-[0.3rem] rounded"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        d="M6 12L10 8L6 4"
                                        stroke="#DB3746"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 lg:px-10 px-4">
                                  <div className="">
                                    <h2 className="font-[800] md:text-[1.1rem] text-black text-[0.9rem]">
                                      {organization?.name}
                                    </h2>
                                  </div>

                                  <div className="">
                                    {
                                      <button
                                        className="flex text-mainRed border-mainRed border items-center text- px-3 py-2 rounded"
                                        onClick={handleOpenAddIndividual}
                                      >
                                        <span className="inline md:text-base text-[0.7rem] font-bold md:font-normal">
                                          ثبت افراد
                                        </span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M7 12H17"
                                            stroke="#DB3746"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                          <path
                                            d="M12 7V17"
                                            stroke="#DB3746"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                      </button>
                                    }
                                  </div>
                                </header>
                                <div className="flex flex-col   text-[0.9rem] bg-white py-6">
                                  <div className="space-y-3 border-b border-gray30 pb-4 px-4">
                                    <div className="border border-gray30">
                                      <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                        <span className="text-[#4E4E4E]">
                                          اسم دپارتمان :{" "}
                                        </span>
                                        <span className=" text-sm">
                                          {subOrganization?.name}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="border border-gray30">
                                      <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                        <span className="text-[#4E4E4E]">
                                          {" "}
                                          ظرفیت :{" "}
                                        </span>
                                        <span className=" text-sm">
                                          {subOrganization?.capacity}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="border border-gray30">
                                      <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                        <span className="text-[#4E4E4E]">
                                          {" "}
                                          واحد :{" "}
                                        </span>
                                        <span className=" text-sm">
                                          {subOrganization?.unit}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="border border-gray30">
                                      <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                        <span className="text-[#4E4E4E]">
                                          {" "}
                                          نوع :{" "}
                                        </span>
                                        <span className=" text-sm">
                                          {subOrganization?.type}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {subOrganization.individuals?.map(
                                    (individual, index) => (
                                      <div className="flex items-center justify-between">
                                        <div className="px-4  py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                          <span className="text-[#4E4E4E]">
                                            {" "}
                                            نام :{" "}
                                          </span>
                                          <span className=" text-sm">
                                            {individual?.fullName}
                                          </span>
                                        </div>
                                        <div className="flex gap-1  justify-center text-gray70 whitespace-nowrap px-2 ">
                                          <button
                                            onClick={() => {
                                              handleOpenMoreInfoIndividual(
                                                individual
                                              );
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
                                          {
                                            <button
                                              onClick={() => {
                                                handleOpenEditIndividualInfo(
                                                  individual
                                                );
                                              }}
                                              className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                              >
                                                <g clip-path="url(#clip0_197_250)">
                                                  <path
                                                    d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"
                                                    stroke="#2492FF"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_197_250">
                                                    <rect
                                                      width="16"
                                                      height="16"
                                                      fill="white"
                                                    />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                            </button>
                                          }
                                          {
                                            <button
                                              onClick={() => {
                                                handleOpenDeleteIndividual(
                                                  individual.id
                                                );
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
                                          }
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <AddOrganizationDialog
        handleCloseAddOrganization={handleCloseAddOrganization}
        openAddOrganization={openAddOrganization}
      />
      <AddSubOrganizationDialog
        organizationIdTarget={organizationIdTarget}
        handleCloseAddSubOrganization={handleCloseAddSubOrganization}
        openAddSubOrganization={openAddSubOrganization}
      />
      <AddIndividualDialog
        individualIdTarget={individualIdTarget}
        organizationIdTarget={organizationIdTarget}
        subOrganizationIdTarget={subOrganizationIdTarget}
        handleOpenAddIndividualRelationship={
          handleOpenAddIndividualRelationship
        }
        handleCloseAddIndividualRelationship={
          handleCloseAddIndividualRelationship
        }
        handleCloseAddIndividual={handleCloseAddIndividual}
        openAddIndividual={openAddIndividual}
        openAddIndividualRelationship={openAddIndividualRelationship}
      />
      <DeleteSubOrganizationDialog
        deleteTargetSubOrganizationId={deleteTargetSubOrganizationId}
        openDeleteSubOrganization={openDeleteSubOrganization}
        handleCloseDeleteSubOrganization={handleCloseDeleteSubOrganization}
      />
      <DeleteIndividualDialog
        deleteTargetIndividualId={deleteTargetIndividualId}
        openDeleteIndividual={openDeleteIndividual}
        handleCloseDeleteIndividual={handleCloseDeleteIndividual}
      />
      <EditSubOrganizationInfoDialog
        editSubOrganizationInfoTarget={editSubOrganizationInfoTarget}
        handleCloseEditSubOrganizationInfo={handleCloseEditSubOrganizationInfo}
        openEditSubOrganizationInfo={openEditSubOrganizationInfo}
      />
      <EditIndividualDialog
        editIndividualInfoTarget={editIndividualInfoTarget}
        handleCloseEditIndividualInfo={handleCloseEditIndividualInfo}
        openEditIndividualInfo={openEditIndividualInfo}
        handleOpenEditIndividualRelationshipInfo={
          handleOpenEditIndividualRelationshipInfo
        }
        editIndividualRelationshipInfoTarget={
          editIndividualRelationshipInfoTarget
        }
        handleCloseEditIndividualRelationshipInfo={
          handleCloseEditIndividualRelationshipInfo
        }
        openEditIndividualRelationshipInfo={openEditIndividualRelationshipInfo}
      />
      <MoreIndividualInfoDialog
        handleOpenDeleteIndividual={handleOpenDeleteIndividual}
        handleOpenEditIndividualInfo={handleOpenEditIndividualInfo}
        moreInfoIndividualTarget={moreInfoIndividualTarget}
        openMoreInfoIndividual={openMoreInfoIndividual}
        handleCloseMoreInfoIndividual={handleCloseMoreInfoIndividual}
        moreInfoIndividualRelationshipTarget={
          moreInfoIndividualRelationshipTarget
        }
      />
      <RegisterUserDialog
        codeRequest={codeRequest}
        registerIndividualTarget={registerIndividualTarget}
        openRegisterIndividual={openRegisterIndividual}
        handleCloseRegisterIndividual={handleCloseRegisterIndividual}
      />
      <UnregisterUserDialog
        unregisterIndividualTarget={unregisterIndividualTarget}
        openUnregisterIndividual={openUnregisterIndividual}
        handleCloseUnregisterIndividual={handleCloseUnregisterIndividual}
      />
    </div>
  );
}
