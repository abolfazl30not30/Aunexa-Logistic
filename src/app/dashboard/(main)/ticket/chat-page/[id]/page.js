"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Skeleton } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSaveChatMutation } from "@/redux/features/ticket/ChatSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import { TailSpin } from "react-loader-spinner";
import { useGetAllChatsQuery } from "@/redux/features/ticket/ChatSlice";
export default function page({ params }) {
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);
  const scrollbars = useRef(null);
  const renderView = ({ style, ...reset }) => {
    const customStyle = {
      marginLeft: "-19px",
      left: "2px",
      overflowX: "hidden",
    };
    return <div {...reset} style={{ ...style, ...customStyle }} />;
  };
  const renderThumbVertical = ({ style, ...reset }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#d9d9d9",
      left: "2px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...reset} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: "absolute",
      width: "6px",
      transition: "opacity 200ms ease 0s",
      opacity: 0,
      left: "6px",
      bottom: "2px",
      top: "2px",
      borderRadius: "3px",
    };
    return <div style={thumbStyle} />;
  };

  const renderThumbHorizontal = ({ style, ...reset }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "#F1F2F6",
    };
    return <div style={{ ...style, ...thumbStyle }} {...reset} />;
  };
  let startOfTicketNumber = pathname.indexOf("chatpage/");
  console.log(startOfTicketNumber);
  let lengthOfPathname = pathname.length;
  let ticketNumber = pathname.slice(startOfTicketNumber + 25, lengthOfPathname);

  let param = params.id;
  let endOfId = param.indexOf("%26%26status");
  let ticketId = param.slice(5, endOfId);

  let endOfStatus = param.indexOf("%26%26ticketNumber");
  let status = param.slice(endOfId + 15, endOfStatus);


  const [submitData, { isLoading: isSubmitLoading, error }] =
    useSaveChatMutation();

  const formik = useFormik({
    initialValues: {
      value: "",
      ticketId: "",
      type: "TEXT",
    },

    onSubmit: async (chat, helpers) => {
      let updateChat = { ...chat, ticketId: ticketId, status: status };
      const userData = await submitData(updateChat);
      console.log(userData);
      handleReset();
    },
  });

  const {
    data: chatData = [],
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetAllChatsQuery({ ticketId }, { refetchOnMountOrArgChange: true });

  let senderNameOfTicket = chatData[0]?.senderName;
  return (
    <div>
      <header className="flex justify-between items-center text-[0.9rem] bg-white py-6 lg:px-10 sm:px-8 px-6  ">
        <div className="">
          <h2 className="font-[800] sm:items-center flex sm:flex-row flex-col gap-2 text-[0.9rem] lg:text-[1.1rem]">
            مکالمه با بخش فنی
            <div className="flex items-end gap-2">
              <span className="sm:inline hidden">&#40;</span>
              <h3 className="">شماره تیکت :</h3>
              <span className="">
                {pathname.includes("ticketNumber")
                  ? param.slice(endOfStatus + 21)
                  : ticketNumber}
              </span>
            </div>
            <span className="sm:inline hidden">&#41;</span>
          </h2>
        </div>
        <div>
          <Link href={"/panel/ticket"}>
            <button className="flex justify-center border-mainRed border text-white items-center text- px-3 py-2 rounded-full md:rounded">
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
          </Link>
        </div>
      </header>
      <section className="py-4 lg:px-10 px-5 mt-5 bg-white h-[46rem] flex flex-col justify-between ">
        <Scrollbars
          autoHide
          ref={scrollbars}
          className="scroll-bar pb-10"
          autoHideTimeout={500}
          autoHideDuration={200}
          renderView={renderView}
          renderThumbHorizontal={renderThumbHorizontal}
          renderThumbVertical={renderThumbVertical}
          renderTrackVertical={renderTrackVertical}
        >
          <div className="py-2">
            {chatData?.map((data, index) => (
              <div className="flex flex-col gap-2  lg:px-4 py-2 px-2 ">
                {data.senderName === window.sessionStorage.getItem("name") ? (
                  <div className="xl:w-1/3 lg:w-2/5 md:w-3/4 sm:w-3/5 w-7/8 ">
                    <div className="bg-[#9E9E9E] rounded-lg rounded-tr-none lg:px-3 px-6 py-2 space-y-3 text-white">
                      <div>
                        <span> {data?.senderName} :</span>
                      </div>
                      <div>
                        <p className="text-sm leading-6">{data?.value}</p>
                      </div>
                      <div className="flex items-center gap-2  text-xs">
                        <div>
                          <span>{data?.date}</span>
                        </div>
                        <div>
                          <span>{data?.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="xl:w-1/3 lg:w-2/5 md:w-3/4 sm:w-3/5 w-7/8 self-end">
                    <div className=" space-y-3 rounded-lg rounded-tl-none bg-[#F2EDED] lg:px-3 px-6 py-2 text-[#29262A]">
                      <div>
                        <span>{data?.senderName} :</span>
                      </div>
                      <div>
                        <p className="text-sm leading-6">{data?.value}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[#9F9F9F] text-xs">
                        <div>
                          <span>{data?.date}</span>
                        </div>
                        <div>
                          <span>{data?.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Scrollbars>
        {param.slice(endOfId + 15, endOfStatus) !== "closed" ? (
          <form
            className=" flex justify-between gap-2 mx-2 my-2"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div>
              {isSubmitLoading ? (
                <button disabled type="submit">
                  <TailSpin
                    height="20"
                    width="20"
                    color="#4E4E4E"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  <svg
                    disabled
                    type="submit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M0.904896 0.0661742C0.797235 0.0122522 0.676291 -0.00942299 0.556605 0.00375452C0.436919 0.016932 0.323587 0.0644013 0.230237 0.140455C0.136887 0.216508 0.0674922 0.317907 0.0303978 0.43246C-0.0066965 0.547013 -0.00991173 0.669843 0.0211391 0.78618L1.89365 7.80873C1.92459 7.92454 1.98818 8.029 2.07683 8.10967C2.16548 8.19035 2.27546 8.24383 2.39366 8.26374L10.9625 9.69125C11.3112 9.75 11.3112 10.25 10.9625 10.3088L2.39491 11.7363C2.27648 11.756 2.16623 11.8093 2.07734 11.89C1.98845 11.9707 1.92468 12.0753 1.89365 12.1913L0.0211391 19.2138C-0.00991173 19.3302 -0.0066965 19.453 0.0303978 19.5675C0.0674922 19.6821 0.136887 19.7835 0.230237 19.8595C0.323587 19.9356 0.436919 19.9831 0.556605 19.9962C0.676291 20.0094 0.797235 19.9878 0.904896 19.9338L19.655 10.5588C19.7587 10.5068 19.8459 10.427 19.9068 10.3283C19.9677 10.2297 20 10.116 20 10C20 9.88403 19.9677 9.77035 19.9068 9.67167C19.8459 9.57299 19.7587 9.49321 19.655 9.44125L0.904896 0.0661742Z"
                      fill="white"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  disabled={formik.values.value === "" ? true : false}
                  type="submit"
                  className="w-full p-4 rounded-full font-bold  bg-mainPurple text-white"
                >
                  <svg
                    disabled
                    type="submit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M0.904896 0.0661742C0.797235 0.0122522 0.676291 -0.00942299 0.556605 0.00375452C0.436919 0.016932 0.323587 0.0644013 0.230237 0.140455C0.136887 0.216508 0.0674922 0.317907 0.0303978 0.43246C-0.0066965 0.547013 -0.00991173 0.669843 0.0211391 0.78618L1.89365 7.80873C1.92459 7.92454 1.98818 8.029 2.07683 8.10967C2.16548 8.19035 2.27546 8.24383 2.39366 8.26374L10.9625 9.69125C11.3112 9.75 11.3112 10.25 10.9625 10.3088L2.39491 11.7363C2.27648 11.756 2.16623 11.8093 2.07734 11.89C1.98845 11.9707 1.92468 12.0753 1.89365 12.1913L0.0211391 19.2138C-0.00991173 19.3302 -0.0066965 19.453 0.0303978 19.5675C0.0674922 19.6821 0.136887 19.7835 0.230237 19.8595C0.323587 19.9356 0.436919 19.9831 0.556605 19.9962C0.676291 20.0094 0.797235 19.9878 0.904896 19.9338L19.655 10.5588C19.7587 10.5068 19.8459 10.427 19.9068 10.3283C19.9677 10.2297 20 10.116 20 10C20 9.88403 19.9677 9.77035 19.9068 9.67167C19.8459 9.57299 19.7587 9.49321 19.655 9.44125L0.904896 0.0661742Z"
                      fill="white"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="w-full space-y-3">
              <TextField
                value={formik.values.value}
                onChange={formik.handleChange}
                type="text"
                name="value"
                inputProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    fontSize: "0.8rem",
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                  },
                }}
                className="w-full"
                placeholder="پیامی بنویسید ..."
              />

              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1781_4601)">
                    <path
                      d="M11.253 4.81802L19.3848 12.9497C20.9475 14.5125 20.9475 17.0439 19.3848 18.6066C17.8221 20.1693 15.2906 20.1693 13.7279 18.6066L4.88909 9.76777C3.91328 8.79196 3.91328 7.20804 4.88909 6.23223C5.86489 5.25643 7.44881 5.25643 8.42462 6.23223L15.8492 13.6569C16.2382 14.0458 16.2382 14.6822 15.8492 15.0711C15.4603 15.46 14.8239 15.46 14.435 15.0711L7.71751 8.35355L6.65685 9.41421L13.3744 16.1317C14.3502 17.1075 15.9341 17.1075 16.9099 16.1317C17.8857 15.1559 17.8857 13.572 16.9099 12.5962L9.48528 5.17157C7.92258 3.60887 5.39113 3.60887 3.82843 5.17157C2.26572 6.73428 2.26572 9.26572 3.82843 10.8284L12.6673 19.6673C14.8169 21.8169 18.2958 21.8169 20.4454 19.6673C22.595 17.5177 22.595 14.0387 20.4454 11.8891L12.3137 3.75736L11.253 4.81802Z"
                      fill="#979797"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1781_4601">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[#9F9F9F] text-sm">
                  فایل های خود را بکشید و اینجا رها کنید. ( محدودیت حجم ارسال 10
                  مگابایت)
                </span>
              </div>
            </div>
          </form>
        ) : null}
      </section>
    </div>
  );
}
