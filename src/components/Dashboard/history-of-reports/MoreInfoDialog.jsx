'use client'
import React from "react";
import {DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function MoreInfoDialog(props) {
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreInfo}
                keepMounted
                // onClose={props.handleCloseMoreInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">جزییات</h3>
                        </div>
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع وسیله</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span
                                                className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.machine?.type}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    {props.moreInfoTarget?.machine?.tag &&
                                        <div className="w-[45%]">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">پلاک وسیله </span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span
                                                        className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.machine?.tag}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {props.moreInfoTarget?.machine?.code &&
                                        <div className="w-[45%]">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">کد وسیله</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span
                                                        className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.machine?.code}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-[45%]">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 ">شاخص عملکرد </span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                            <div className="p-2">
                                                <span
                                                    className="text-[#29262A] text-[0.9rem]">{"-"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[45%]">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 "> گروه</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                            <div className="p-2">
                                                <span
                                                    className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.machine?.subOrganizationName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-[45%]">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 ">تاریخ خرابی </span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                            <div className="p-2">
                                                <span
                                                    className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[45%]">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 ">وضعیت </span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                            <div className="p-2">
                                                {props.moreInfoTarget?.status === "AVAILABLE" ? (
                                                    <span
                                                        className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">رفع خرابی</span>
                                                ) : (
                                                    <span
                                                        className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">گزارش خرابی</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">توضیحات</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span
                                                className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.description}</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع وسیله :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.machine?.type}
                                    </span>
                                </div>
                                {props.moreInfoTarget?.machine?.code &&<div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.machine?.code}
                                    </span>
                                </div>}
                                {props.moreInfoTarget?.machine?.tag && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {
                                            props.moreInfoTarget?.machine?.tag.slice(2, 5) + "-" + props.moreInfoTarget?.machine?.tag.slice(5, 7) + " " + props.moreInfoTarget?.machine?.tag.slice(7, 8) + " " + props.moreInfoTarget?.machine?.tag.slice(0, 2)
                                        }
                                    </span>
                                </div>}

                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        شاخص عملکرد :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {"-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         گروه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.machine?.subOrganizationName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ خرابی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    <span>{props.moreInfoTarget?.time}</span> <span
                                        className="pr-2">{props.moreInfoTarget?.date}</span>
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        وضعیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.status === "AVAILABLE" ? (
                                            <span
                                                className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">رفع خرابی</span>
                                        ) : (
                                            <span
                                                className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">گزارش خرابی</span>
                                        )}
                                    </span>
                                </div>

                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.description}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}