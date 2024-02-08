'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";

import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    InputAdornment,
    textField,
    Select,
    Box
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import { useSaveFailureVehiclesMutation } from "@/redux/features/failure-and-repair-report/FailureAndRepairReportSlice";
import {   useLazyGetAllVehicleQuery} from "@/redux/features/category/CategorySlice";
export default function AddDataDialog(props) {
  
    const handleReset = () => {
        formik.resetForm()
        setVehicle(null)
        
    }
    const [vehicle,setVehicle] = useState(null)
    const [openVehicleList,setOpenVehicleList] = useState(false)
    const [getVehicleList,{ data : vehicleList  = [] , isLoading : isVehicleLoading, isError: vehicleIsError }] =   useLazyGetAllVehicleQuery()
    useEffect(()=>{
        if(openVehicleList){
            getVehicleList()
        }
    },[openVehicleList])

    const [submitData, {isLoading: isSubmitLoading, error}] = useSaveFailureVehiclesMutation()
    const schema = yup.object().shape({
        id: yup.string().required("لطفا نام وسیله را وارد کنید"),
        description: yup.string().required("لطفا توضیحات را وارد کنید"),
        
    });

    const formik = useFormik({
        initialValues: {
            id:"",
            description: "",
        },

        validationSchema: schema,

        

        onSubmit: async (vehicle, helpers) => {
            let updateVehicle = {description:vehicle.description,status:"BROKEN",machine:{id:vehicle.id}}
            const userData = await submitData(updateVehicle)
            handleReset()
            props.handleCloseAddData()
        },
    });

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddData}
                keepMounted
                // onClose={() => {
                //     props.handleCloseAddData();
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
                                props.handleCloseAddData();
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
                            <h3 className="text-[1.1rem]">ثبت  خرابی </h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className=" flex flex-col">
                                <Autocomplete
                                        open={openVehicleList}
                                        onOpen={() => {
                                            setOpenVehicleList(true);
                                        }}
                                        onClose={() => {
                                            setOpenVehicleList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={vehicleList}
                                        getOptionLabel={(option) =>option.code===null?option.tag.slice(2, 5)+ "-" +option.tag.slice(5, 7) + "  " + option.tag.slice(7, 8) + "  " +option.tag.slice(0, 2) +" "+option.type:option.code +" "+ option.type}
                                        renderOption={(props, option) => (
                                            <Box component="li"  {...props}>
                                                <span>{option.code===null?option.tag.slice(2, 5) + "-" + option.tag.slice(5, 7) + " " + option.tag.slice(7, 8) + " " + option.tag.slice(0, 2):option.code}</span>  <span className="pr-4">{option.type}</span> 
                                            </Box>
                                        )}
                                        value={vehicle}
                                        onChange={(event, newValue) => {
                                            
                                            setVehicle(newValue)
                                            formik.setFieldValue("id",newValue?.id)
                                            
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.id && Boolean(formik.errors.id)}
                                                helperText={formik.touched.id && formik.errors.id}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isVehicleLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                            }}
                                                placeholder="نام وسیله"
                                            />}
                                    />
                                </div>
                                <div>
                                <TextField
                                multiline
                                rows={6}
                                        fullWidth
                                        placeholder=" توضیحات (اجباری) "
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
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