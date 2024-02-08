"use client";

import React, { useState } from "react";

import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Skeleton,
} from "@mui/material";

import AddRoleDialog from "@/components/Panel/register-role/AddRoleDialog";
import EditRoleInfoDialog from "@/components/Panel/register-role/EditRoleInfoDialog";
import MoreRoleInfoDialog from "@/components/Panel/register-role/MoreRoleInfoDialog";
import DeleteRoleDialog from "@/components/Panel/register-role/DeleteRoleDialog";
import { useGetAllRolesQuery } from "@/redux/features/role/RoleSlice";
import { useSelector } from "react-redux";
import { apiAuthServerSlice } from "@/redux/api/apiAuthServerSlice";

function registerRole() {
  const [searchRole, setSearchRole] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  let permission = useSelector((state) => state.access?.pages?.registerRole);

  const [page, setPage] = useState(1);
  const [openAddRole, setOpenAddRole] = useState(false);

  const [openDeleteRole, setOpenDeleteRole] = useState(false);
  const [deleteTargetRoleId, setDeleteTargetRoleId] = useState("");
  const [openMoreRoleInfo, setOpenMoreRoleInfo] = useState(false);
  const [moreRoleInfoTarget, setMoreRoleInfoTarget] = useState({
    id: "",
    role: "",
    authorities: {},
    authorityDescription: [],
  });

  const [openEditRoleInfo, setOpenEditRoleInfo] = useState(false);
  const [editRoleInfoTarget, setEditRoleInfoTarget] = useState({
    id: "",
    role: "",
    authorities: {},
    authorityDescription: [],
  });

  const handleOpenAddRole = () => {
    setOpenAddRole(true);
  };
  const handleCloseAddRole = () => {
    setOpenAddRole(false);
  };

  const handleOpenMoreRoleInfo = (info) => {
    setMoreRoleInfoTarget(info);
    setOpenMoreRoleInfo(true);
  };

  const handleCloseMoreRoleInfo = () => {
    setMoreRoleInfoTarget({
      id: "",
      role: "",
      authorities: {},
      authorityDescription: [],
    });
    setOpenMoreRoleInfo(false);
  };
  const handleOpenDeleteRole = (id) => {
    setDeleteTargetRoleId(id);
    setOpenDeleteRole(true);
  };

  const handleCloseDeleteRole = () => {
    setDeleteTargetRoleId("");
    setOpenDeleteRole(false);
  };

  const handleOpenEditRoleInfo = (info) => {
    setEditRoleInfoTarget(info);
    setOpenEditRoleInfo(true);
  };
  const handleCloseEditRoleInfo = () => {
    setEditRoleInfoTarget({
      id: "",
      role: "",
      authorities: {},
      authorityDescription: [],
    });
    setOpenEditRoleInfo(false);
  };

  const handleOpenMoreRoleInfoRow = (info) => {
    if (window.innerWidth <= 768) {
      handleOpenMoreRoleInfo(info);
    }
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const {
    data: roleData = [],
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useGetAllRolesQuery({ page, searchRole });
  return (
    <>
      <div>
        <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 px-10">
          <div className="">
            <h2 className="font-[800] text-[0.9rem] md:text-[1.1rem]">
              نقش ها
            </h2>
          </div>
          <div className="w-[50%] md:w-[37%]">
            <FormControl fullWidth>
              <OutlinedInput
                onChange={(event) => {
                  setSearchRole(event.target.value);
                }}
                value={searchRole}
                size="small"
                sx={{
                  fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  fontSize: "0.8rem",
                }}
                placeholder="جستجو نقش"
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
          <div className="">
            {
              <button
                className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
                onClick={handleOpenAddRole}
              >
                <span className="hidden md:inline">ثبت نقش</span>
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
        <section className="py-4 md:px-8 mt-5 bg-white">
          <div className="mt-10 flex justify-evenly gap-8">
            <div className="overflow-x-auto">
              <table className="w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-10 py-4">نام نقش</th>
                    <th className="px-10 py-4 hidden md:table-cell">عملیات</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {isDataLoading
                    ? [...Array(10)].map(() => (
                        <tr className="border-b">
                          <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td className="px-10 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 px-10 py-4 justify-center text-gray70 whitespace-nowrap "
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
                    : roleData?.content?.map((data, index) => (
                        <tr
                          onClick={() => {
                            handleOpenMoreRoleInfoRow(data);
                          }}
                          className="table-row border-b"
                        >
                          <td className="px-6 py-4  text-gray70 whitespace-nowrap ">
                            {index + 1}
                          </td>
                          <td className="px-10 py-4  text-gray70 whitespace-nowrap ">
                            {data.roleName}
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 px-10 py-4 justify-center text-gray70 whitespace-nowrap "
                          >
                            <button
                              onClick={() => {
                                handleOpenMoreRoleInfo(data);
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
                                  handleOpenEditRoleInfo(data);
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
                                  handleOpenDeleteRole(data.id);
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
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            {/*<div className="overflow-x-auto w-2/5">*/}
            {/*    <table*/}
            {/*        className=" w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">*/}
            {/*        <thead className="text-[0.9rem] text-gray80  bg-[#F8F8F8] md:bg-[#F2EDED] ">*/}
            {/*        <tr>*/}
            {/*            <th className="hidden md:table-cell px-6 py-4">#</th>*/}
            {/*            <th className="px-2 md:px-6 py-4">نام نقش</th>*/}
            {/*            <th className="hidden md:table-cell px-6 py-4">عملیات</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody className="table-body">*/}
            {/*        {isDataLoading*/}
            {/*            ? [...Array(10)].map(() => (*/}
            {/*                <tr className="border-b">*/}
            {/*                    <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">*/}
            {/*                        <Skeleton*/}
            {/*                            variant="text"*/}
            {/*                            sx={{fontSize: "1rem"}}*/}
            {/*                        />*/}
            {/*                    </td>*/}
            {/*                    <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">*/}
            {/*                        <Skeleton*/}
            {/*                            variant="text"*/}
            {/*                            sx={{fontSize: "1rem"}}*/}
            {/*                        />*/}
            {/*                    </td>*/}
            {/*                    <td*/}
            {/*                        scope="row"*/}
            {/*                        className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "*/}
            {/*                    >*/}
            {/*                        <Skeleton*/}
            {/*                            variant="rounded"*/}
            {/*                            width={23}*/}
            {/*                            height={23}*/}
            {/*                        />*/}
            {/*                        <Skeleton*/}
            {/*                            variant="rounded"*/}
            {/*                            width={23}*/}
            {/*                            height={23}*/}
            {/*                        />*/}
            {/*                        <Skeleton*/}
            {/*                            variant="rounded"*/}
            {/*                            width={23}*/}
            {/*                            height={23}*/}
            {/*                        />*/}
            {/*                    </td>*/}
            {/*                </tr>*/}
            {/*            ))*/}
            {/*            : roleData?.content?.map((data, index) => {*/}
            {/*                Math.ceil(index / 10) === 2 * page ? (*/}
            {/*                    <tr*/}
            {/*                        onClick={() => {*/}
            {/*                            handleOpenMoreRoleInfoRow(data);*/}
            {/*                        }}*/}
            {/*                        className="table-row border-b"*/}
            {/*                    >*/}
            {/*                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">*/}
            {/*                            {index + 1}*/}
            {/*                        </td>*/}
            {/*                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">*/}
            {/*                            {data.role}*/}
            {/*                        </td>*/}
            {/*                        <td*/}
            {/*                            scope="row"*/}
            {/*                            className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "*/}
            {/*                        >*/}
            {/*                            <button*/}
            {/*                                onClick={() => {*/}
            {/*                                    handleOpenMoreRoleInfo(data);*/}
            {/*                                }}*/}
            {/*                                className="border border-1 border-solid border-gray70 rounded p-[0.4rem] hover:bg-neutral-100"*/}
            {/*                            >*/}
            {/*                                <svg*/}
            {/*                                    xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                    width="18"*/}
            {/*                                    height="18"*/}
            {/*                                    viewBox="0 0 18 18"*/}
            {/*                                    fill="none"*/}
            {/*                                >*/}
            {/*                                    <path*/}
            {/*                                        d="M9 4.56442V4.55554"*/}
            {/*                                        stroke="#797979"*/}
            {/*                                        stroke-linecap="round"*/}
            {/*                                        stroke-linejoin="round"*/}
            {/*                                    />*/}
            {/*                                    <path*/}
            {/*                                        d="M9 13.4445V7.22223"*/}
            {/*                                        stroke="#797979"*/}
            {/*                                        stroke-linecap="round"*/}
            {/*                                        stroke-linejoin="round"*/}
            {/*                                    />*/}
            {/*                                    <path*/}
            {/*                                        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"*/}
            {/*                                        stroke="#797979"*/}
            {/*                                        stroke-linecap="round"*/}
            {/*                                        stroke-linejoin="round"*/}
            {/*                                    />*/}
            {/*                                </svg>*/}
            {/*                            </button>*/}
            {/*                            {*/}
            {/*                                <button*/}
            {/*                                    onClick={() => {*/}
            {/*                                        handleOpenEditRoleInfo(data);*/}
            {/*                                    }}*/}
            {/*                                    className="border border-1 border-solid border-[#2492FF] rounded p-[0.4rem] hover:bg-blue-100"*/}
            {/*                                >*/}
            {/*                                    <svg*/}
            {/*                                        xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                        width="16"*/}
            {/*                                        height="16"*/}
            {/*                                        viewBox="0 0 16 16"*/}
            {/*                                        fill="none"*/}
            {/*                                    >*/}
            {/*                                        <g clip-path="url(#clip0_197_250)">*/}
            {/*                                            <path*/}
            {/*                                                d="M7.3335 2.66666H4.5335C3.41339 2.66666 2.85334 2.66666 2.42552 2.88464C2.04919 3.07639 1.74323 3.38235 1.55148 3.75867C1.3335 4.1865 1.3335 4.74655 1.3335 5.86666V11.4667C1.3335 12.5868 1.3335 13.1468 1.55148 13.5746C1.74323 13.951 2.04919 14.2569 2.42552 14.4487C2.85334 14.6667 3.41339 14.6667 4.5335 14.6667H10.1335C11.2536 14.6667 11.8137 14.6667 12.2415 14.4487C12.6178 14.2569 12.9238 13.951 13.1155 13.5746C13.3335 13.1468 13.3335 12.5868 13.3335 11.4667V8.66666M5.33348 10.6667H6.44984C6.77596 10.6667 6.93902 10.6667 7.09247 10.6298C7.22852 10.5972 7.35858 10.5433 7.47788 10.4702C7.61243 10.3877 7.72773 10.2724 7.95833 10.0418L14.3335 3.66666C14.8858 3.11437 14.8858 2.21894 14.3335 1.66666C13.7812 1.11437 12.8858 1.11437 12.3335 1.66665L5.95832 8.04182C5.72772 8.27242 5.61241 8.38772 5.52996 8.52228C5.45685 8.64157 5.40298 8.77163 5.37032 8.90768C5.33348 9.06113 5.33348 9.22419 5.33348 9.55031V10.6667Z"*/}
            {/*                                                stroke="#2492FF"*/}
            {/*                                                stroke-linecap="round"*/}
            {/*                                                stroke-linejoin="round"*/}
            {/*                                            />*/}
            {/*                                        </g>*/}
            {/*                                        <defs>*/}
            {/*                                            <clipPath id="clip0_197_250">*/}
            {/*                                                <rect*/}
            {/*                                                    width="16"*/}
            {/*                                                    height="16"*/}
            {/*                                                    fill="white"*/}
            {/*                                                />*/}
            {/*                                            </clipPath>*/}
            {/*                                        </defs>*/}
            {/*                                    </svg>*/}
            {/*                                </button>*/}
            {/*                            }*/}
            {/*                            {*/}
            {/*                                <button*/}
            {/*                                    onClick={() => {*/}
            {/*                                        handleOpenDeleteRole(data.id);*/}
            {/*                                    }}*/}
            {/*                                    className="border border-1 border-solid border-[#FE4949] rounded p-[0.4rem] hover:bg-red-100"*/}
            {/*                                >*/}
            {/*                                    <svg*/}
            {/*                                        xmlns="http://www.w3.org/2000/svg"*/}
            {/*                                        width="16"*/}
            {/*                                        height="16"*/}
            {/*                                        viewBox="0 0 16 16"*/}
            {/*                                        fill="none"*/}
            {/*                                    >*/}
            {/*                                        <path*/}
            {/*                                            d="M10.6667 3.99998V3.46665C10.6667 2.71991 10.6667 2.34654 10.5213 2.06133C10.3935 1.81044 10.1895 1.60647 9.93865 1.47864C9.65344 1.33331 9.28007 1.33331 8.53333 1.33331H7.46667C6.71993 1.33331 6.34656 1.33331 6.06135 1.47864C5.81046 1.60647 5.60649 1.81044 5.47866 2.06133C5.33333 2.34654 5.33333 2.71991 5.33333 3.46665V3.99998M6.66667 7.66665V11M9.33333 7.66665V11M2 3.99998H14M12.6667 3.99998V11.4666C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6666 10.5868 14.6666 9.46667 14.6666H6.53333C5.41323 14.6666 4.85318 14.6666 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4666V3.99998"*/}
            {/*                                            stroke="#FE4949"*/}
            {/*                                            stroke-linecap="round"*/}
            {/*                                            stroke-linejoin="round"*/}
            {/*                                        />*/}
            {/*                                    </svg>*/}
            {/*                                </button>*/}
            {/*                            }*/}
            {/*                        </td>*/}
            {/*                    </tr>*/}
            {/*                ) : null;*/}
            {/*            })}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
          </div>
          <div
            className="flex justify-center mb-5 mt-7"
            style={{ direction: "rtl" }}
          >
            <Pagination
              page={page}
              count={roleData.totalPages}
              onChange={handlePagination}
              shape="rounded"
            />
          </div>
        </section>
        <AddRoleDialog
          handleCloseAddRole={handleCloseAddRole}
          openAddRole={openAddRole}
        />
        <MoreRoleInfoDialog
          handleOpenDeleteRole={handleOpenDeleteRole}
          handleOpenEditRoleInfo={handleOpenEditRoleInfo}
          moreRoleInfoTarget={moreRoleInfoTarget}
          openMoreRoleInfo={openMoreRoleInfo}
          handleCloseMoreRoleInfo={handleCloseMoreRoleInfo}
        />
        <DeleteRoleDialog
          deleteTargetRoleId={deleteTargetRoleId}
          openDeleteRole={openDeleteRole}
          handleCloseDeleteRole={handleCloseDeleteRole}
        />
        <EditRoleInfoDialog
          editRoleInfoTarget={editRoleInfoTarget}
          handleCloseEditRoleInfo={handleCloseEditRoleInfo}
          openEditRoleInfo={openEditRoleInfo}
        />
      </div>
    </>
  );
}

export default registerRole;
