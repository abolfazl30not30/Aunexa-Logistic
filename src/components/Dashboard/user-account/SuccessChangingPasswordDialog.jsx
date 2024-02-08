'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect,useRef, useState} from "react";
import {DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";



export default function SuccessChangingPasswordDialog(props) {


  
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openSuccessChangePassword}
                keepMounted
                // onClose={() => {
                    
                //     props.handleCloseSuccessChangePassword();
                    
                // }}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={() => {
                                
                                props.handleCloseSuccessChangePassword();
                                
                                
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem] text-[#4E4E4E]">تغییر رمز عبور</h3>
                        </div>
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <path d="M12.5026 19.9999L17.5026 24.9999L27.5026 14.9999M36.6693 19.9999C36.6693 29.2047 29.2074 36.6666 20.0026 36.6666C10.7979 36.6666 3.33594 29.2047 3.33594 19.9999C3.33594 10.7952 10.7979 3.33325 20.0026 3.33325C29.2074 3.33325 36.6693 10.7952 36.6693 19.9999Z" stroke="#12D377" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#9F9F9F]">
                                   رمز عبور شما با موفقیت تغییر کرد.
                                </p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}