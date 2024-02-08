"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/login.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Drawer, Menu } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAccessQuery } from "@/redux/features/access/getAccessSlice";
import { setAccess } from "@/redux/permission/accessSlice";
import { useLazyGetCounterOfDashboardNotificationQuery } from "@/redux/features/notification/NotificationCounterDashboardSlice";
import { useSubscription } from "react-stomp-hooks";
import { toast } from "react-toastify";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl",
});
import { useLazyGetLastFiveNotificationDashboardListQuery } from "@/redux/features/notification/NotificationDashboardSlice";
export default function RootLayout({ children }) {
  const [subOrganizationId, setSubOrganizationId] = useState();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setSubOrganizationId(window.sessionStorage.getItem("subOrganizationId"));
    setUserInfo({
      name: window.sessionStorage.getItem("name"),
      subOrganizationName: window.sessionStorage.getItem("subOrganizationName"),
    });
  }, []);
  const [LatestNotification, setLatestNotification] = useState(null);
  const [openLatestNotificationList, setOpenLatestNotificationList] =
    useState(false);

  const [
    getLatestNotificationList,
    {
      data: latestNotificationList = [],
      isLoading: isLatestNotificationListLoading,
      isError: latestNotificationListIsError,
    },
  ] = useLazyGetLastFiveNotificationDashboardListQuery();
  useEffect(() => {
    getLatestNotificationList();
  }, [openLatestNotificationList]);

  useSubscription(`/topic/latest`, (message) => {
    const obj = JSON.parse(message.body);
    console.log(obj);
    toast.info(obj.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });

  const pathname = usePathname();
  const dispatch = useDispatch();
  const [
    getCounterList,
    {
      data: counterList = [],
      isLoading: isCounterLoading,
      isError: counterIsError,
    },
  ] = useLazyGetCounterOfDashboardNotificationQuery();
  useEffect(() => {
    getCounterList();
  }, [pathname]);

  const [openAlertMenu, setOpenAlertMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);

  const [openSidebar, setOpenSidebar] = useState(false);

  const openProfile = Boolean(anchorElProfile);
  const open = Boolean(anchorEl);

  const handleOpenAlertMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenLatestNotificationList(!openLatestNotificationList);
  };
  const handleCloseAlertMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleOpenSidebar = (event) => {
    setOpenSidebar(true);
  };
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
  };

  const [
    getAccess,
    { data: accessData = {}, isLoading: isLoadingAccess, error: errorAccess },
  ] = useLazyGetAccessQuery();

  const handleGetAccess = async () => {
    const access = await getAccess();
    dispatch(setAccess(access.data));
  };

  useEffect(() => {
    handleGetAccess();
  }, []);

  return (
    <>
      <div className="">
        <header className="flex items-center justify-between bg-white w-full py-4 md:py-6 px-5 md:px-14">
          <div className="block md:hidden">
            <button onClick={handleOpenSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M4 16H28M4 8H28M4 24H28"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="w-[6rem] md:w-[7rem]">
            <Image
              src="/monaco.svg"
              alt="costumer"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 md:border md:border-borderGray rounded"
              onClick={handleOpenAlertMenu}
            >
              <div className="relative">
                <img src="/icons/bell.svg" alt="bell" />
                <div className="absolute -top-1.5 -right-1">
                  <span className=" rounded-full bg-mainRed w-[1rem] h-[1rem] text-[0.49rem] flex  items-center justify-center text-center text-white">
                    {counterList > 99 ? "99+" : counterList}
                  </span>
                </div>
              </div>
            </button>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleCloseAlertMenu}
              onClick={handleCloseAlertMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  width: "20rem",
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
              <div className="px-5 py-2">
                <div className="flex justify-center items-center pt-2 pb-4">
                  <h4 className="text-[0.9rem] text-">آخرین پیام ها</h4>
                </div>
                {latestNotificationList?.content?.map((item, index) => (
                  <div className="py-3 border-t border-t-[#D9D9D9]">
                    <div className="flex justify-between">
                      <h4 className="text-[0.9rem]">اعلان جدید</h4>
                      <span className="text-[0.7rem] text-[#9F9F9F]">
                        {item?.date}
                      </span>
                    </div>
                    <div className="mt-2 ">
                      <div className="flex justify-between items-center">
                        <p className="text-[0.8rem] text-gray70">
                          {item?.message}
                        </p>
                        {item?.priority === "HIGH" ? (
                          <svg
                            fill="#f5516f"
                            width="13px"
                            height="13px"
                            viewBox="0 0 15 15"
                            version="1.1"
                            id="circle"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
                          </svg>
                        ) : item?.priority === "MEDIUM" ? (
                          <svg
                            fill="#f1d150"
                            width="13px"
                            height="13px"
                            viewBox="0 0 15 15"
                            version="1.1"
                            id="circle"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
                          </svg>
                        ) : (
                          <svg
                            fill="#22e032"
                            width="13px"
                            height="13px"
                            viewBox="0 0 15 15"
                            version="1.1"
                            id="circle"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14,7.5c0,3.5899-2.9101,6.5-6.5,6.5S1,11.0899,1,7.5S3.9101,1,7.5,1S14,3.9101,14,7.5z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {latestNotificationList?.numberOfElements === 0 && (
                  <div className="flex justify-center pb-1 tex-sm">
                    <p>پیام جدیدی موجود نیست</p>
                  </div>
                )}

                <div className="py-3 border-t border-t-[#D9D9D9] flex justify-center">
                  <Link
                    href="/dashboard/notification"
                    className="text-[0.8rem] text-[#48B2FF]"
                  >
                    مشاهده همه
                  </Link>
                </div>
              </div>
            </Menu>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-12 h-12 md:w-10 md:h-10 border border-solid border-1 border-borderGray rounded">
                <Image
                  src="/user.png"
                  alt="costumer"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <button
                  className="flex items-center text-textGray text-[0.8rem] tracking-tighter"
                  onClick={handleOpenProfileMenu}
                >
                  حساب کاربری من
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M11.3332 6.33334L7.99984 9.66667L4.6665 6.33334"
                      stroke="#29262A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <Menu
                anchorEl={anchorElProfile}
                id="account-menu"
                open={openProfile}
                onClose={handleCloseProfileMenu}
                onClick={handleCloseProfileMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    width: "14rem",
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
                <div className="px-5 py-2">
                  <div className="flex gap-4 justify-start items-center pt-2 pb-4">
                    <div className="w-12 h-12 md:w-10 md:h-10 border border-solid border-1 border-borderGray rounded">
                      <img
                        className="w-full cover"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="profile"
                      />
                    </div>
                    <div>
                      <h3 className="text-[0.9rem] mb-1 tracking-tighter">
                        {userInfo.name}
                      </h3>
                      <p className="text-[0.7rem] text-gray9F tracking-tighter">
                        {userInfo.subOrganizationName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      href="/dashboard/user-account"
                      className="flex gap-2 py-3 px-4 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                            stroke="#797979"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray70 text-[0.9rem]">
                        حساب کاربری
                      </span>
                    </Link>
                    <Link
                      href="https://auth.prod.aunexa.net/logout"
                      className="flex gap-2 py-3 px-4 hover:bg-neutral-100 border-t border-t-[#D9D9D9]"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H12M17 16L21 12M21 12L17 8M21 12H9"
                            stroke="#797979"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-gray70 text-[0.9rem]">خروج</span>
                    </Link>
                  </div>
                </div>
              </Menu>
            </div>
          </div>
        </header>

        <div className="flex justify-center px-3 md:px-0  ">
          <div className="">
            <Drawer
              anchor={"right"}
              open={openSidebar}
              onClose={handleCloseSidebar}
            >
              <div className="w-[17rem] h-screen bg-white">
                <div className="flex justify-end m-3">
                  <button className="p-4" onClick={handleCloseSidebar}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M11 1L1 11M1 1L11 11"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-[6rem] md:w-[3rem]">
                    <Image
                      src="/monaco.svg"
                      alt="costumer"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div>
                    <Link
                      href="/panel"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/panel"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        پنل
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/dashboard"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        داشبورد
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/tracking"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/tracking"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        ردیابی
                      </span>
                    </Link>
                  </div>
                  <div>
                    <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                      <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                          گزارش ها
                        </span>
                        <svg
                          className="transition group-open:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="#9F9F9F"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </summary>
                      <ul className="flex flex-col gap-1 pr-2">
                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/reports/new-report"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname === "/dashboard/reports/new-report"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              گزارش جدید
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/reports/history-of-reports"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/reports/history-of-reports"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              سابقه گزارش ها
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </div>
                  <div>
                    <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                      <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                          ژئوفنس
                        </span>
                        <svg
                          className="transition group-open:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="#9F9F9F"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </summary>
                      <ul className="flex flex-col gap-1 pr-2">
                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/geofence/geographicArea"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/geofence/geographicArea"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              ناحیه جغرافیایی
                            </span>
                          </Link>
                        </li>
                        {/*<li>*/}
                        {/*  <Link*/}
                        {/*    onClick={handleCloseSidebar}*/}
                        {/*    href="/dashboard/geofence/group"*/}
                        {/*    className="block py-2 px-5"*/}
                        {/*  >*/}
                        {/*    <span*/}
                        {/*      className={*/}
                        {/*        pathname === "/dashboard/geofence/group"*/}
                        {/*          ? "text-mainRed text-[0.9rem]"*/}
                        {/*          : "text-gray9F hover:text-textGray text-[0.9rem]"*/}
                        {/*      }*/}
                        {/*    >*/}
                        {/*      گروه*/}
                        {/*    </span>*/}
                        {/*  </Link>*/}
                        {/*</li>*/}
                      </ul>
                    </details>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/fleet"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/fleet"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        ناوگان
                      </span>
                    </Link>
                  </div>
                  <div>
                    <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                      <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                          وسایل و تجهیزات
                        </span>
                        <svg
                          className="transition group-open:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="#9F9F9F"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </summary>
                      <ul className="flex flex-col gap-1 pr-2">
                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/vehicles-and-equipment"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname === "/dashboard/vehicles-and-equipment"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              وسایل و تجهیزات
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/failure-and-repair-report"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/failure-and-repair-report"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              گزارش خرابی و تعمیرات
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/history-of-reports"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname === "/dashboard/history-of-reports"
                                  ? "text-mainRed text-[0.9rem]"
                                  : "text-gray9F hover:text-textGray text-[0.9rem]"
                              }
                            >
                              سابقه گزارشات
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/purchase-request"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/purchase-request"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        درخواست خرید
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/products"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/products"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        کالا و محصولات
                      </span>
                    </Link>
                  </div>
                  <div>
                    <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                      <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                        <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                          خرید
                        </span>
                        <svg
                          className="transition group-open:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10 4L6 8L10 12"
                            stroke="#9F9F9F"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </summary>
                      <ul className="flex flex-col gap-1 pr-2">
                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/purchase/purchase-request-list"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/purchase/purchase-request-list"
                                  ? "text-mainRed text-[0.8rem]"
                                  : "text-gray9F hover:text-textGray text-[0.8rem]"
                              }
                            >
                              لیست درخواست‌های خرید
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/purchase/pending-purchase-request-list"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/purchase/pending-purchase-request-list"
                                  ? "text-mainRed text-[0.8rem]"
                                  : "text-gray9F hover:text-textGray text-[0.8rem]"
                              }
                            >
                              صفحه در انتظار خرید
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/purchase/successful-purchase-request-list"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/purchase/successful-purchase-request-list"
                                  ? "text-mainRed text-[0.8rem]"
                                  : "text-gray9F hover:text-textGray text-[0.8rem]"
                              }
                            >
                              صفحه کالاهای خریداری شده
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={handleCloseSidebar}
                            href="/dashboard/purchase/unsuccessful-purchase-request-list"
                            className="block py-2 px-5"
                          >
                            <span
                              className={
                                pathname ===
                                "/dashboard/purchase/unsuccessful-purchase-request-list"
                                  ? "text-mainRed text-[0.8rem]"
                                  : "text-gray9F hover:text-textGray text-[0.8rem]"
                              }
                            >
                              صفحه درخواستهای رد شده
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </div>
                  <div>
                    <Link
                      href="/dashboard/invoice/purchase-invoice"
                      onClick={handleCloseSidebar}
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/invoice/purchase-invoice"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        فاکتور خرید
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/employees"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/employees"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        کارمندان
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/register/role"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/register/role"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        ثبت نقش
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/dashboard/ticket"
                      onClick={handleCloseSidebar}
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/ticket"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        تیکت
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/user-account"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span
                        className={
                          pathname === "/dashboard/user-account"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        حساب کاربری
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="/dashboard/notification"
                      className=" py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray flex justify-between"
                    >
                      <span
                        className={
                          pathname === "/dashboard/notification"
                            ? "text-mainRed text-[0.9rem]"
                            : "text-gray9F hover:text-textGray text-[0.9rem]"
                        }
                      >
                        اعلانیه
                      </span>
                      <span className=" rounded-lg bg-mainRed w-[1.5rem] text-[0.59rem] h-[1.2rem]  flex  items-center justify-center text-center text-white">
                        {pathname === "/dashboard/notification"
                          ? 0
                          : counterList > 99
                          ? "99+"
                          : counterList}
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={handleCloseSidebar}
                      href="https://auth.prod.aunexa.net/logout"
                      className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                    >
                      <span className="text-gray9F hover:text-textGray text-[0.9rem]">
                        خروج
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Drawer>
          </div>
          <div className="hidden md:block mt-5 md:mr-5  md:w-[30%] lg:w-[15%] bg-white">
            <div className="px-4 py-3">
              <div>
                <Link
                  href="/panel"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/panel"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    پنل
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  href="/dashboard"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    داشبورد
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  href="/dashboard/tracking"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/tracking"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    ردیابی
                  </span>
                </Link>
              </div>
              <div>
                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                      گزارش ها
                    </span>
                    <svg
                      className="transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 4L6 8L10 12"
                        stroke="#9F9F9F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="flex flex-col gap-1 pr-2">
                    <li>
                      <Link
                        href="/dashboard/reports/new-report"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/reports/new-report"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          گزارش جدید
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard/reports/history-of-reports"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/reports/history-of-reports"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          سابقه گزارش ها
                        </span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </div>
              <div>
                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                      ژئوفنس
                    </span>
                    <svg
                      className="transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 4L6 8L10 12"
                        stroke="#9F9F9F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="flex flex-col gap-1 pr-2">
                    <li>
                      <Link
                        href="/dashboard/geofence/geographicArea"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/geofence/geographicArea"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          ناحیه جغرافیایی
                        </span>
                      </Link>
                    </li>
                    {/*<li>*/}
                    {/*  <Link*/}
                    {/*    href="/dashboard/geofence/group"*/}
                    {/*    className="block py-2 px-5"*/}
                    {/*  >*/}
                    {/*    <span*/}
                    {/*      className={*/}
                    {/*        pathname === "/dashboard/geofence/group"*/}
                    {/*          ? "text-mainRed text-[0.9rem]"*/}
                    {/*          : "text-gray9F hover:text-textGray text-[0.9rem]"*/}
                    {/*      }*/}
                    {/*    >*/}
                    {/*      گروه*/}
                    {/*    </span>*/}
                    {/*  </Link>*/}
                    {/*</li>*/}
                  </ul>
                </details>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/fleet"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/fleet"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    ناوگان
                  </span>
                </Link>
              </div>
              <div>
                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                      وسایل و تجهیزات
                    </span>
                    <svg
                      className="transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 4L6 8L10 12"
                        stroke="#9F9F9F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="flex flex-col gap-1 pr-2">
                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/vehicles-and-equipment"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/vehicles-and-equipment"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          وسایل و تجهیزات
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/failure-and-repair-report"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/failure-and-repair-report"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          گزارش خرابی و تعمیرات
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/history-of-reports"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname === "/dashboard/history-of-reports"
                              ? "text-mainRed text-[0.9rem]"
                              : "text-gray9F hover:text-textGray text-[0.9rem]"
                          }
                        >
                          سابقه گزارشات
                        </span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/purchase-request"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/purchase-request"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    درخواست خرید
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/products"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/products"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    کالا و محصولات
                  </span>
                </Link>
              </div>
              <div>
                <details className="group py-3 border-b border-b-1 border-b-solid  border-b-borderGray">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="text-gray9F group-open:text-textGray text-[0.9rem]">
                      خرید
                    </span>
                    <svg
                      className="transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10 4L6 8L10 12"
                        stroke="#9F9F9F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <ul className="flex flex-col gap-1 pr-2">
                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/purchase/purchase-request-list"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname ===
                            "/dashboard/purchase/purchase-request-list"
                              ? "text-mainRed text-[0.8rem]"
                              : "text-gray9F hover:text-textGray text-[0.8rem]"
                          }
                        >
                          لیست درخواست‌های خرید
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/purchase/pending-purchase-request-list"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname ===
                            "/dashboard/purchase/pending-purchase-request-list"
                              ? "text-mainRed text-[0.8rem]"
                              : "text-gray9F hover:text-textGray text-[0.8rem]"
                          }
                        >
                          صفحه در انتظار خرید
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/purchase/successful-purchase-request-list"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname ===
                            "/dashboard/purchase/successful-purchase-request-list"
                              ? "text-mainRed text-[0.8rem]"
                              : "text-gray9F hover:text-textGray text-[0.8rem]"
                          }
                        >
                          صفحه کالاهای خریداری شده
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={handleCloseSidebar}
                        href="/dashboard/purchase/unsuccessful-purchase-request-list"
                        className="block py-2 px-5"
                      >
                        <span
                          className={
                            pathname ===
                            "/dashboard/purchase/unsuccessful-purchase-request-list"
                              ? "text-mainRed text-[0.8rem]"
                              : "text-gray9F hover:text-textGray text-[0.8rem]"
                          }
                        >
                          صفحه درخواستهای رد شده
                        </span>
                      </Link>
                    </li>
                  </ul>
                </details>
              </div>
              <div>
                <Link
                  href="/dashboard/invoice/purchase-invoice"
                  onClick={handleCloseSidebar}
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/invoice/purchase-invoice"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    فاکتور خرید
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/employees"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/employees"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    کارمندان
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/register/role"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/register/role"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    ثبت نقش
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  href="/dashboard/ticket"
                  onClick={handleCloseSidebar}
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/ticket"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    تیکت
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/user-account"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/user-account"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    حساب کاربری
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="/dashboard/notification"
                  className="flex justify-between items-center py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span
                    className={
                      pathname === "/dashboard/notification"
                        ? "text-mainRed text-[0.9rem]"
                        : "text-gray9F hover:text-textGray text-[0.9rem]"
                    }
                  >
                    اعلانیه
                  </span>
                  <span className=" rounded-lg bg-mainRed w-[1.5rem] text-[0.59rem] h-[1.2rem]  flex  items-center justify-center text-center text-white">
                    {pathname === "/dashboard/notification"
                      ? 0
                      : counterList > 99
                      ? "99+"
                      : counterList}
                  </span>
                </Link>
              </div>
              <div>
                <Link
                  onClick={handleCloseSidebar}
                  href="https://auth.prod.aunexa.net/logout"
                  className="block py-4 px-2 border-b border-b-1 border-b-solid  border-b-borderGray"
                >
                  <span className="text-gray9F hover:text-textGray text-[0.9rem]">
                    خروج
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-1 md:m-5 h-screen w-full md:w-[70%] lg:w-[85%]">
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </CacheProvider>
          </div>
        </div>
      </div>
    </>
  );
}
