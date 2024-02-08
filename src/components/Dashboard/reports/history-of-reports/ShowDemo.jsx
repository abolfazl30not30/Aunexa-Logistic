'use client'

import React, {useState} from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";


export default function ShowDemo(props) {

    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openDemo}
                // onClose={()=>{props.handleCloseFilter();}}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseDemo();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem] text-mainRed">دسترسی در نسخه اصلی</h3>
                        </div>
                        <div className="text-center">
                            قابلیت دسترسی به این ویژگی در نسخه دمو نمی باشد
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}