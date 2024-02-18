'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";

export default function MoreIndividualInfoDialog(props) {
    
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openMoreInfoIndividual}
                keepMounted
                // onClose={props.handleCloseMoreInfoIndividual}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"},
                }}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseMoreInfoIndividual}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-5">
                            <h3 className="text-[1.1rem]">جزئیات</h3>
                        </div>
                        
                        <div className="hidden md:flex md:justify-center mb-4">
                            <div className="w-full md:w-[70%] flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام و نام خانوادگی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.fullName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 "> کد ملی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.nationalCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">کد پرسنلی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.personalCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تاریخ تولد</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.birthDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نام پدر</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.fatherName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">جنسیت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.gender==="male" ? "مرد" : props.moreInfoIndividualTarget?.gender==="female" ? "زن" : props.moreInfoIndividualTarget?.gender==="other" ? "دیگر" :null }</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">نقش</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره همراه اصلی</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.originalPhoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                    {props.moreInfoIndividualTarget?.anotherPhoneNumber &&<div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره همراه دوم</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.anotherPhoneNumber}</span>
                                        </div>
                                    </div>
                                </div>}
                                
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">شماره ثابت</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.telephoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">تحصیلات</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.education}</span>
                                        </div>
                                    </div>
                                </div>
                                {props.moreInfoIndividualTarget?.email && <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">ایمیل</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.email}</span>
                                        </div>
                                    </div>
                                </div>}
                                {props.moreInfoIndividualTarget?.address && <div className="flex flex-col">
                                    <div className="mb-2">
                                        <span className="text-[0.9rem] text-gray70 ">آدرس</span>
                                    </div>
                                    <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                        <div className="p-2">
                                            <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.address}</span>
                                        </div>
                                    </div>
                                </div>}
                                           
                                   
                                  {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.fullName ?
                                     <div className="flex flex-col gap-5 border-t my-4 py-3">
                                     <div>
                                         <span>
                                              اطلاعات آشنای اول 
                                         </span>
                                     </div>
                                        
                                          <div className="flex flex-col">
                                          <div className="mb-2">
                                              <span className="text-[0.9rem] text-gray70 ">نام و نام خانوادگی</span>
                                          </div>
                                          <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                              <div className="p-2">
                                                  <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[0].fullName}</span>
                                              </div>
                                          </div>
                                      </div> 
                                        
                                         { props.moreInfoIndividualTarget?.relationshipsInformation[0]?.phoneNumber?
                                             <div className="flex flex-col">
                                             <div className="mb-2">
                                                 <span className="text-[0.9rem] text-gray70 ">شماره تماس</span>
                                             </div>
                                             <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                 <div className="p-2">
                                                     <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[0]?.phoneNumber}</span>
                                                 </div>
                                             </div>
                                         </div>:null
                                         }
                                         {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.relationship ?
                                             <div className="flex flex-col">
                                             <div className="mb-2">
                                                 <span className="text-[0.9rem] text-gray70 ">نسبت</span>
                                             </div>
                                             <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                 <div className="p-2">
                                                     <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[0]?.relationship}</span>
                                                 </div>
                                             </div>
                                         </div>:null
                                         }
                                         {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.address ?
                                             <div className="flex flex-col">
                                             <div className="mb-2">
                                                 <span className="text-[0.9rem] text-gray70 ">آدرس</span>
                                             </div>
                                             <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                 <div className="p-2">
                                                     <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[0]?.address}</span>
                                                 </div>
                                             </div>
                                         </div>:null
                                         }
                                         
                                    </div>:null
                                  }
                                   { props.moreInfoIndividualTarget?.relationshipsInformation[1]?.fullName ?
                                    <div className="flex flex-col gap-5 border-t my-4 py-3">
                                    <div>
                                        <span>
                                            اطلاعات آشنای دوم
                                        </span>
                                    </div>
                                        <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">نام و نام خانوادگی</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[1]?.fullName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        { props.moreInfoIndividualTarget?.relationshipsInformation[0]?.phoneNumber && <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">شماره تماس</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[1]?.phoneNumber}</span>
                                                </div>
                                            </div>
                                        </div>}
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.relationship&& <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">نسبت</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[1]?.relationship}</span>
                                                </div>
                                            </div>
                                        </div>}
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.address&&  <div className="flex flex-col">
                                            <div className="mb-2">
                                                <span className="text-[0.9rem] text-gray70 ">آدرس</span>
                                            </div>
                                            <div className="border border-[#D9D9D9]  flex justify-start px-4">
                                                <div className="p-2">
                                                    <span className="text-[#29262A] text-[0.9rem]">{props.moreInfoIndividualTarget?.relationshipsInformation[1]?.address}</span>
                                                </div>
                                            </div>
                                        </div>}
                                        
                                   </div> :null
                                   }
           
                            </div>
                        </div>
                        <div className="md:hidden flex justify-center">
                            <div className="w-full md:w-[70%] flex flex-col gap-3 ">
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          نام و نام خانوادگی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoIndividualTarget?.fullName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          کد ملی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoIndividualTarget?.nationalCode}
                                    </span>
                                </div>
                              
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          کد پرسنلی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                    {props.moreInfoIndividualTarget?.personalCode}
                                    </span>
                                </div>
                                
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                          تاریخ تولد :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.birthDate}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                           نام پدر :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.fatherName}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            جنسیت :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.gender==="male" ? "مرد" : props.moreInfoIndividualTarget?.gender==="female" ? "زن" : props.moreInfoIndividualTarget?.gender==="other" ? "دیگر" :null }
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            نقش :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.role }
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره همراه اصلی :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.originalPhoneNumber}
                                    </span>
                                </div>
                                {props.moreInfoIndividualTarget?.anotherPhoneNumber && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره همراه دوم :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.anotherPhoneNumber}
                                    </span>
                                </div>}
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                            شماره ثابت  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.telephoneNumber}
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             تحصیلات  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.education}
                                    </span>
                                </div>
                                {props.moreInfoIndividualTarget?.email && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             ایمیل  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.email}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.address&& <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             آدرس  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.address}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.fullName &&
                                     <div className="flex flex-col gap-5 text-sm my-4 py-3">
                                     <div>
                                         <span>
                                              اطلاعات آشنای اول 
                                         </span>
                                     </div>
                                     <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             نام و نام خانوادگی  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.fullName}
                                    </span>
                                </div>
                                {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.phoneNumber && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                              شماره تماس    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.phoneNumber}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.relationship && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                               نسبت    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.relationship}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.address&& <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                               آدرس    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[0]?.address}
                                    </span>
                                </div>}
                                     </div>}
                                     {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.fullName &&
                                     <div className="flex flex-col gap-5 text-sm my-4 py-3">
                                     <div>
                                         <span>
                                              اطلاعات آشنای دوم 
                                         </span>
                                     </div>
                                     <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                             نام و نام خانوادگی  :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.fullName}
                                    </span>
                                </div>
                                {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.phoneNumber && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                              شماره تماس    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.phoneNumber}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.relationship&& <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                               نسبت    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.relationship}
                                    </span>
                                </div>}
                                {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.address && <div>
                                    <span className="ml-1 text-gray9F text-[0.8rem]">
                                               آدرس    :
                                    </span>
                                    <span className="text-[#29262A] text-[0.8rem]">
                                        {props.moreInfoIndividualTarget?.relationshipsInformation[1]?.address}
                                    </span>
                                </div>}
                                     </div>}
                                
                            </div>
                        </div>
                        <div className="flex md:hidden  justify-center mt-5 gap-3">
                            <button onClick={()=>{props.handleOpenDeleteIndividual(props.moreInfoIndividualTarget.id);props.handleCloseMoreInfoIndividual()}} className="px-6 py-2 text-[0.8rem] text-mainRed border border-mainRed rounded hover:bg-mainRed hover:text-white">
                                حذف
                            </button>
                            <button onClick={()=>{props.handleOpenEditIndividualInfo(props.moreInfoIndividualTarget);props.handleCloseMoreInfoIndividual()}}  className="px-5 py-2 text-[0.8rem] text-[#4087DB] border border-[#4087DB] rounded hover:bg-[#4087DB] hover:text-white">
                                ویرایش
                            </button>
                        </div> 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}