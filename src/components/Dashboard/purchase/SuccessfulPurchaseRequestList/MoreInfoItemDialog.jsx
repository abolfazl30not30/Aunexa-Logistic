'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function MoreInfoItemDialog(props) {
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreInfoItem}
                keepMounted
                // onClose={props.handleCloseMoreInfoItem}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfoItem}>
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
                                        <span className="text-[0.9rem] text-gray70 "> محصول</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-evenly px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoItemTarget?.bill?.billCycle?.productName}</span>
                                        </div>
                                        <div className="border border-[#D9D9D9]">
                                        </div>
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoItemTarget?.bill?.quantity?.value}{props.moreInfoItemTarget?.bill?.quantity?.unit} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  شیوه پرداخت  </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoItemTarget?.paymentMethod ===
                                            "PARDAKHT_NAGHDI"
                                              ? "پرداخت نقدی در محل تحویل"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "PARDAKHT_BANKI"
                                              ? "پرداخت با کارت بانکی در محل تحویل"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "PARDAKHT_INTERNETI"
                                              ? "پرداخت از طریق درگاه اینترنتی"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "CHEK_MODAT_DAR"
                                              ? "چک مدت دار"
                                              : props.moreInfoItemTarget?.paymentMethod === "CHEK"
                                              ? "چک"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "AGHSATI"
                                              ? "اقساطی"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "ETEBARI"
                                              ? "اعتباری"
                                              : props.moreInfoItemTarget?.paymentMethod === "SAYER"
                                              ? "سایر"
                                              : null}</span>
                                        </div>
                                        
                                       
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  کد درخواست   </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoItemTarget?.bill?.billCycle?.code}</span>
                                        </div>
                                        
                                       
                                    </div>
                                </div>
                                
                                {props.moreInfoItemTarget?.bill?.billCycle?.description && <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">  توضیحات  </span>
                                    </div>
                                    <div className="border border-[#D9D9D9]   px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoItemTarget?.bill?.billCycle?.description}</span>
                                        </div>
                                        
                                       
                                    </div>
                                </div>}
                                
                               
                                
                               
                               
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                        
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         نام محصول  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoItemTarget?.bill?.billCycle?.productName}
                                    </span>
                                </div>
                                
                               
                               
                            </div>
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         مقدار  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoItemTarget?.bill?.quantity?.value}{props.moreInfoItemTarget?.bill?.quantity?.unit}
                                    </span>
                                </div>
                                
                               
                               
                            </div>
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         کد درخواست  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoItemTarget?.bill?.billCycle?.code}
                                    </span>
                                </div>
                                
                               
                               
                            </div>
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         شیوه پرداخت  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoItemTarget?.paymentMethod ===
                                            "PARDAKHT_NAGHDI"
                                              ? "پرداخت نقدی در محل تحویل"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "PARDAKHT_BANKI"
                                              ? "پرداخت با کارت بانکی در محل تحویل"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "PARDAKHT_INTERNETI"
                                              ? "پرداخت از طریق درگاه اینترنتی"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "CHEK_MODAT_DAR"
                                              ? "چک مدت دار"
                                              : props.moreInfoItemTarget?.paymentMethod === "CHEK"
                                              ? "چک"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "AGHSATI"
                                              ? "اقساطی"
                                              : props.moreInfoItemTarget?.paymentMethod ===
                                                "ETEBARI"
                                              ? "اعتباری"
                                              : props.moreInfoItemTarget?.paymentMethod === "SAYER"
                                              ? "سایر"
                                              : null}
                                    </span>
                                </div>
                                
                               
                               
                            </div>
                                {props.moreInfoItemTarget?.bill?.billCycle?.description &&<div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                         توضیحات  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoItemTarget?.bill?.billCycle?.description}
                                    </span>
                                </div>}
                                
                               
                               
                            </div>
                        </div>
                        
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}