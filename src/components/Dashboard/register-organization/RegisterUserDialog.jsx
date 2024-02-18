'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSaveRegisterIndividualMutation } from "@/redux/features/organization/individual/RegisterIndividualSlice";
import { useUpdateIndividualMutation } from "@/redux/features/organization/individual/IndividualSlice";

export default function RegisterUserDialog(props) {
    const [submitData, { isLoading: isSubmitLoading, error }] = useSaveRegisterIndividualMutation()
    const [submitDataUpdateIndividual, { isLoading: isSubmitLoadingIndividual, errorIndividual }] = useUpdateIndividualMutation()
    const formik = useFormik({
      initialValues: {
        
  
      },
      onSubmit: async (person, helpers) => {
       
        let updatePerson = { 
            code: props.codeRequest,
            username: props.registerIndividualTarget.nationalCode,
            password: props.registerIndividualTarget.nationalCode,
           
            role: props.registerIndividualTarget.role,
            name: props.registerIndividualTarget.fullName,
            phoneNumber: props.registerIndividualTarget.originalPhoneNumber,
            subOrganizationId: props.registerIndividualTarget.subOrganizationId,
            subOrganizationName: props.registerIndividualTarget.subOrganizationName,
            organizationId: props.registerIndividualTarget.organizationId,
            profile: "12345",
            cLevel: false,
            individualId:props.registerIndividualTarget.id,
        }
        const userData = await submitData(updatePerson)
       
              let updateIndividual = { 
                id:props.registerIndividualTarget?.id,
                fullName: props.registerIndividualTarget?.fullName,
                nationalCode: props.registerIndividualTarget?.nationalCode,
                personalCode: props.registerIndividualTarget?.personalCode,
                birthDate: props.registerIndividualTarget?.birthDate,
                fatherName: props.registerIndividualTarget?.fatherName,
                gender: props.registerIndividualTarget?.gender,
                roleId: props.registerIndividualTarget?.roleId,
                role: props.registerIndividualTarget?.role,
                originalPhoneNumber: props.registerIndividualTarget?.originalPhoneNumber,
                anotherPhoneNumber: props.registerIndividualTarget?.anotherPhoneNumber,
                telephoneNumber: props.registerIndividualTarget?.telephoneNumber,
                education: props.registerIndividualTarget?.education,
                email: props.registerIndividualTarget?.email,
                address: props.registerIndividualTarget?.address,
                cLevel:props.registerIndividualTarget?.cLevel,
                register:true,
                
              }
             const individual = await submitDataUpdateIndividual(updateIndividual)
            
        
        props.handleCloseRegisterIndividual()
       
        
      },
    });

    return(
        <>
        
            <Dialog
                fullWidth={true}
                open={props.openRegisterIndividual}
                keepMounted
                // onClose={props.handleCloseRegisterIndividual}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"},
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseRegisterIndividual}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">ثبت به عنوان کاربر</h3>
                        </div>
                        
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام و نام خانوادگی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.fullName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> کد ملی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.nationalCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">کد پرسنلی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.personalCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تاریخ تولد</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.birthDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام پدر</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.fatherName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">جنسیت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.gender==="male" ? "مرد" : props.registerIndividualTarget?.gender==="female" ? "زن" : props.registerIndividualTarget?.gender==="other" ? "دیگر" :null }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نقش</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره همراه اصلی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.originalPhoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                    <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره همراه دوم</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.anotherPhoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره ثابت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.telephoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تحصیلات</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.education}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">ایمیل</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">آدرس</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.registerIndividualTarget?.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          نام و نام خانوادگی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.registerIndividualTarget?.fullName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          کد ملی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.registerIndividualTarget?.nationalCode}
                                    </span>
                                </div>
                              
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          کد پرسنلی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.registerIndividualTarget?.personalCode}
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          تاریخ تولد :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.birthDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                           نام پدر :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.fatherName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            جنسیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.gender==="male" ? "مرد" : props.registerIndividualTarget?.gender==="female" ? "زن" : props.registerIndividualTarget?.gender==="other" ? "دیگر" :null }
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            نقش :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.role }
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره همراه اصلی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.originalPhoneNumber}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره همراه دوم :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.anotherPhoneNumber}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره ثابت  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.telephoneNumber}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             تحصیلات  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.education}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             ایمیل  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.email}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             آدرس  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.registerIndividualTarget?.address}
                                    </span>
                                </div>
                               
                                
                            </div>
                            </div>
                        <div className=" flex  justify-center mt-5 gap-3">
                        <form  onSubmit={formik.handleSubmit} method="POST">
                            {isSubmitLoading ? (<button type="submit" disabled  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ثبت کاربر
                            </button>):(<button type="submit"   className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ثبت کاربر
                            </button>)}
                            </form>
                            <button onClick={()=>{props.handleCloseRegisterIndividual()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                انصراف
                            </button>
                        </div> 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}