'use client'
import React from "react";
import { useState } from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Link from "next/link";
import { useLazyDownloadFileMinioQuery } from "@/redux/features/file/FileSlice";
export default function MoreInfoDialog(props) {
    const [name,setName]=useState("")

    const handleImageName= async (e)=>{
        const res = await getDownload(props.moreInfoTarget?.receiptFile)
        console.log(res.data.fileUrl)
        const link = document.createElement('a');
        link.download = "file";
        link.href = res.data.fileUrl;
        link.click();


     }

     const [getDownload,{ data : downLoadURL  = [] , isLoading : isDownloadLoading, isError: downloadIsError }] = useLazyDownloadFileMinioQuery(name)
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
                                        <span className="text-[0.9rem] text-gray70 ">مسئول فروش</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex  px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.sellerName}</span>
                                        </div>
                                       
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between gap-2 border-b border-[#D9D9D9] pb-6">
                                    <div className="w-full  flex flex-col">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 ">  مشتری</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                            <div className="p-2">
                                                <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.customer}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col gap-2 pt-4 border-b border-[#D9D9D9] pb-6">
                                    {props.moreInfoTarget?.invoiceItems?.map((item,index)=>(
                                        <div className="border border-gray50 px-4 py-3 gap-4 flex flex-col ">
                                            <div className="flex justify-between gap-2 items-center">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div>
                                            <span>
                                               نام محصول :
                                            </span>
                                                </div>
                                                <div>
                                            <span className="text-[#29262A] font-semibold">
                                                {item?.productName}
                                            </span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                              
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div>
                                            <span>
                                               مقدار :
                                            </span>
                                                    </div>
                                                    <div>
                                            <span className="text-[#29262A] font-semibold">
                                              {item?.quantity?.value} {item?.quantity?.unit}
                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="flex items-center">
                                    <div className="">
                                        <span className="text-[0.9rem] text-gray70 ">شیوه پرداخت:</span>
                                    </div>
                                    <div className="  flex  ">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{item?.paymentMethod==="PARDAKHT_NAGHDI"?"پرداخت نقدی در محل تحویل":item?.paymentMethod==="PARDAKHT_BANKI"?"پرداخت با کارت بانکی در محل تحویل":item?.paymentMethod==="PARDAKHT_INTERNETI"?"پرداخت از طریق درگاه اینترنتی":item?.paymentMethod==="CHEK_MODAT_DAR"?"چک مدت دار":item?.paymentMethod==="CHEK"?"چک":item?.paymentMethod==="AGHSATI"?"اقساطی":item?.paymentMethod==="ETEBARI"?"اعتباری":item?.paymentMethod==="SAYER"?"سایر":null}
                                   </span>
                                        </div>
                                       
                                    </div>
                                </div>
                                           
                                        </div>))
                                    }
                                </div>
                                {props.moreInfoTarget?.description &&<div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">توضیحات </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex  px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.description}</span>
                                        </div>
                                       
                                    </div>
                                </div>}
                                <div className="flex flex-col md:flex-row justify-between gap-2  ">
                                    <div className="w-1/2  flex flex-col">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 "> شماره فاکتور </span>
                                        </div>
                                        <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                            <div className="p-2">
                                                <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.receiptCode}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {props.moreInfoTarget?.receiptFile && <div className="w-1/2  flex flex-col">
                                        <div className="mb-2">
                                            <span className="text-[0.9rem] text-gray70 ">دانلود فاکتور</span>
                                        </div>
                                        <button onClick={(e)=>{handleImageName(e)}}  className="p-2 border border-[#D9D9D9]">
                                                <span className="text-[#29262A] text-[0.9rem]">دانلود فاکتور</span>
                                            </button>
                                    </div>}
                                    
                                </div>
                                
                               
                                {props.moreInfoTarget?.status==="FAIL"?
                                <div className="flex flex-col">
                                <div className="mb-2">
                                    <span className="text-[0.9rem] text-gray70 ">جرئیات رد </span>
                                </div>
                                <div className="border border-[#D9D9D9]  flex  px-4">
                                    <div className="p-2">
                                        <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoTarget?.failureReason?.description}</span>
                                    </div>
                                   
                                </div>
                            </div>:null}
                            </div>
                           
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3">
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         مسئول فروش :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {props.moreInfoTarget?.sellerName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         مشتری :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoTarget?.customer}  
                                    </span>
                                </div>
                                {props.moreInfoTarget?.invoiceItems?.map((item)=>(
                               <div className="border-r flex flex-col gap-2 text-[0.8rem] border-dashed pr-3 border-black py-1 my-2">
                             
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          نام محصول :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                       {item?.productName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          مقدار :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {item?.quantity?.value} {item?.quantity?.unit}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          شیوه پرداخت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {item?.paymentMethod==="PARDAKHT_NAGHDI"?"پرداخت نقدی در محل تحویل":item?.paymentMethod==="PARDAKHT_BANKI"?"پرداخت با کارت بانکی در محل تحویل":item?.paymentMethod==="PARDAKHT_INTERNETI"?"پرداخت از طریق درگاه اینترنتی":item?.paymentMethod==="CHEK_MODAT_DAR"?"چک مدت دار":item?.paymentMethod==="CHEK"?"چک":item?.paymentMethod==="AGHSATI"?"اقساطی":item?.paymentMethod==="ETEBARI"?"اعتباری":item?.paymentMethod==="SAYER"?"سایر":null}
                                    </span>
                                </div>
                               </div>
                                ))}
                               
                               
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                        کد فاکتور:
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                          {props.moreInfoTarget?.receiptCode}
                                    </span>
                                </div>
                                {props.moreInfoTarget?.receiptFile && <div>
                                    <button  onClick={(e)=>{handleImageName(e)}}  className="ml-1 text-gray9F text-[0.8rem]">
                                         دانلود فاکتور
                                    </button>
                                   
                                </div>}
                                {props.moreInfoTarget?.description&&<div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         توضیحات:
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                          {props.moreInfoTarget?.description}
                                    </span>
                                </div>}
                            </div>
                        </div>
                        {props.moreInfoTarget?.status==="IN_PROGRESS"?
                        <div className=" flex md:hidden justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenConfirm(props.moreInfoTarget);props.handleCloseMoreInfo()}} className="px-6 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                تایید فاکتور
                            </button>
                            <button onClick={()=>{props.handleOpenRejection(props.moreInfoTarget);props.handleCloseMoreInfo()}}  className="px-5 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                رد فاکتور
                            </button>
                        </div>
                        :props.moreInfoTarget?.status==="DONE"?<div className=" flex md:hidden justify-center mt-5 gap-3">
                        <button onClick={()=>{props.handleOpenEditConfirmInvoiceInfo(props.moreInfoTarget);props.handleCloseMoreInfo()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                            رد فاکتور
                        </button>
                        
                    </div>:props.moreInfoTarget?.status==="FAIL"?<div className=" flex md:hidden justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenEditRejectionInvoiceInfo(props.moreInfoTarget);props.handleCloseMoreInfo()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                تایید فاکتور
                            </button>
                        </div>:null}
                       
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}