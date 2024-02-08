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
                                        <span className="text-[0.9rem] text-gray70 "> پیام</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.message}</span>
                                        </div>
                                      
                                        
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">اولویت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.priority==="HIGH" ?"بالا":props.moreInfoTarget?.priority==="MEDIUM" ?"متوسط":props.moreInfoTarget?.priority==="LOW" ?"پایین":null}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نوع پیام</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.type==="ERROR" ?"اخطار":props.moreInfoTarget?.type==="WARN" ?"هشدار":props.moreInfoTarget?.type==="INFO" ?"اطلاعات":props.moreInfoTarget?.type==="TRACE" ?"دنبال کردن":null}
                                    </span>
                                        </div>
                                    </div>
                                </div>
                               
                                
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                       پیام :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.message}
                                    </span>
                                </div>
                                
                                {props.moreInfoTarget?.priority &&(
                                    <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         اولویت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.priority==="HIGH" ?"بالا":props.moreInfoTarget?.priority==="MEDIUM" ?"متوسط":props.moreInfoTarget?.priority==="LOW" ?"پایین":null}
                                    </span>
                                </div>)}
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          نوع پیام :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.type==="ERROR" ?"اخطار":props.moreInfoTarget?.type==="WARN" ?"هشدار":props.moreInfoTarget?.type==="INFO" ?"اطلاعات":props.moreInfoTarget?.type==="TRACE" ?"دنبال کردن":null}
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