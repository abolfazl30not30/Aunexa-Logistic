'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';

import { PersianToEnglish } from "@/helper/PersianToEnglish";

import { useUpdateRelationshipMutation } from "@/redux/features/organization/individual/IndividualRelationshipSlice";
import { ConvertToNull } from "@/helper/ConvertToNull";
import { ConvertToEmpty } from "@/helper/ConvertToEmpty";
export default function AddIndividualRelationshipDialog(props) {
  
    const [individualRelationShip,setIndividualRelationship] = useState(null)
    
    
  
    const handleReset = () =>{
        formik.resetForm()
        setIndividualRelationship(null)
    }

    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateRelationshipMutation()
    const schema = yup.object().shape({
        firstFullName: yup.string(),
        firstPhoneNumber:yup.string().matches(
            /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ).min(11,"تعداد رقم وارد شده کم می باشد").max(11,"تعداد رقم وارد شده زیاد می باشد"),
        firstRelationship:yup.string(),
        firstAddress:yup.string(),
        secondFullName: yup.string(),
        secondPhoneNumber:yup.string().matches(
            /^[۰۱۲۳۴۵۶۷۸۹0-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ).min(11,"تعداد رقم وارد شده کم می باشد").max(11,"تعداد رقم وارد شده زیاد می باشد"),
        secondRelationship:yup.string(),
        secondAddress:yup.string(),
    });
    

    const formik = useFormik({
        initialValues: {
            id:"",
            individualId:"",
            firstFullName:"",
            firstPhoneNumber:"",
            firstRelationship:"",
            firstAddress:"",
            secondFullName:"",
            secondPhoneNumber:"",
            secondAddress:"",
            secondRelationship:""
        },
      
        

        validationSchema: schema,

        onSubmit: async (individualRelationShip) => {
          
            let updateIndividualRelationShip = {  relationshipsInformation:[
                ConvertToNull({
                    id:props.editIndividualRelationshipInfoTarget?.relationshipsInformation[0]?.id,
                    individualId:props.editIndividualRelationshipInfoTarget?.id,
                    fullName: individualRelationShip?.firstFullName,
                    phoneNumber:PersianToEnglish(individualRelationShip?.firstPhoneNumber),
                    relationship:individualRelationShip?.firstRelationship,
                    address:individualRelationShip?.firstAddress
                }),
                ConvertToNull({
                    id:props.editIndividualRelationshipInfoTarget?.relationshipsInformation[1]?.id,
                    individualId:props.editIndividualRelationshipInfoTarget.id,
                    fullName:individualRelationShip?.secondFullName,
                    phoneNumber:PersianToEnglish(individualRelationShip?.secondPhoneNumber),
                    relationship:individualRelationShip?.secondRelationship,
                    address:individualRelationShip?.secondAddress
                })
               ] }
           
           
           
            const userData = await submitData(updateIndividualRelationShip)
            handleReset()
            props.handleCloseEditIndividualRelationshipInfo()
        },
    });
    
    useEffect(()=>{
        
        const editInfoRelationshipOneObj = ConvertToEmpty(props.editIndividualRelationshipInfoTarget?.relationshipsInformation[0])
        const editInfoRelationshipTwoObj = ConvertToEmpty(props.editIndividualRelationshipInfoTarget?.relationshipsInformation[1])
        formik.setValues({
            
            individualId:props.editIndividualRelationshipInfoTarget?.id,
            firstFullName:editInfoRelationshipOneObj?.fullName,
            firstRelationship:editInfoRelationshipOneObj?.relationship,
            firstAddress:editInfoRelationshipOneObj?.address,
            firstPhoneNumber:editInfoRelationshipOneObj?.phoneNumber,
            secondFullName:editInfoRelationshipTwoObj?.fullName,
            secondRelationship:editInfoRelationshipTwoObj?.relationship,
            secondAddress:editInfoRelationshipTwoObj?.address,
            secondPhoneNumber:editInfoRelationshipTwoObj?.phoneNumber,
            
        })
        
        
    },[props.openEditIndividualRelationshipInfo])
   
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditIndividualRelationshipInfo}
                keepMounted
                // onClose={()=>{props.handleCloseEditIndividualRelationshipInfo();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseEditIndividualRelationshipInfo();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center ">
                        
                            <div>
                                <h3 className="text-[1.1rem]">اطلاعات نزدیکان</h3>
                            </div>
                            {/*<div>
                                <button
                                        className="flex text-gray60 bg-white border border-gray60 items-center text- px-3 py-2 rounded-full md:rounded"
                                        
                                      >
                                        <span className="hidden md:inline">
                                          افزودن افراد نزدیک 
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M7 12H17" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12 7V17" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                             </div>*/}
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div>
                                    <span>
                                        فرد اول
                                    </span>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        type="text"
                                        name="firstFullName"
                                        value={formik.values.firstFullName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstFullName && Boolean(formik.errors.firstFullName)}
                                        helperText={formik.touched.firstFullName && formik.errors.firstFullName}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex justify-between sm:flex-row flex-col gap-5">
                                  <div className="sm:w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره تماس"
                                        type="text"
                                        name="firstPhoneNumber"
                                        value={formik.values.firstPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstPhoneNumber && Boolean(formik.errors.firstPhoneNumber)}
                                        helperText={formik.touched.firstPhoneNumber && formik.errors.firstPhoneNumber}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                  <div className="sm:w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="نسبت"
                                        type="text"
                                        name="firstRelationship"
                                        value={formik.values.firstRelationship}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstRelationship && Boolean(formik.errors.firstRelationship)}
                                        helperText={formik.touched.firstRelationship && formik.errors.firstRelationship}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                </div>
                                  <div className="">
                                    
                                      <TextField
                                        fullWidth
                                        placeholder="آدرس"
                                        type="text"
                                        name="firstAddress"
                                        value={formik.values.firstAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstAddress && Boolean(formik.errors.firstAddress)}
                                        helperText={formik.touched.firstAddress && formik.errors.firstAddress}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    

                                  </div>
                                  <div>
                                    <span>
                                        فرد دوم
                                    </span>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="نام و نام خانوادگی"
                                        type="text"
                                        name="secondFullName"
                                        value={formik.values.secondFullName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondFullName && Boolean(formik.errors.secondFullName)}
                                        helperText={formik.touched.secondFullName && formik.errors.secondFullName}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="flex justify-between sm:flex-row flex-col gap-5">
                                  <div className="sm:w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="شماره تماس"
                                        type="text"
                                        name="secondPhoneNumber"
                                        value={formik.values.secondPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondPhoneNumber && Boolean(formik.errors.secondPhoneNumber)}
                                        helperText={formik.touched.secondPhoneNumber && formik.errors.secondPhoneNumber}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                  <div className="sm:w-[45%]">
                                    <TextField
                                        fullWidth
                                        placeholder="نسبت"
                                        type="text"
                                        name="secondRelationship"
                                        value={formik.values.secondRelationship}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondRelationship && Boolean(formik.errors.secondRelationship)}
                                        helperText={formik.touched.secondRelationship && formik.errors.secondRelationship}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                  </div>
                                </div>
                                  <div className="">
                                    
                                      <TextField
                                        fullWidth
                                        placeholder="آدرس"
                                        type="text"
                                        name="secondAddress"
                                        value={formik.values.secondAddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.secondAddress && Boolean(formik.errors.secondAddress)}
                                        helperText={formik.touched.secondAddress && formik.errors.secondAddress}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    

                                  </div>
                                <div>
                                    {
                                        isSubmitLoading ? (<button disabled type="submit"
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
                                            <button type="submit" onClick={console.log(props.editIndividualRelationshipInfoTarget)} 
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