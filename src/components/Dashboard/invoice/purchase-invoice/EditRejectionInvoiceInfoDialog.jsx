'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import "react-multi-date-picker/styles/colors/red.css"

import { useAcceptPurchaseInvoiceMutation } from "@/redux/features/invoice/purchase-invoice/PurchaseInvoiceSlice";


export default function ConfirmDialog(props) {
    const handleReset = () => {
        formik.resetForm()
    }
    useEffect(() => {
        formik.setValues({
            id: props.editRejectionInvoiceInfoTarget?.id,
        })
    }, [props.openEditRejectionInvoiceInfo])
    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useAcceptPurchaseInvoiceMutation()
    const formik = useFormik({
        initialValues: {
        },
        onSubmit: async (invoice) => {
            let updateInvoice = {id: props.editRejectionInvoiceInfoTarget?.id,}
            const userData = await submitData(updateInvoice)
            handleReset()
            props.handleCloseEditRejectionInvoiceInfo()
        },
    });
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditRejectionInvoiceInfo}
                keepMounted
                // onClose={() => {
                //     props.handleCloseEditRejectionInvoiceInfo();
                //     handleReset()
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
                                props.handleCloseEditRejectionInvoiceInfo();
                                handleReset()
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">تایید فاکتور</h3>
                        </div>
                       


                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] md:w-[75%] gap-2">
                                
                                <div className="flex justify-center mb-8">
                                 <h2>آیا قصد تغییر وضعیت فاکتور را به تایید شده دارید؟</h2>
                                    
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button onClick={props.handleCloseEditRejectionInvoiceInfo}
                                            className="w-full rounded-[0.5rem] py-3 border border-gray70 hover:opacity-80 font-bold  bg-transparent text-gray70">انصراف
                                    </button>
                                    {
                                        isSubmitLoading ? (<button disabled
                                                                   className="hidden flex gap-3 items-center justify-center w-full rounded-[0.5rem] py-3  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                            <TailSpin
                                                height="20"
                                                width="20"
                                                color="#4E4E4E"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}/>
                                            تغییر وضعیت
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainPurple text-white">تغییر وضعیت
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}