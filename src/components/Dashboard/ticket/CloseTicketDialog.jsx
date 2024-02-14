'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import { useUpdateTicketMutation } from "@/redux/features/ticket/TicketSlice";
import * as yup from "yup";
import {useFormik} from "formik";
import { useEffect,useState } from "react";
export default function CloseTicketDialog(props) {
    
    const [submitData, { isLoading:isSubmitLoading ,error}] = useUpdateTicketMutation()
    const schema = yup.object().shape({
         status:yup.string()
        
        
      });
  
      const formik = useFormik({
          initialValues: {
            id: "",
            status:"",
            targetDepartmentName:"",
            sourceDepartmentName:"",
            sourceDepartmentId:"",
            targetDepartmentId:"",
            createAt:"",
            updateAt:"", 
            ticketNumber:"", 
            title:"", 
            
          },
  
          
  
          validationSchema: schema,
  
          onSubmit: async (ticket,helpers) => {
              const body = {...ticket,status:"closed",id:props.editTicketInfoTarget
              }
              const userData = await submitData(body)
              console.log(error)
              console.log(userData)
              
              helpers.resetForm({
                  ticket
              });
              
              
              
  
              props.handleCloseEditTicketInfo()
          },
      });
     
     
      
      useEffect(()=>{
          
          
          formik.setValues({
              id:props.editTicketInfoTarget?.id,
              status:props.editTicketInfoTarget?.status,
              targetDepartmentName: props.editTicketInfoTarget?.targetDepartmentName,
              sourceDepartmentName: props.editTicketInfoTarget?.sourceDepartmentName,
              sourceDepartmentId: props.editTicketInfoTarget?.sourceDepartmentId,
              targetDepartmentId: props.editTicketInfoTarget?.targetDepartmentId,
              createAt: props.editTicketInfoTarget?.createAt,
              updateAt: props.editTicketInfoTarget?.updateAt,
              ticketNumber: props.editTicketInfoTarget?.ticketNumber,
              title: props.editTicketInfoTarget?.title,
              
              
          })
          
          
      },[props.openEditTicketInfo])
  
      
  
     
      
  
      const handleReset = () =>{
          formik.resetForm()
         
         
      }
  
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditTicketInfo}
                keepMounted
                // onClose={props.handleCloseEditTicketInfo}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                    <form className=" " onSubmit={formik.handleSubmit} method="POST">
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseEditTicketInfo}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.2rem]">بستن تیکت</h3>
                        </div>
                        <div className="flex  justify-center">
                            <h2 >آیا از بستن این تیکت مطمئن هستید؟</h2>
                        </div>
                        <div className="flex justify-center mt-10 gap-4">
                            <div>
                            {
                                        isSubmitLoading ? (<button disabled type="submit"
                                                                   className="hidden flex gap-3 items-center justify-center w-full rounded-[0.5rem] py-2 px-6 border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                            <TailSpin
                                                height="20"
                                                width="20"
                                                color="#4E4E4E"
                                                ariaLabel="tail-spin-loading"
                                                radius="1"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}/>
                                            بستن تیکت
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-2 px-6 hover:border hover:opacity-80 font-bold  bg-mainPurple text-white">بستن تیکت
                                            </button>
                                        )
                                    }
                            </div>
                            <div>
                                <button onClick={console.log(props.editTicketInfoTarget)} className="px-6 py-2.5 text-[0.8rem]  rounded-[0.5rem]  hover:border hover:opacity-80 font-bold bg-neutral-400 text-white">انصراف</button>
                            </div>
                        </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}