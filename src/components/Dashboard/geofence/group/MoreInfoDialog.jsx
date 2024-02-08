
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
                                        <span className="text-[0.9rem] text-gray70 ">نام گروه</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.productName}</span>
                                        </div>
                                       
                                    </div>
                                </div>
                             
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">ژئوفنس ها</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                           <div>
                                           <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.requestTime} */}
                                                    ژئوفنس 1
                                                </span> 
                                               
                                            </span>
                                           </div>
                                           <div>
                                           <span className="text-[#29262A] text-[0.9rem] space-x-2">
                                                <span>
                                                    {/* {props.moreInfoTarget?.requestTime} */}
                                                    ژئوفنس 1
                                                </span> 
                                              
                                            </span>
                                           </div>
                                        </div>
                                    </div>
                                </div>
{/*                               
                                {
                                    props.moreInfoTarget?.failureReason?.description && (
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">توضیحات </span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.failureReason?.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } */}
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        نام گروه :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.productName}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div>
                                    <span className="ml-2 text-gray9F text-[0.8rem]">
                                         ژئوفنس ها 
                                    </span>
                                    </div>
                                    <div className=" flex flex-col space-y-2 pr-2 border-r border-dashed border-[#29262A]">
                                    <span className="text-[0.8rem] text-[#29262A]">
                                         ژئوفنس ها 
                                    </span>
                                    <span className="text-[0.8rem] text-[#29262A]">
                                         ژئوفنس ها 
                                    </span>
                                    <span className="text-[0.8rem] text-[#29262A]">
                                         ژئوفنس ها 
                                    </span>
                                    </div>
                                    
                                </div>
                                
                                {/* {props.moreInfoTarget?.failureReason?.description&&
                                    <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        توضیحات   :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoTarget?.failureReason?.description}
                                    </span>
                                </div>
                                } */}
                                
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