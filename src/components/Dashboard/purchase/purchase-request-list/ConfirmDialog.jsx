'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {Autocomplete, DialogContent, DialogContentText,} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import "react-multi-date-picker/styles/colors/red.css"
import {useLazyGetAllUnitQuery, useLazyGetInventoryBalanceQuery,} from "@/redux/features/category/CategorySlice";
import {
    useAcceptPurchaseRequestListMutation
} from "@/redux/features/purchase/purchase-request-list/PurchaseRequestListSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";

export default function ConfirmDialog(props) {

    const [getInventoryBalance, {
        data: inventoryBalanceList = [],
        isLoading: isInventoryBalanceLoading,
        isError: isInventoryBalanceError
    }] = useLazyGetInventoryBalanceQuery()

    //unit input
    const [unit, setUnit] = useState(null)
    const [openUnitList, setOpenUnitList] = useState(false)
    const [getUnitList, {
        data: unitList = [],
        isLoading: isUnitLoading,
        isError: unitIsError
    }] = useLazyGetAllUnitQuery()
    useEffect(() => {
        if (openUnitList) {
            getUnitList()
        }
    }, [openUnitList])

    const handleReset = () => {
        formik.resetForm()
        setUnit(null)
    }

    const handleSetUnitInput = (ab) => {
        const units = unitList.filter((unit) => unit.persianName === ab)
        setUnit(units[0])
    }

    useEffect(() => {
        getUnitList()
        getInventoryBalance(props.confirmTarget.productId)
        formik.setValues({
            id: props.confirmTarget?.id,
            value: props.confirmTarget?.value,
            unit: props.confirmTarget?.unit,
        })
        handleSetUnitInput(props.confirmTarget?.unit)
    }, [props.openConfirm])

    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useAcceptPurchaseRequestListMutation()

    const schema = yup.object().shape({
        value: yup.string().required("لطفا مقدار محصول را وارد کنید").matches(
            /^[۰۱۲۳۴۵۶۷۸۹0.-9]+$/,
            "لطفا فقط عدد وارد نمایید"
          ),
        unit: yup.string().required("لطفا واحد محصول را وارد کنید"),
    });


    const formik = useFormik({
        initialValues: {
            value: "",
            unit: "",
        },

        validationSchema: schema,

        onSubmit: async (purchase) => {
            let updatePurchase = {...props.confirmTarget}
            updatePurchase = {...updatePurchase,unit:purchase.unit}
            updatePurchase = {...updatePurchase,value:PersianToEnglish(`${purchase.value}`)}
            console.log(updatePurchase)
            const userData = await submitData(updatePurchase)
            handleReset()
            props.handleCloseConfirm()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openConfirm}
                keepMounted
                // onClose={() => {
                //     props.handleCloseConfirm();
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
                                props.handleCloseConfirm();
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
                            <h3 className="text-[1.1rem]">تایید درخواست</h3>
                        </div>
                        <div className="flex justify-center">

                            <div className="flex flex-col justify-center w-[90%] md:w-[75%] gap-3">
                                <div>
                                    <span className="text-gray70 text-[0.8rem]">لیست موجودی محصول در انبارها</span>
                                </div>
                                {
                                    inventoryBalanceList?.content?.map((product) => (
                                        <div className="border border-[#D9D9D9]  flex justify-between px-4">
                                            <div className="p-2">
                                                <span className="text-[#29262A] text-[0.8rem]"> <span
                                                    className="text-mainRed">{product?.value} {product?.unit}</span>  از این محصول در <span
                                                    className="text-mainRed">{product.subOrganizationInfo.subOrganizationName}</span> موجود است</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>


                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] md:w-[75%] gap-2">
                                <div>
                                    <span className="text-gray70 text-[0.8rem]">وارد کردن مقدار مورد نیاز خرید</span>
                                </div>
                                <div className="flex">
                                    <div className="w-[70%]">
                                        <TextField
                                            fullWidth
                                            placeholder="مقدار (اجباری)"
                                            type="text"
                                            name="value"
                                            value={formik.values.value}
                                            onChange={formik.handleChange}
                                            error={formik.touched.value && Boolean(formik.errors.value)}
                                            helperText={formik.touched.value && formik.errors.value}
                                            inputProps={{
                                                style: {
                                                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                    fontSize: "0.8rem"
                                                }
                                            }}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                    </div>
                                    <div className="w-[30%]">
                                        <Autocomplete
                                            open={openUnitList}
                                            onOpen={() => {
                                                setOpenUnitList(true);
                                            }}
                                            onClose={() => {
                                                setOpenUnitList(false);
                                            }}
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            ListboxProps={{
                                                sx: {
                                                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                    fontSize: "0.8rem"
                                                },
                                            }}
                                            options={unitList}
                                            getOptionLabel={(option) => option.persianName}
                                            value={unit}
                                            onChange={(event, newValue) => {
                                                setUnit(newValue)
                                                formik.setFieldValue("unit", newValue?.persianName)
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                                                    helperText={formik.touched.unit && formik.errors.unit}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {
                                                            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                            fontSize: "0.8rem"
                                                        }
                                                    }}
                                                    placeholder="واحد"
                                                />}/>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <button onClick={props.handleCloseConfirm}
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
                                            تایید
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">تایید
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