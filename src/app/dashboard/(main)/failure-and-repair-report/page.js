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

import AddDataDialog from "@/components/Dashboard/failure-and-repair-report/AddDataDialog";
import FilterDialog from "@/components/Dashboard/failure-and-repair-report/FilterDialog";
import MoreInfoDialog from "@/components/Dashboard/failure-and-repair-report/MoreInfoDialog";

import Link from "next/link";

import { useSelector } from "react-redux";
import { boolean } from "yup";
import { useGetAllFailureVehiclesQuery } from "@/redux/features/failure-and-repair-report/FailureAndRepairReportSlice";
import FixFailureDialog from "@/components/Dashboard/failure-and-repair-report/FixFailureDialog";

function FailureAndRepairReport() {
  let permission = useSelector(
    (state) => state.access?.pages?.primaryStoreInput
  );

  const [openFix, setOpenFix] = useState(false);
  const [fixTarget, setFixTarget] = useState({
    type: "",
    tag: "",
    code: "",
    status: "",
    subOrganizationId: "",
    subOrganizationName: "",
    purchaseDate: "",
  });
  const handleOpenFix = (info) => {
    setFixTarget(info);
    setOpenFix(true);
  };

  const handleCloseFix = () => {
    setFixTarget({
      type: "",
      tag: "",
      status: "",
      subOrganizationId: "",
      subOrganizationName: "",
    });
    setOpenFix(false);
  };

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("desc");
  const [openAddData, setOpenAddData] = useState(false);

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [moreInfoTarget, setMoreInfoTarget] = useState({
    type: "",
    tag: "",
    code: "",
    status: "",
    subOrganizationId: "",
    subOrganizationName: "",
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
      type: "",
      tag: "",
      code: "",
      hasGps: false,
      gpsURL: "",
      status: "",
      subOrganizationId: "",
      subOrganizationName: "",
      purchaseDate: "",
    });
    setOpenMoreInfo(false);
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
  } = useGetAllFailureVehiclesQuery(
    { page, sort, filterItem },
    { refetchOnMountOrArgChange: true }
  );
  // isPrimaryStoreInputReadAll
  //     :
  //     true
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
              گزارش خرابی و تعمیرات
            </h2>
          </div>
          <div className="">
            <button
              className="flex bg-mainRed text-white items-center text- px-3 py-2 rounded-full md:rounded"
              onClick={handleOpenAddData}
            >
              <span className="hidden md:inline">ثبت خرابی</span>
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
          </div>
        </header>
        <section className="py-4 md:px-8 mt-5 bg-white h-[50rem]">
          <div className="px-4 flex justify-end">
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
                    <th className="px-2 md:px-6 py-4">وسیله و پلاک</th>
                    <th className="px-2 md:px-6 px-6 py-4">گروه</th>
                    <th className="px-2 md:px-6 px-6 py-4">تاریخ خرابی</th>
                    <th className="hidden md:table-cell px-6 py-4">توضیحات</th>
                    <th className="px-2 md:px-6 px-6 py-4">
                      <span className="inline">وضعیت</span>
                    </th>
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
                          <td className="px-2 md:px-6 py-2  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem" }}
                            />
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            <div className="flex justify-center">
                              <Skeleton
                                variant="rounded"
                                width={50}
                                height={20}
                              />
                            </div>
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
                            <div>{data?.machine?.type}</div>
                            <div className="mt-1 text-gray9F text-[0.75rem]">
                              {data?.machine?.code === null
                                ? data?.machine?.tag?.slice(2, 5) +
                                  "-" +
                                  data?.machine?.tag?.slice(5, 7) +
                                  " " +
                                  data?.machine?.tag?.slice(7, 8) +
                                  " " +
                                  data?.machine?.tag?.slice(0, 2)
                                : data?.machine?.code}
                            </div>
                          </td>
                          <td className="px-2 md:px-6 py-4 flex justify-center  text-gray70 whitespace-nowrap ">
                            {data?.machine?.subOrganizationName}
                          </td>
                          <td className="px-2 md:px-6 py-2  text-gray70 whitespace-nowrap ">
                            <span className="pr-2">{data?.date}</span>
                            <span>{data?.time}</span>
                          </td>
                          <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                            {data?.description}
                          </td>
                          <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                            {data.status === "IN_USE" ? (
                              <span className="text-[0.8rem] bg-[#D5EAFF] text-[#2492FF] py-1 px-2 rounded-xl">
                                در حال استفاده
                              </span>
                            ) : data.status === "AVAILABLE" ? (
                              <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                                دردسترس
                              </span>
                            ) : (
                              <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                                خراب
                              </span>
                            )}
                          </td>
                          <td
                            scope="row"
                            className="hidden md:flex gap-2 px-6 py-4 justify-center text-gray70 whitespace-nowrap "
                          >
                            {
                              <button
                                onClick={() => {
                                  handleOpenFix(data);
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
                                    d="M11.6721 7.28437H11.6719C11.5973 7.28437 11.5257 7.28208 11.4566 7.27705L11.4566 7.27702L11.4517 7.27671C10.6351 7.22527 9.62425 7.38441 8.98838 8.14745L8.98836 8.14748L3.77946 14.3992C3.77941 14.3993 3.77936 14.3993 3.77931 14.3994C3.61412 14.597 3.40961 14.758 3.17879 14.8723C2.9479 14.9865 2.69575 15.0515 2.43838 15.063C2.18101 15.0745 1.92408 15.0322 1.68393 14.939C1.44377 14.8457 1.22567 14.7035 1.0435 14.5213C0.861339 14.3391 0.719099 14.121 0.625843 13.8809C0.532587 13.6407 0.490359 13.3838 0.501846 13.1264C0.513333 12.8691 0.578284 12.6169 0.692563 12.386C0.806785 12.1553 0.967784 11.9508 1.16532 11.7856C1.16542 11.7855 1.16552 11.7854 1.16562 11.7854L7.41734 6.57646L7.41737 6.57644C8.18041 5.94057 8.33955 4.92974 8.28811 4.11311L8.28804 4.11203C8.25205 3.55987 8.35172 3.00729 8.57833 2.5025C8.80495 1.9977 9.15163 1.55602 9.58815 1.21598C10.0247 0.875938 10.5378 0.647866 11.0827 0.551658C11.5614 0.467135 12.0519 0.486645 12.521 0.607907L10.3177 2.80956C10.1924 2.93101 10.1054 3.08653 10.0674 3.25697C10.029 3.42966 10.0427 3.60988 10.1068 3.7748L10.1066 3.77486L10.1116 3.78672C10.4268 4.53982 11.026 5.13837 11.7795 5.45263L11.7795 5.45277L11.791 5.45725C11.9558 5.52125 12.1359 5.53486 12.3085 5.49636C12.4787 5.45838 12.634 5.3714 12.7553 5.24622L14.9569 3.0446C15.0735 3.49588 15.0959 3.96709 15.0221 4.42874C14.9376 4.95676 14.7294 5.45731 14.4146 5.88955C14.0998 6.32179 13.6873 6.67346 13.2106 6.91587C12.734 7.15828 12.2068 7.28455 11.6721 7.28437Z"
                                    stroke="#DB3746"
                                  />
                                  <path
                                    d="M11.2963 9.56927L11.2963 9.5694L11.308 9.57013C11.4292 9.57771 11.5512 9.58148 11.6739 9.58148C11.7575 9.58148 11.8413 9.57975 11.9249 9.57612L15.0112 12.6624C15.3229 12.9741 15.498 13.3969 15.498 13.8377C15.498 14.2786 15.3229 14.7014 15.0112 15.0131C14.6995 15.3248 14.2767 15.5 13.8358 15.5C13.395 15.5 12.9722 15.3248 12.6604 15.0131L9.16964 11.5223L10.7434 9.63329C10.7527 9.62856 10.7713 9.62017 10.8028 9.61042C10.9638 9.56893 11.1307 9.55501 11.2963 9.56927ZM3.82331 3.10244V3.30955L3.96976 3.456L5.60849 5.09473L5.04586 5.56346L3.45408 3.97168L3.30763 3.82523H3.10053H2.03802L0.608398 0.9643L0.962958 0.609741L3.82331 2.03908V3.10244Z"
                                    stroke="#DB3746"
                                  />
                                </svg>
                              </button>
                            }
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
          moreInfoTarget={moreInfoTarget}
          openMoreInfo={openMoreInfo}
          handleCloseMoreInfo={handleCloseMoreInfo}
          handleOpenFix={handleOpenFix}
        />
        <FixFailureDialog
          fixTarget={fixTarget}
          openFix={openFix}
          handleCloseFix={handleCloseFix}
        />
      </div>
    </>
  );
}

export default FailureAndRepairReport;
