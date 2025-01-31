'use client'
import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import TextField from "@mui/material/TextField";
import {useSelector} from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import {useFormik} from "formik";
import {ConvertToNull} from "@/helper/ConvertToNull";
import * as yup from "yup";
import Box from '@mui/material/Box';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {useSaveNewReportsMutation} from "@/redux/features/new-reports/HistoryOfReportSlice";
import {TailSpin} from "react-loader-spinner";
import {useLazyGetAllVehicleQuery} from "@/redux/features/category/CategorySlice";
import {Autocomplete, Skeleton,} from "@mui/material";
import {
    useGetAllGPSPointMutation,
    useGetAllNewReportsMutation,
} from "@/redux/features/new-reports/NewReportsSlice";
import HistroyOfReport from "@/components/Dashboard/reports/history-of-reports/HistroyOfReport";

const ReportMap = dynamic(
    () =>
        import(
            "./ReportMap"
            ),
    {ssr: false}
);

function NewReportPc() {

    const [reportHistory,setReportHistory] = useState(false)

    const handleURLSearchParams = (values) =>{
        let params = new URLSearchParams()
        if(values.fromDate){
            params.set("fromDate",values.fromDate)
        }
        if(values.toDate){
            params.set("toDate",values.toDate)
        }
        if(values.machineId){
            params.set("machineId",values.machineId)
        }
        if(values.subOrganizationId){
            params.set("subOrganizationId",values.subOrganizationId)
        }
        if(values.type){
            params.set("type",values.type)
        }
        if(values.timeStep){
            params.set("timeStep",values.timeStep)
        } if(values.fromTime){
            params.set("fromTime",values.fromTime)
        }
        if(values.toTime){
            params.set("toTime",values.toTime)
        }
        return params
    }

    const handleURLSearchParamsForGPS = (values) =>{
        let params = new URLSearchParams()
        if(values.fromDate){
            params.set("dateFrom",values.fromDate)
        }
        if(values.toDate){
            params.set("dateTo",values.toDate)
        }
        if(values.fromTime){
            params.set("timeFrom",values.fromTime)
        }
        if(values.toTime){
            params.set("timeTo",values.toTime)
        }
        if(values.timeStep){
            params.set("timeStep",values.timeStep)}
        return params
    }

    const [skipFetch, setSkipFetch] = useState(true)
    const [filterItem, setFilterItem] = useState("");
    const [filterItemForGps, setFilterItemForGps] = useState("");
    const [reportData,setReportData] = useState([])
    const [locations,setLocations] = useState([])

    const [template, setTemplate] = useState("")

    const [vehicle, setVehicle] = useState(null)
    const [openVehicleList, setOpenVehicleList] = useState(false)
    const [getVehicleList, {
        data: vehicleList = [],
        isLoading: isVehicleLoading,
        isError: vehicleIsError
    }] = useLazyGetAllVehicleQuery()

    useEffect(() => {
        if (openVehicleList) {
            getVehicleList()
        }
    }, [openVehicleList])

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleFromDateInput = (value) => {
        if (value) {
            setFromDate(value)
            let date = new DateObject(value)
            formik.setFieldValue("fromDate", date.format("YYYY/MM/DD"))
            formik.setFieldValue("fromTime",date.format("HH:MM:SS"))
        } else {
            setFromDate("")
            formik.setFieldValue("fromDate", "")
            formik.setFieldValue("fromTime", "")
        }
    }


    const handleToDateInput = (value) => {
        if (value) {
            setToDate(value)
            let date = new DateObject(value)
            formik.setFieldValue("toDate", date.format("YYYY/MM/DD"))
            formik.setFieldValue("toTime",date.format("HH:MM:SS"))
        } else {
            setToDate("")
            formik.setFieldValue("toDate", "")
            formik.setFieldValue("toTime", "")
        }
    }

    const [getReports, {isLoading: isGetReportsLoading}] = useGetAllNewReportsMutation()
    const [getLocations, {isLoading: isGetLocationsLoading}] = useGetAllGPSPointMutation()

    const schema = yup.object().shape({
        machineId: yup.string().required("لطفا متحرک را انتخاب کنید"),
    });

    const formik = useFormik({
        initialValues: {
            fromDate: "",
            toDate:"",
            fromTime:"",
            toTime:"",
            machineId: "",
            timeStep:"",
        },

        validationSchema: schema,

        onSubmit: async (product, helpers) => {
            let updateProduct = {...product}

            // setSkipFetch(false)
            // let params = handleURLSearchParams(updateProduct)
            // setFilterItem(params.toString())
            //
            // let paramsGPS = handleURLSearchParamsForGPS(updateProduct)
            // setFilterItemForGps(paramsGPS.toString())
            const location = await getLocations({...updateProduct,dateTo:updateProduct.toDate,dateFrom:updateProduct.fromDate,timeTo:updateProduct.toTime,timeFrom:updateProduct.fromTime})
            setLocations(location.data)

            const report = await getReports(updateProduct)
            setReportData(report.data)

            updateProduct = ConvertToNull(updateProduct)
            const userData = await submitData(updateProduct)


        },
    });

    const [step, setStep] = useState();
    const handleChangeStep = (newValue) => {
        setStep(newValue);
        formik.setFieldValue("timeStep",newValue)
    };

    const [submitData, {isLoading: isSubmitLoading}] = useSaveNewReportsMutation()


    const handleReset = (e) => {
        e.preventDefault()
        formik.resetForm()
        setFromDate()
        setToDate()
        setStep()
        setTemplate("")
        setReportData([])
        setLocations([])
    }

    const mapStatus = useSelector((state) => state.geofence.mapStatus)

    return (
        <>
            <div className="flex">
                <div className="bg-white w-[30%] p-4 h-screen">
                    {
                        reportHistory ? (
                            <div>
                                <h1 className="text-center text-mainPurple font-bold text-xl">
                                    سابقه گزارش
                                </h1>
                                <div className="mt-10">
                                    <div className="mx-8">
                                        <button className="flex justify-between px-10 py-2 w-full rounded-xl border borde-[#E6EEEE] hover:bg-neutral-100" onClick={()=>{setReportHistory(false)}}>
                                            <div>
                                                گزارش جدید
                                            </div>
                                            <div>
                                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.25 23L11.75 15.5L19.25 8V23Z" fill="#555555" stroke="#555555" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-center text-mainPurple font-bold text-xl">
                                    گزارش ها
                                </h1>
                                <form className="flex justify-center py-3  border-b border-gray9F" onSubmit={formik.handleSubmit}
                                      method="POST">
                                    <div className="flex flex-col justify-center gap-3 lg:w-[90%] w-[98%] ">
                                        <div>
                                            <FormControl size="small" fullWidth>
                                                <InputLabel id="demo-simple-select-label" sx={{
                                                    fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                    fontSize: "0.8rem",
                                                    color: "#9F9F9F"
                                                }}>تمپلیت جدید</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={template}
                                                    onChange={(e)=>setTemplate(e.target.value)}
                                                    name="template"
                                                    input={<OutlinedInput sx={{
                                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                        fontSize: "0.8rem"
                                                    }} label="تمپلیت جدید"/>}
                                                    sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                >
                                                    <MenuItem value="default" sx={{
                                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}> تمپلیت پیش فرض</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div>
                                            <Autocomplete
                                                size="small"
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
                                                getOptionLabel={(option) => option.tag ? option.tag.slice(2, 5) + "-" + option.tag.slice(5, 7) + "  " + option.tag.slice(7, 8) + "  " + option.tag.slice(0, 2) + " " + option.type : option.code + " " + option.type}
                                                renderOption={(props, option) => (
                                                    <Box component="li"  {...props}>
                                                        <span>{option.tag ? option.tag.slice(2, 5) + "-" + option.tag.slice(5, 7) + " " + option.tag.slice(7, 8) + " " + option.tag.slice(0, 2) : option.code}</span>
                                                        <span className="pr-4">{option.type}</span>
                                                    </Box>
                                                )}
                                                value={vehicle}
                                                onChange={(event, newValue) => {
                                                    setVehicle(newValue)
                                                    formik.setFieldValue("machineId", newValue?.gpsURL)
                                                }}
                                                renderInput={(params) =>
                                                    <TextField
                                                        error={formik.touched.machineId && Boolean(formik.errors.machineId)}
                                                        helperText={formik.touched.machineId && formik.errors.machineId}
                                                        {...params}
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            style: {
                                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                                fontSize: "0.8rem"
                                                            },
                                                            endAdornment: (
                                                                <React.Fragment>
                                                                    {isVehicleLoading ?
                                                                        <CircularProgress color="inherit" size={20}/> : null}
                                                                    {params.InputProps.endAdornment}
                                                                </React.Fragment>
                                                            )
                                                        }}
                                                        placeholder="متحرک"
                                                    />}
                                            />
                                        </div>
                                        <div
                                            className="flex justify-evenly items-center  border border-[#BBCDCD] rounded-lg  py-2 px-2 text-sm">
                                            <div className="">
                                                <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false}
                                                        className={step === "yesterday" ? "text-mainPurple" : "text-black"}
                                                        onClick={(event) => {
                                                            event.preventDefault(), handleChangeStep("yesterday")}}>
                                                    دیروز
                                                </button>
                                            </div>
                                            <div className="border-r h-full border-[#BBCDCD]">
                                                <span></span>
                                            </div>
                                            <div className="">
                                                <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false}
                                                        className={step === "today" ? "text-mainPurple" : "text-black"}
                                                        onClick={(event) => {
                                                            event.preventDefault(), handleChangeStep("today")
                                                        }}>
                                                    امروز
                                                </button>
                                            </div>
                                            <div className="border-r h-full border-[#BBCDCD]">
                                                <span></span>
                                            </div>
                                            <div className="">
                                                <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false}
                                                        className={step === "last-week" ? "text-mainPurple" : "text-black"}
                                                        onClick={(event) => {
                                                            event.preventDefault(), handleChangeStep("last-week")
                                                        }}>
                                                    هفته
                                                </button>
                                            </div>
                                            <div className="border-r h-full border-[#BBCDCD]">
                                                <span></span>
                                            </div>
                                            <div className="">
                                                <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false}
                                                        className={step === "last-month" ? "text-mainPurple" : "text-black"}
                                                        onClick={(event) => {
                                                            event.preventDefault(), handleChangeStep("last-month")
                                                        }}>
                                                    ماه
                                                </button>
                                            </div>
                                            <div className="border-r h-full border-[#BBCDCD]">
                                                <span></span>
                                            </div>
                                            <div className="">
                                                <button className="flex justify-center items-center" disabled={(formik.values.fromDate || formik.values.toDate) ? true : false}
                                                        onClick={(event) => {
                                                            event.preventDefault(), handleChangeStep("")
                                                        }}>
                                                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 14.1075L7.55375 7.55375L14.1075 14.1075M14.1075 1L7.5525 7.55375L1 1" stroke="#4D51DF" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <DatePicker
                                                disabled={(step) ? true : false}
                                                format="YYYY/MM/DD HH:mm:ss"
                                                plugins={[
                                                    <TimePicker needsConfirmation={false} position="bottom"/>,
                                                ]}
                                                calendarPosition={`bottom`}
                                                className="red "
                                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}

                                                containerStyle={{
                                                    width: "100%"
                                                }}
                                                placeholder="از تاریخ  (اجباری)"
                                                inputClass={`border border-[#9F9F9F]  placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-2`}
                                                value={fromDate}
                                                onChange={(value) => {
                                                    handleFromDateInput(value)
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
                                                <button className="px-2 pb-2 text-sm" onClick={(e) => {
                                                    e.preventDefault()
                                                    setFromDate("")
                                                    formik.setFieldValue("fromDate", "")
                                                    formik.setFieldValue("fromTime", "")
                                                }}>
                                                    ریست
                                                </button>

                                            </DatePicker>
                                        </div>
                                        <div className="w-full">
                                            <DatePicker
                                                disabled={!step ? false : true}
                                                format="YYYY/MM/DD HH:mm:ss"
                                                plugins={[
                                                    <TimePicker needsConfirmation={false} position="bottom"/>,

                                                ]}
                                                calendarPosition={`bottom`}
                                                className="red "
                                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}

                                                containerStyle={{
                                                    height:'10px !important',
                                                    width: "100%"
                                                }}
                                                placeholder="تا تاریخ  (اجباری)"
                                                inputClass={`border border-[#9F9F9F] placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-2`}
                                                value={toDate}
                                                onChange={(value) => {

                                                    handleToDateInput(value)
                                                    event.preventDefault()
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
                                                    setToDate("")
                                                    formik.setFieldValue("toDate", "")
                                                }}>
                                                    ریست
                                                </button>

                                            </DatePicker>
                                        </div>
                                        <div className='flex justify-end gap-3'>
                                            <div>
                                                {
                                                    isSubmitLoading || isGetLocationsLoading || isGetReportsLoading ? (<button disabled type="submit" className="flex  items-center justify-center py-1 px-7 rounded-[0.5rem]   border border-solid border-1 border-neutral-400  text-textGray bg-neutral-200">
                                                        <TailSpin
                                                            height="20"
                                                            width="20"
                                                            color="#4E4E4E"
                                                            ariaLabel="tail-spin-loading"
                                                            radius="1"
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}/>
                                                        اجرا
                                                    </button>) : (
                                                        <button type="submit"
                                                                className="rounded-[0.5rem] py-1 px-7 hover:border hover:opacity-80   bg-mainPurple text-white">اجرا
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <button
                                                    type='button'
                                                    onClick={handleReset}
                                                    className="rounded-[0.5rem] py-1 px-7 hover:border hover:opacity-80 bg-[#D9D9D9] text-[#797979]">
                                                    لغو
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-16">
                                    <div className="mx-8">
                                        <button className="flex justify-between px-10 py-2 w-full rounded-xl border borde-[#E6EEEE] hover:bg-neutral-100" onClick={()=>{setReportHistory(true)}}>
                                            <div>
                                                سابقه گزارشات
                                            </div>
                                            <div>
                                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.25 23L11.75 15.5L19.25 8V23Z" fill="#555555" stroke="#555555" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    reportHistory ? (
                        <div className="m-5 w-[70%] z-0">
                            <HistroyOfReport/>
                        </div>
                    ) : (
                        <div className="m-5 w-[70%] z-0">
                            <ReportMap locations={locations}/>
                            <div className="mt-10">
                                <div className="overflow-x-auto">
                                    <table
                                        className="w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
                                        <thead className="text-[0.9rem] text-white  bg-mainPurple  rounded-sm">
                                        <tr>
                                            <th className="hidden md:table-cell px-6 py-4">تعداد</th>
                                            <th className="px-2 md:px-6 py-4">شروع</th>
                                            <th className="px-2 md:px-6 px-6 py-4">پایان</th>
                                            <th className="px-2 md:px-6 px-6 py-4 xl:table-cell hidden">
                                                مدت زمان
                                            </th>
                                            <th className="hidden md:table-cell px-6 py-4">مسافت (کیلومتر)</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-body">
                                        {isGetReportsLoading
                                            ? [...Array(8)].map(() => (
                                                <tr className="border-b">
                                                    <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                                        <Skeleton variant="text" sx={{fontSize: "1rem"}}/>
                                                    </td>
                                                    <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                                                        <Skeleton variant="text" sx={{fontSize: "1rem"}}/>
                                                    </td>
                                                    <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                                                        <Skeleton variant="text" sx={{fontSize: "1rem"}}/>
                                                    </td>
                                                    <td className="px-2 md:px-6 py-2 xl:table-cell hidden  text-gray70 whitespace-nowrap ">
                                                        <Skeleton variant="text" sx={{fontSize: "1rem"}}/>
                                                    </td>
                                                    <td className="px-2 md:px-6 py-4 md:table-cell hidden text-gray70 whitespace-nowrap ">
                                                        <div className="flex justify-center">
                                                            <Skeleton
                                                                variant="rounded"
                                                                width={50}
                                                                height={20}
                                                            />
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                            : reportData?.content?.map((data, index) => (
                                                <tr
                                                    // onClick={() => {handleOpenMoreInfoRow(data);}}
                                                    className="table-row border-b">
                                                    <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap  items-center justify-center ">
                                                        {data.entryTime}
                                                    </td>
                                                    <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap  items-center justify-center ">
                                                        {data.exitTime}
                                                    </td>
                                                    <td className="px-2 md:px-6 py-2 xl:table-cell hidden text-gray70 whitespace-nowrap ">
                                                        {data.duration}
                                                    </td>

                                                    <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                                                        {data?.distance}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default NewReportPc