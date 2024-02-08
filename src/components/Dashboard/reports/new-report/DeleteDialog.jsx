'use client'
import React from "react";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import {useDeleteESIMutation} from "@/redux/features/equipment-store/input/ESIapiSlice";
import {useDeletePurchaseRequestMutation} from "@/redux/features/purchase-request/PurchaseRequestSlice";


export default function DeleteDialog(props) {
    const [handleDelete ,{isLoading}] = useDeletePurchaseRequestMutation()
    const deleteData = async () =>{
        const res = await handleDelete(props.deleteTargetId)
        props.handleCloseDelete()
    }
    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openDelete}
                keepMounted
                // onClose={props.handleCloseDelete}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={props.handleCloseDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.2rem]">حذف</h3>
                        </div>
                        <div className="flex  justify-center">
                            <h2 >آیا از حذف این آیتم مطمئن هستید؟</h2>
                        </div>
                        <div className="flex justify-center mt-10 gap-4">
                            <div>
                                <button onClick={deleteData}
                                        className="px-6 py-2 text-[0.8rem] rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">حذف
                                </button>
                                <button disabled type="submit"
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
                                    حذف
                                </button>
                            </div>
                            <div>
                                <button onClick={props.handleCloseDelete} className="px-6 py-2 text-[0.8rem]  rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold bg-neutral-400 text-white">بستن</button>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}