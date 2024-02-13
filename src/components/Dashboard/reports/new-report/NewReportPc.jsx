'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TextField from "@mui/material/TextField";
import Geofence from "@/components/Dashboard/geofence/geographicArea/Geofence";
import Group from "@/components/Dashboard/geofence/geographicArea/Group";
import DeleteDialog from "@/components/Dashboard/geofence/geographicArea/DeleteDialog";
import {useSelector} from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import {useFormik} from "formik";
import { ConvertToNull } from "@/helper/ConvertToNull";
import * as yup from "yup";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import {useSaveNewReportsMutation} from "@/redux/features/new-reports/HistoryOfReportSlice";
import {TailSpin} from "react-loader-spinner";
import { useLazyGetAllVehicleQuery } from "@/redux/features/category/CategorySlice";
import {
    Pagination,
    Skeleton,
  } from "@mui/material";
import {
    useGetAllGPSPointQuery,
    useGetAllNewReportsQuery,
  } from "@/redux/features/new-reports/NewReportsSlice";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    
} from "@mui/material";
const ReportMap = dynamic(
    () =>
        import(
            "./ReportMap"
            ),
    { ssr: false }
);

// const ShowGeofenceMap = dynamic(

//     () =>
//         import(
//             "./ShowGeofenceMap"
//             ),
//     { ssr: false }
// );
function  NewReportPc(){
   
    const [skipFetch,setSkipFetch] = useState(true)
    const [filterItem, setFilterItem] = useState("");
    const [filterItemForGps, setFilterItemForGps] = useState("");
    const {
        data: inventoryData = [],
        isLoading: isDataLoading,
        isError: isDataError,
      } = useGetAllNewReportsQuery(
        {  filterItem },
        { skip :skipFetch, refetchOnMountOrArgChange: true }
      );
    const{
        data: locations = [],
        isLoading: isLocationsLoading,
        isError: isLocationsError,
      } = useGetAllGPSPointQuery(
          {  filterItemForGps },
          { skip : skipFetch ,refetchOnMountOrArgChange: true }
      );
    const [template,setTemplate]=useState()
    
    const [vehicle,setVehicle] = useState(null)
    const [openVehicleList,setOpenVehicleList] = useState(false)
    const [getVehicleList,{ data : vehicleList  = [] , isLoading : isVehicleLoading, isError: vehicleIsError }] =   useLazyGetAllVehicleQuery()
    useEffect(()=>{
        if(openVehicleList){
            getVehicleList()
        }
    },[openVehicleList])
    const [fromDate, setFromDate] = useState(
        ((number) =>
          new DateObject().set({
            day: number,
            hour: number,
            minute: number,
            second: number,
          })
        )
      );
      
      const handleFromDateInput = (value) => {
        if(value){
            setFromDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("fromDate", convertDate)
        }else {
            formik.setFieldValue("fromDate", "")
        }
    }

    const [toDate, setToDate] = useState(
        ((number) =>
          new DateObject().set({
            day: number,
            hour: number,
            minute: number,
            second: number,
          })
        )
      );
      const handleToDateInput = (value) => {
        if(value){
            setToDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("toDate", convertDate)
        }else {
            formik.setFieldValue("toDate", "")
        }
    }
    const [step, setStep] = useState();

  const handleChangeStep = ( newValue) => {
    setStep(newValue);
  };
    const schema = yup.object().shape({
    });
    const formik = useFormik({
        initialValues: {
      
       
       fromDate:"",
       machineId:""
        },

        

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,step:step,fromTime:(product.fromDate===""?null:`${fromDate.hour}:${fromDate.minute}:${fromDate.second}`),toTime:(product.toDate===""?null:`${toDate.hour}:${toDate.minute}:${toDate.second}`)}

            setSkipFetch(false)
            let params = handleURLSearchParams(updateProduct)
            setFilterItem(params.toString())

            let paramsGPS = handleURLSearchParamsForGPS(updateProduct)
            setFilterItemForGps(paramsGPS.toString())

            updateProduct = ConvertToNull(updateProduct)
            const userData = await submitData(updateProduct)
            handleReset()
            
            
        },
    });
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveNewReportsMutation()
    const handleReset = () =>{
        formik.resetForm()
        setFromDate()
        setToDate()
        setStep()
        
       
    }

    const mapStatus = useSelector((state)=> state.geofence.mapStatus)
    return(
        <>
            <div className="flex">
                <div className="bg-white w-[30%] p-4 h-screen">
                    <h1 className="text-center text-mainPurple font-bold text-xl">
                        گزارش ها
                    </h1>
                    <form className="flex justify-center py-3  border-b border-gray9F" onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col justify-center gap-3 lg:w-[90%] w-[98%] ">
                    <div className=" pt-4 ">
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>تمپلیت جدید</InputLabel>
                                        <Select
                                        // disabled={(formik.values.fromDate || formik.values.toDate) ? true : false }
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={template}
                                            name="template"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="تمپلیت جدید" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            >
                                            <MenuItem value="تمپلیت پیش فرض" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}> تمپلیت پیش فرض</MenuItem>
                                           
                                        </Select>
                                    </FormControl>
                                    {/* {!formik.values.step &&
                                            Boolean(formik.errors.step) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.step}
                                                </span>
                                            )
                                        } */}
                                </div>
                                <div className=" pt-4 ">
                               
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
                                        getOptionLabel={(option) =>option.tag?option.tag.slice(2, 5)+ "-" +option.tag.slice(5, 7) + "  " + option.tag.slice(7, 8) + "  " +option.tag.slice(0, 2) +" "+option.type:option.code +" "+ option.type}
                                        renderOption={(props, option) => (
                                            <Box component="li"  {...props}>
                                                <span>{option.tag?option.tag.slice(2, 5) + "-" + option.tag.slice(5, 7) + " " + option.tag.slice(7, 8) + " " + option.tag.slice(0, 2):option.code}</span>  <span className="pr-4">{option.type}</span> 
                                            </Box>
                                        )}
                                        value={vehicle}
                                        onChange={(event, newValue) => {
                                            setVehicle(newValue)
                                            formik.setFieldValue("machineId",newValue?.gpsURL)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.machineId && Boolean(formik.errors.machineId)}
                                                helperText={formik.touched.machineId && formik.errors.machineId}
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
                                                placeholder="متحرک"
                                            />}
                                    />
                                               
                                         
                                </div>
                                <div className="flex justify-evenly items-center  border border-[#BBCDCD] rounded-lg mt-4 py-2 px-2 text-sm">
                                   <div className=" ">
                                     <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false} className={step==="دیروز"?"text-mainPurple":"text-black"} onClick={(event)=>{event.preventDefault(),handleChangeStep("دیروز")}}>
                                        دیروز
                                     </button>
                                   </div>
                                   <div className="border-r h-full border-[#BBCDCD]">
                                     <span></span>
                                   </div>
                                   <div className="">
                                     <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false} className={step==="امروز"?"text-mainPurple":"text-black"} onClick={(event)=>{event.preventDefault(),handleChangeStep("امروز")}}>
                                          امروز
                                     </button>
                                   </div>
                                   <div className="border-r h-full border-[#BBCDCD]">
                                     <span></span>
                                   </div>
                                   <div className="">
                                     <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false} className={step==="هفته"?"text-mainPurple":"text-black"} onClick={(event)=>{event.preventDefault(),handleChangeStep("هفته")}}>
                                         هفته
                                     </button>
                                   </div>
                                   <div className="border-r h-full border-[#BBCDCD]">
                                     <span></span>
                                   </div>
                                   <div className="">
                                     <button disabled={(formik.values.fromDate || formik.values.toDate) ? true : false} className={step==="ماه"?"text-mainPurple":"text-black"} onClick={(event)=>{event.preventDefault(),handleChangeStep("ماه")}}>
                                          ماه
                                     </button>
                                   </div>
                                </div>
                                <div className="w-full pt-4">
                                <DatePicker
                                    disabled={(step) ? true : false}
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker needsConfirmation={false} position="bottom"  />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red "
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="از تاریخ  (اجباری)"
                                        inputClass={`border border-[#9F9F9F]  placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-4`}
                                        value={fromDate}
                                        onChange={(value) => {
                                            handleFromDateInput(value)
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
                                        <button className="px-2 pb-2 text-sm" onClick={(e) => {
                                            e.preventDefault()
                                            setFromDate("")
                                            formik.setFieldValue("fromDate", "")
                                        }}>
                                            ریست
                                        </button>
                                        
                                    </DatePicker>
                                </div>
                                <div className="w-full pt-4">
                                <DatePicker
                                    disabled={!step ? false : true }
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker needsConfirmation={false} position="bottom" />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red "
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="تا تاریخ  (اجباری)"
                                        inputClass={`border border-[#9F9F9F] placeholder-[#9F9F9F] text-gray-900 text-[0.8rem] rounded focus:ring-[#9F9F9F] focus:border-[#9F9F9F] block w-full px-3 py-4`}
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
                                <div className="flex justify-between items-center gap-2 md:mx-4 mx-1 pt-8">
                                   <div className="md:w-[45%] w-[50%]">
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
                                            اجرا 
                                        </button>) : (
                                            <button type="submit"
                                                    className="w-full rounded-[0.5rem] py-3  hover:opacity-80 font-bold  bg-mainPurple text-white">اجرا 
                                            </button>
                                        )
                                    }
                                </div>
                                   </div>
                                   <div className="md:w-[45%] w-[50%]">
                                   <button onClick={handleReset} 
                                                    className="w-full rounded-[0.5rem] py-3  hover:opacity-80 font-bold  bg-[#BBCDCD] text-white"> پاک کردن
                                    </button>
                                   </div>
                                </div>
                                </div>
                                </form>
                </div>
                <div className="m-5  w-[70%] z-0">
                    {/* {mapStatus === "show" ? (
                        <ShowGeofenceMap/>
                    ):(
                        <ReportMap/>
                    )} */}
                    <ReportMap locations={locations}/>
                    <div className="mt-10">
          <div className="overflow-x-auto">
            <table className="w-full table-auto overflow-scroll border-collapse border-spacing-0 text-sm text-center text-gray70  ">
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
                {isDataLoading
                  ? [...Array(8)].map(() => (
                      <tr className="border-b">
                        <td className="hidden md:table-cell px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </td>
                        <td className="px-2 md:px-6 py-2 xl:table-cell hidden  text-gray70 whitespace-nowrap ">
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
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
                  : inventoryData?.content?.map((data, index) => (
                      <tr
                        onClick={() => {
                          handleOpenMoreInfoRow(data);
                        }}
                        className="table-row border-b"
                      >
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
                        {/* <td className="px-2 md:px-6 py-4  text-gray70 whitespace-nowrap ">
                          {data.status === "CONFIRMED" ? (
                            <span className="text-[0.8rem] bg-greenBg text-greenText py-1 px-2 rounded-xl">
                              تاييد شده
                            </span>
                          ) : data.status === "UNKNOWN" ? (
                            <span className="text-[0.8rem] bg-[#EBEBEB] text-gray70 py-1 px-2 rounded-xl">
                              نامعلوم
                            </span>
                          ) : (
                            <span className="text-[0.8rem] bg-orangeBg text-orangeText py-1 px-2 rounded-xl">
                              مشکل دار
                            </span>
                          )}
                        </td> */}
                       
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        

                </div>
            </div>

        </>
    )
}
export default NewReportPc