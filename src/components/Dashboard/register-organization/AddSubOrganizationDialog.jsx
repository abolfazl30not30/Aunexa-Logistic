'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel, MenuItem,
    OutlinedInput,
    Select,
    FormErrorText
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';

import { useSaveSubOrganizationMutation } from "@/redux/features/organization/sub-organization/SubOrganizationSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import { ConvertToNull } from "@/helper/ConvertToNull";
export default function AddSubOrganizationDialog(props) {

    const handleReset = () =>{
        formik.resetForm()
    }
    const [selectHasError,setSelectHasError]=useState(false)
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveSubOrganizationMutation()
    const schema = yup.object().shape({
        name: yup.string().required("لطفا نام ناوگان را وارد کنید"),
        type:yup.string().required(),
        capacity: yup.string().matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ),
    });

    const formik = useFormik({
        initialValues: {
            organizationId: "",
            type:"",
            name:"",
            capacity:"",
            unit:""
        },

        validationSchema: schema,

        onSubmit: async (subOrganization,helpers) => {
            
            let updateSubOrganization = {...subOrganization,organizationId:props.organizationIdTarget,capacity:PersianToEnglish(subOrganization.capacity)}
            updateSubOrganization=ConvertToNull(updateSubOrganization)
            const userData = await submitData(updateSubOrganization)
            handleReset()
            props.handleCloseAddSubOrganization()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddSubOrganization}
                keepMounted
                // onClose={()=>{props.handleCloseAddSubOrganization();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseAddSubOrganization();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت ناوگان</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                            <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام ناوگان"
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder=" ظرفیت (اختیاری)"
                                        type="text"
                                        name="capacity"
                                        value={formik.values.capacity}
                                        onChange={formik.handleChange}
                                        error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                                        helperText={formik.touched.capacity && formik.errors.capacity}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder=" واحد (اختیاری)"
                                        type="text"
                                        name="unit"
                                        value={formik.values.unit}
                                        onChange={formik.handleChange}
                                        error={formik.touched.unit && Boolean(formik.errors.unit)}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)}>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>نوع ناوگان </InputLabel>
                                        <Select
                                           
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.type}
                                            name="type"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}  label="نوع ناوگان" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="کارخانه" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>کارخانه</MenuItem>
                                            <MenuItem value="انبار مواد اولیه" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>انبار مواد اولیه</MenuItem>
                                            <MenuItem value="انبار تجهیزات" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>انبار تجهیزات</MenuItem>
                                            <MenuItem value="انبار محصولات" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>انبار محصولات</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </div>
                                <div>
                                    {
                                        isSubmitLoading ? (<button  disabled type="submit"
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
                                            ثبت
                                        </button>) : (
                                            <button type="submit" 
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">ثبت
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