"use client";
import React, { useState } from "react";
import {
  Pagination,
  Skeleton,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { useGetAllFleetListQuery } from "@/redux/features/fleet/FleetSlice";
import {useEffect} from "react";

export default function registerOrganization() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeIndividualList = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [page, setPage] = useState(1);
  const handlePagination = (event, value) => {
    setPage(value);
  };

  const {
    data: organizationList = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllFleetListQuery({ page }, { refetchOnMountOrArgChange: true });

  const [nameOfFleet,setNameOfFleet]= useState("")
  useEffect(()=>{
    setNameOfFleet(window.sessionStorage.getItem("organizationName"))
  },[])


  const [showPage, setShowPage] = useState("organ");
  return (
    <div>
      {/* {showPage === "organ" && (
        <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 lg:px-10 px-4">
          <div className="">
            <h2 className="font-[800] md:text-[1.1rem] text-[0.9rem]">
              ناوگان
            </h2>
          </div>
        </header>
      )} */}
      <div>
        <div>
          {showPage === "organ" && (
            <div className="flex justify-between items-center text-[0.9rem] bg-white py-4  lg:px-10 px-4">
              <div className="flex justify-start items-center gap-2 font-[800] text-[0.9rem] md:text-[1.1rem]">
                <span>ناوگان :</span>
                <h2 className="">
                  {nameOfFleet}
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
                          <div
                            scope="row"
                            className="lg:flex hidden gap-2 px-6  justify-start text-gray70 whitespace-nowrap "
                          >
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                          </div>
                          <div className="table-cell px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6  hidden xl:table-cell  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div className="px-2 md:px-6 hidden xl:table-cell  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>

                          <div className="table-cell px-6   text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </div>
                          <div
                            scope="row"
                            className="flex gap-2 px-6  justify-end text-gray70 whitespace-nowrap "
                          >
                            <Skeleton
                              variant="rounded"
                              width={23}
                              height={23}
                            />
                          </div>
                        </tr>
                      ))
                    : organizationList.content?.map((item, index) => (
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
                                      اسم گروه :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {item.subOrganizationName}
                                    </span>
                                  </div>
                                  <div className="px-2 md:px-6  hidden xl:table-cell xl:w-1/4   gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      ظرفیت :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {item.capacity}
                                    </span>
                                  </div>

                                  <div className="px-2 md:px-6    xl:table-cell xl:w-1/4  hidden gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      واحد :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {item.unit}
                                    </span>
                                  </div>
                                  <div className="px-2 md:px-6   sm:flex sm:w-1/3 xl:w-1/4  hidden gap-2 text-gray70 whitespace-nowrap ">
                                    <span className="text-[#4E4E4E]">
                                      نوع :{" "}
                                    </span>
                                    <span className=" text-sm">
                                      {item.type}
                                    </span>
                                  </div>

                                  <div
                                    scope="row"
                                    className="hidden sm:flex gap-2 px-6  justify-center text-gray70 whitespace-nowrap ">
                                    <button
                                      onClick={() => {
                                        handleChangeIndividualList(
                                          `panel${organizationList.id + index}`
                                        );
                                      }}
                                      className="border border-1 border-solid border-[#797979] rounded p-[0.4rem] hover:bg-red-100"
                                    >
                                      <svg
                                        className={
                                          expanded ===
                                          `panel${organizationList.id + index}`
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
                                <div className="  sm:px-16  ">
                                  <div className="overflow-x-auto  border-r border-dotted border-black">
                                    <table className=" w-full overflow-scroll individual-table border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                      <tbody className=" ">
                                        {item.machines?.map(
                                          (machine, index) => (
                                            <tr className=" individual-table flex justify-between py-2 items-center ">
                                              <Typography
                                                sx={{
                                                  fontFamily:
                                                    "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                }}
                                                className="flex gap-2 items-center w-1/2 lg:w-2/5 xl:1/3"
                                              >
                                                <span className="text-[#4E4E4E] text-sm  pr-2 ">
                                                  نوع وسیله :
                                                </span>
                                                <span className=" text-sm">
                                                  {machine?.type}
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
                                                  کد وسیله:
                                                </span>
                                                <span className=" text-sm">
                                                  {machine?.code}
                                                </span>
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontFamily:
                                                    "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                }}
                                                className="w-1/3 sm:flex hidden  gap-2 items-center"
                                              >
                                                <span className="text-[#4E4E4E] text-sm ">
                                                  {" "}
                                                  پلاک:
                                                </span>
                                                <span className=" text-sm">
                                                  {machine?.tag &&
                                                    machine?.tag?.slice(2, 5) +
                                                      "-" +
                                                      machine?.tag?.slice(
                                                        5,
                                                        7
                                                      ) +
                                                      " " +
                                                      machine?.tag?.slice(
                                                        7,
                                                        8
                                                      ) +
                                                      " " +
                                                      machine?.tag?.slice(0, 2)}
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
                                                  وضعیت:
                                                </span>
                                                <span className=" text-sm">
                                                  {machine?.status ===
                                                  "IN_USE" ? (
                                                    <span className="text-[0.8rem] bg-[#D5EAFF] text-[#2492FF] py-1 px-2 rounded-xl">
                                                      در حال استفاده
                                                    </span>
                                                  ) : machine?.status ===
                                                    "AVAILABLE" ? (
                                                    <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                                      دردسترس
                                                    </span>
                                                  ) : (
                                                    <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                                                      خراب
                                                    </span>
                                                  )}
                                                </span>
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontFamily:
                                                    "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                }}
                                                className="w-1/4 2xl:flex hidden gap-2 items-center"
                                              >
                                                <span className="text-[#4E4E4E] text-sm ">
                                                  جی پی اس:
                                                </span>
                                                <span className=" text-sm">
                                                  {machine?.hasGps ? (
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M5.5 10L8.5 13L14.5 7M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z"
                                                        stroke="#12D377"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width="24"
                                                      height="24"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                    >
                                                      <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                      />
                                                      <path
                                                        d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                                                        stroke="#4D51DF"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      />
                                                    </svg>
                                                  )}
                                                </span>
                                              </Typography>
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
                                  اسم گروه :{" "}
                                </span>
                                <span className=" ">
                                  {item.subOrganizationName}
                                </span>
                              </div>
                              <div className=" flex gap-2 text-xs text-gray70 whitespace-nowrap ">
                                <span className="text-[#4E4E4E]">نوع : </span>
                                <span className=" ">{item.type}</span>
                              </div>
                              <div
                                scope="row"
                                className=" flex  gap-1   justify-center text-gray70 whitespace-nowrap "
                              >
                                <button
                                  onClick={() => {
                                    setShowPage(item?.subOrganizationId);
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
                          {showPage === item?.subOrganizationId && (
                            <div>
                              <div className="bg-white flex justify-end px-2 pt-1">
                                <button
                                  onClick={() => setShowPage("organ")}
                                  className="flex justify-center border-mainRed border text-white items-center text- p-[0.3rem] rounded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M6 12L10 8L6 4"
                                      stroke="#4D51DF"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 lg:px-10 px-4">
                                <div className="flex justify-start items-center gap-2">
                                  <span className="font-[800] md:text-[1.1rem] text-black text-[0.9rem]">
                                    ناوگان :
                                  </span>
                                  <h2 className="font-[800] md:text-[1.1rem] text-black text-[0.9rem]">
                                    {nameOfFleet}
                                  </h2>
                                </div>
                              </header>
                              <div className="flex flex-col   text-[0.9rem] bg-white py-6">
                                <div className="space-y-3 border-b border-gray30 pb-4 px-4">
                                  <div className="border border-gray30">
                                    <div className="px-2 md:px-6 w-1/4 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        اسم گروه :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {item?.subOrganizationName}
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
                                        {item?.capacity}
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
                                        {item?.unit}
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
                                        {item?.type}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {item.machines?.map((machine, index) => (
                                  <div className="flex items-center justify-between">
                                    <div className="px-4 w-2/5  py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        {" "}
                                        نوع وسیله :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {machine?.type}
                                      </span>
                                    </div>
                                    <div className="px-4 w-1/4  py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        {" "}
                                        کد وسیله :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {machine?.code}
                                      </span>
                                    </div>
                                    <div className="px-4 w-1/3 py-3 flex items-center gap-2 text-gray70 whitespace-nowrap ">
                                      <span className="text-[#4E4E4E]">
                                        {" "}
                                        پلاک :{" "}
                                      </span>
                                      <span className=" text-sm">
                                        {machine?.tag &&
                                          machine?.tag?.slice(2, 5) +
                                            "-" +
                                            machine?.tag?.slice(5, 7) +
                                            " " +
                                            machine?.tag?.slice(7, 8) +
                                            " " +
                                            machine?.tag?.slice(0, 2)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="flex justify-center mb-5 mt-7"
          style={{ direction: "rtl" }}
        >
          <Pagination
            page={page}
            count={organizationList.totalPages}
            onChange={handlePagination}
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}
