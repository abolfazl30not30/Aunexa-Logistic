'use client'
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    Autocomplete, Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select,FormHelperText
} from "@mui/material";
import {
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import CircularProgress from "@mui/material/CircularProgress";
import { useLazyGetAllSubOrganizationQuery } from "@/redux/features/category/CategorySlice";
import {useEffect} from "react";


export default function FilterDialog(props) {
    const [dateFrom,setDateFrom] = useState("")
    const [dateTo,setDateTo] = useState("")

  
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])
  

    const handleDateFromInput = (value) => {
        if(value){
            setDateFrom(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("dateFrom", convertDate)
        }else {
            formik.setFieldValue("dateFrom", "")
        }
    }

    const handleDateToInput = (value) => {
        if(value){
            setDateTo(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("dateTo", convertDate)
        }else {
            formik.setFieldValue("dateTo", "")
        }
    }

    const handleURLSearchParams = (values) =>{
        let params = new URLSearchParams()
        if(values.dateFrom){
            params.set("dateFrom",values.dateFrom)
        }
        if(values.dateTo){
            params.set("dateTo",values.dateTo)
        }
        if(values.priority){
            params.set("priority",values.priority)
        }if(values.subOrganizationId){
            params.set("subOrganizationId",values.subOrganizationId)
        }if(values.status){
            params.set("status",values.status)
        }
        return params
    }

    const handleResetForm = () =>{
        formik.resetForm()
        setDateTo("")
        setDateFrom("")
      
    }
    const formik = useFormik({

        initialValues: {
            dateFrom: "",
            subOrganizationId:"",
            status:"",
            dateTo: "",
          priority:""
        },

        onSubmit: (values) => {
            let params = handleURLSearchParams(values)
            props.setFilterItem(params.toString())
            props.handleCloseFilter()
        },
    });


    return(
        <>
            <Dialog
                fullWidth={true}
                open={props.openFilter}
                // onClose={()=>{props.handleCloseFilter();}}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
                <DialogContent>
                    <DialogContentText style={{ fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189" }}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseFilter();}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">فیلتر کردن</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[80%] gap-3">
                                <div className="flex flex-col md:flex-row justify-between gap-3">
                                    <div className="w-full md:w-1/2">
                                        <DatePicker
                                            placeholder="از تاریخ"
                                            calendarPosition={`bottom`}
                                            className="red"
                                            digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.dateFrom}
                                            onChange={(value) => {
                                              handleDateFromInput(value)
                                            }}
                                            mapDays={({date}) => {
                                                let props = {}
                                                let isWeekend = [6].includes(date.weekDay.index)

                                                if (isWeekend)
                                                    props.className = "highlight highlight-red";

                                                return props
                                            }}

                                            weekDays={
                                                [
                                                    ["شنبه", "Sat"],
                                                    ["یکشنبه", "Sun"],
                                                    ["دوشنبه", "Mon"],
                                                    ["سه شنبه", "Tue"],
                                                    ["چهارشنبه", "Wed"],
                                                    ["پنجشنبه", "Thu"],
                                                    ["جمعه", "Fri"],
                                                ]
                                            }

                                            calendar={persian}
                                            locale={persian_fa}>
                                            <button className="px-2 pb-4" onClick={(e) => {
                                                e.preventDefault()
                                                setDateFrom("")
                                                formik.setFieldValue("dateFrom","")
                                            }}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <DatePicker
                                            placeholder="تا تاریخ"
                                            calendarPosition={`bottom`}
                                            className="red"
                                            digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                            format={`YYYY/MM/DD`}
                                            containerStyle={{
                                                width: "100%"
                                            }}
                                            inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                            value={formik.values.dateTo}
                                            onChange={(value) => {
                                                handleDateToInput(value)
                                            }}
                                            mapDays={({date}) => {
                                                let props = {}
                                                let isWeekend = [6].includes(date.weekDay.index)

                                                if (isWeekend)
                                                    props.className = "highlight highlight-red";

                                                return props
                                            }}

                                            weekDays={
                                                [
                                                    ["شنبه", "Sat"],
                                                    ["یکشنبه", "Sun"],
                                                    ["دوشنبه", "Mon"],
                                                    ["سه شنبه", "Tue"],
                                                    ["چهارشنبه", "Wed"],
                                                    ["پنجشنبه", "Thu"],
                                                    ["جمعه", "Fri"],
                                                ]
                                            }

                                            calendar={persian}
                                            locale={persian_fa}>
                                            <button className="px-2 pb-4" onClick={(e) => {
                                                e.preventDefault()
                                                setDateTo("")
                                                formik.setFieldValue("dateTo","")}}>
                                                ریست
                                            </button>
                                        </DatePicker>
                                    </div>
                                </div>
                                {/* <div className=" flex flex-col">
                                    <Autocomplete
                                        open={openSubOrganizationList}
                                        onOpen={() => {
                                            setOpenSubOrganizationList(true);
                                        }}
                                        onClose={() => {
                                            setOpenSubOrganizationList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={subOrganizationList}
                                        getOptionLabel={(option) => option.name}
                                        value={subOrganization}
                                        onChange={(event, newValue) => {
                                            setSubOrganization(newValue)
                                            formik.setFieldValue("subOrganizationId", newValue?.id)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.subOrganizationId && Boolean(formik.errors.subOrganizationId)}
                                                helperText={formik.touched.subOrganizationId && formik.errors.subOrganizationId}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isSubOrganizationLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                                }}
                                                placeholder="دپارتمان"
                                            />}
                                    />
                                </div> */}
                               
                                <div className=" flex flex-col">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>اولویت</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.priority}
                                            name="priority"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="اولویت" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>همه اولویت ها</MenuItem>
                                            <MenuItem value="HIGH" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>بالا</MenuItem>
                                            <MenuItem value="MEDIUM" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>متوسط</MenuItem>
                                            <MenuItem value="LOW" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پایین</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                               
                                
                                <div className="mt-4">
                                    <button type="submit"
                                            className="w-full text-[0.9rem] rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainRed text-white">اعمال فیلتر
                                    </button>
                                    <button disabled type="submit"
                                            className="hidden flex text-[0.9rem] gap-3 items-center justify-center w-full rounded-[0.5rem] py-3  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
                                        <TailSpin
                                            height="20"
                                            width="20"
                                            color="#4E4E4E"
                                            ariaLabel="tail-spin-loading"
                                            radius="1"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}/>
                                        اعمال فیلتر
                                    </button>
                                </div>
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}