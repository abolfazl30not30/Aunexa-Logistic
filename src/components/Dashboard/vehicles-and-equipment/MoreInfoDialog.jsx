'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";


export default function MoreInfoDialog(props) {
    return(
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
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.type}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2 ">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {
                                                    props.moreInfoTarget?.code === null ? ( props.moreInfoTarget?.tag.slice(2, 5) + "-" + props.moreInfoTarget?.tag.slice(5, 7) + " " + props.moreInfoTarget?.tag.slice(7, 8) + " " + props.moreInfoTarget?.tag.slice(0, 2)) : (
                                                        props.moreInfoTarget?.code
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                               {props.moreInfoTarget.gpsURL &&
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">API جی پی اس</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget.hasGps ? (props.moreInfoTarget.gpsURL) : ("وسیله داری جی پی اس نمی باشد")}</span>
                                        </div>
                                    </div>
                                </div>
}

                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">وضیعت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {props.moreInfoTarget.status === "IN_USE" ? (<span className="text-[0.8rem] bg-[#D5EAFF] text-[#2492FF] py-1 px-2 rounded-xl">در حال استفاده</span>) : (
                                                    props.moreInfoTarget.status === "AVAILABLE" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">دردسترس</span>) : (
                                                        <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">خراب</span>
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">گروه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.subOrganizationName}</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    props.moreInfoTarget.purchaseDate && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">تاریخ خرید</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.purchaseDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نوع وسیله نقلیه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.type}
                                    </span>
                                </div>
                                {props.moreInfoTarget?.code&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد وسیله نقلیه :
                                    </span>
                                    
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {
                                                   props.moreInfoTarget?.code
                                                }
                                            </span>
                                        
                                </div>
                                }
                                {props.moreInfoTarget?.tag&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        پلاک وسیله نقلیه :
                                    </span>
                                    
                                            <span className="text-[#29262A] text-[0.9rem]">
                                                {
                                                    
                                                        props.moreInfoTarget?.tag.slice(2, 5) + "-" + props.moreInfoTarget?.tag.slice(5, 7) + " " + props.moreInfoTarget?.tag.slice(7, 8) + " " + props.moreInfoTarget?.tag.slice(0, 2)
                                                    
                                                }
                                            </span>
                                        
                                </div>
                                }
                                {props.moreInfoTarget.gpsURL &&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        API جی پی اس :    
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.hasGps ? (props.moreInfoTarget.gpsURL) : ("وسیله داری جی پی اس نمی باشد")}
                                    </span>
                                </div>}
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        وضعیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.status === "IN_USE" ? (<span className="text-[0.8rem] bg-[#D5EAFF] text-[#2492FF] py-1 px-2 rounded-xl">در حال استفاده</span>) : (
                                            props.moreInfoTarget.status === "AVAILABLE" ? (<span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">دردسترس</span>) : (
                                                <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">خراب</span>
                                            )
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        گروه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.subOrganizationName}
                                    </span>
                                </div>
                               {props.moreInfoTarget.purchaseDate&&
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        تاریخ خرید :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget.purchaseDate}
                                    </span>
                                </div>}
                            </div>
                        </div>
                        <div className="md:hidden flex  justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenDelete(props.moreInfoTarget.id);props.handleCloseMoreInfo()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={()=>{props.handleOpenEditInfo(props.moreInfoTarget);props.handleCloseMoreInfo()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}