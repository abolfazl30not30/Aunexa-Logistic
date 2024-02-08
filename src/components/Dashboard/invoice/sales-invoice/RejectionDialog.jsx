'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import "react-multi-date-picker/styles/colors/red.css"

import { useRejectSalesInvoiceMutation } from "@/redux/features/invoice/sales-invoice/SalesInvoiceSlice";

export default function RejectionDialog(props) {
    const handleReset = () =>{
        formik.resetForm()
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useRejectSalesInvoiceMutation()

    const schema = yup.object().shape({
        description: yup.string().required("لطفا توضیحات رد فاکتور  را وارد کنید"),
    });


    const formik = useFormik({
        initialValues: {
            id:"",
            description:"",
        },

        validationSchema: schema,

        onSubmit: async (invoice,helpers) => {
            let updateProduct = {id:props.rejectionTarget?.id}
            let failureReason = {
                description:invoice.description
            }
            updateProduct = {...updateProduct,failureReason:failureReason}
            const userData = await submitData(updateProduct)
            handleReset()
            props.handleCloseRejection()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openRejection}
                keepMounted
                // onClose={()=>{props.handleCloseRejection();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },}}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseRejection();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">رد فاکتور فروش</h3>
                        </div>

                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <h3 className="text-[0.9rem]">آیا مطمئن به رد فاکتور هستید؟</h3>
                                <div>
                                    <TextField
                                        multiline
                                        rows={3}
                                        
                                        fullWidth
                                        placeholder="توضیحات رد فاکتور"
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button onClick={props.handleCloseRejection}
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
                                            رد فاکتور
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">رد فاکتور
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