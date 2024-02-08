'use client'

import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    Box
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import { useLazyGetAllSubOrganizationQuery } from "@/redux/features/category/CategorySlice";
import { useLazyGetAllVehicleCategoryQuery } from "@/redux/features/category/CategorySlice";
import { useLazyGetAllVehicleQuery } from "@/redux/features/category/CategorySlice";
import { ConvertToNull } from "@/helper/ConvertToNull";

import {useSaveNewReportsMutation} from "@/redux/features/new-reports/HistoryOfReportSlice";



export default function AddDataDialog(props) {

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
        if(values.step){
            params.set("step",values.step)
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
        return params
    }

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

    const handleReset = () =>{
        formik.resetForm()
        setSubOrganization()
        setFromDate()
        setToDate()
        setVehicleCategory()
        setVehicle()
        setCount()
        setPeriod()
    }
    const validate = (values, props) => {
        const errors = {};

        if (!values.type && !values.group && !values.machineId) {
            errors.machine = "لطفا نوع وسیله یا نام وسیله یا گروه را وارد کنید";
        }
        if(!values.step && (!values.fromDate || !values.toDate) ){
            errors.period = "لطفا گام یا تاریخ را وارد کنید";
        }if(values.step==="گذشته" && (!count || !period) ){
            errors.duration = "لطفا گام را وارد کنید";
        }
        return errors;
    };

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveNewReportsMutation()

    const schema = yup.object().shape({
    });
    const formik = useFormik({
        initialValues: {
        machineId:"",
        subOrganizationId:"",
        subOrganizationName:"",
        organizationId:"",
        type:"",
        step:"",
        fromDate:"",
        toDate:"",
        },

        validate:validate,

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,machine:{id:(product.machineId===""? null : product.machineId)},fromTime:(product.fromDate===""?null:`${fromDate.hour}:${fromDate.minute}:${fromDate.second}`),toTime:(product.toDate===""?null:`${toDate.hour}:${toDate.minute}:${toDate.second}`),step:(product.step==="گذشته"?`${count} ${period}`:product.step===""?null:product.step)}

            props.setSkipFetch(false)
            let params = handleURLSearchParams(updateProduct)
            props.setFilterItem(params.toString())

            let paramsGPS = handleURLSearchParamsForGPS(updateProduct)
            props.setFilterItemForGps(paramsGPS.toString())

            updateProduct = ConvertToNull(updateProduct)
            const userData = await submitData(updateProduct)
            handleReset()
            props.handleCloseAddData()
            
        },
    });

    const [vehicleCategory,setVehicleCategory] = useState(null)
    const [openVehicleCategoryList,setOpenVehicleCategoryList] = useState(false)
    const [getVehicleCategoryList,{ data : vehicleCategoryList  = [] , isLoading : isVehicleCategoryLoading, isError: isVehicleCategoryError }] = useLazyGetAllVehicleCategoryQuery()
    useEffect(()=>{
        if(openVehicleCategoryList){
            getVehicleCategoryList()
        }
    },[openVehicleCategoryList])

    const [vehicle,setVehicle] = useState(null)
    const [openVehicleList,setOpenVehicleList] = useState(false)
    const [getVehicleList,{ data : vehicleList  = [] , isLoading : isVehicleLoading, isError: vehicleIsError }] =   useLazyGetAllVehicleQuery()
    useEffect(()=>{
        if(openVehicleList){
            getVehicleList()
        }
    },[openVehicleList])


    //subOrganization input
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])
   
    
// machine tag
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
    // const [machineCode, setMachineCode] = useState([]);

    // const handleChangeMachineCode = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   setMachineCode(
    //     // On autofill we get a stringified value.
    //     typeof value === 'string' ? value.split(',') : value,
    //   );
    // };
    // //
    // const [group, setGroup] = useState([]);

    // const handleChangeGroup = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   setGroup(
       
    //     typeof value === 'string' ? value.split(',') : value,
    //   );
    // };
    // //
    // const [type, setType] = useState([]);


    // const handleChangeType = (event) => {
    //   const {
    //     target: { value },
    //   } = event;
    //   setType(
    //     // On autofill we get a stringified value.
    //     typeof value === 'string' ? value.split(',') : value,
    //   );
    // };
    const [count, setCount] = React.useState('');

    const handleChangeCount = (event) => {
      setCount(event.target.value);
    };
    const [period, setPeriod] = React.useState('');

    const handleChangePeriod = (event) => {
      setPeriod(event.target.value);
    };
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddData}
                keepMounted
                // onClose={()=>{props.handleCloseAddData();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },}}>
                <DialogContent>
                    <DialogContentText style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}>
                        <div className="flex justify-end">
                            <button onClick={()=>{props.handleCloseAddData();handleReset()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-7">
                            <h3 className="text-[1.1rem]">ثبت گزارش </h3>
                        </div>
                        <form className="flex justify-center py-3 " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-4">
                            <div>
                            <Autocomplete
                            disabled={(formik.values.type || formik.values.machineId )? true:false}
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
                                                formik.setFieldValue("useGetAllHistoryOfReportQuery", newValue?.name)
                                                
                                            }}
                                            renderInput={(params) =>
                                                <TextField
                                                    error={formik.touched.subOrganizationId && Boolean(formik.errors.subOrganizationId)}
                                                    helperText={formik.touched.subOrganizationId && formik.errors.subOrganizationId}
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {isSubOrganizationLoading ?
                                                                    <CircularProgress color="inherit"
                                                                                      size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        )
                                                    }}
                                                    placeholder="گروه"
                                                />}
                            />
                                                </div>
                                                <div >

                                                <Autocomplete
                                                  disabled={(formik.values.subOrganizationId || formik.values.machineId )? true:false}
                                        open={openVehicleCategoryList}
                                        onOpen={() => {
                                            setOpenVehicleCategoryList(true);
                                        }}
                                        onClose={() => {
                                            setOpenVehicleCategoryList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={vehicleCategoryList}
                                        getOptionLabel={(option) => option.name}
                                        value={vehicleCategory}
                                        onChange={(event, newValue) => {
                                            
                                            setVehicleCategory(newValue)
                                            formik.setFieldValue("type", newValue?.name)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.type && Boolean(formik.errors.type)}
                                                helperText={formik.touched.type && formik.errors.type}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isVehicleCategoryLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                            }}
                                                placeholder="نوع وسیله"
                                            />}
                                    />
                                                </div>
                                                <div >
                                                <Autocomplete
                                                 disabled={formik.values.type || formik.values.subOrganizationId ? true : false}
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
                                                placeholder="نام وسیله"
                                            />}
                                    />
                                                </div>
                                             {   Boolean(formik.errors.machine) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.machine}
                                                </span>
                                            )}
                            {/* <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label"sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>کد یا پلاک وسیله نقلیه</InputLabel>
        <Select
         disabled={group.length>0 ||type.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={machineCode}
          onChange={handleChangeMachineCode}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="کد یا پلاک وسیله نقلیه" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {vehicleList?.map((machine) => {
              if(machine?.tag){
                    return (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.tag} value={machine.tag}>
                        <Checkbox checked={machineCode.indexOf(machine.tag) > -1} />
                        <span className="text-sm">{machine.tag} </span>
                       
                      </MenuItem>)
              }
          else if(!machine?.tag && machine?.code) {
return (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.code} value={machine.code}>
    <Checkbox checked={machineCode.indexOf(machine.code) > -1} />
    <span className="text-sm">{machine.code} </span>
    
  </MenuItem>)
          }
         
})}
        </Select>
      </FormControl>
     
      
                                </div>
                                <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>گروه</InputLabel>
        <Select
         disabled={type.length>0 ||machineCode.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={group}
          onChange={handleChangeGroup}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="گروه" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>
          {SubOrganizationList?.map((subOrgan) => (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}  key={subOrgan.id} value={subOrgan.id}>
                        <Checkbox  checked={group.indexOf(subOrgan.name) > -1} />
                       <span className="text-sm">{subOrgan.name}</span>
                      </MenuItem>))}
        </Select>
      </FormControl>
      
      
                                </div>
                                <div className=" flex flex-col">
                            <FormControl sx={{ m: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>نوع وسیله</InputLabel>
        <Select
         disabled={group.length>0 ||machineCode.length>0 && true}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          
          value={type}
          onChange={handleChangeType}
          input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="نوع وسیله" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {machineList?.map((machine) => (<MenuItem style={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} key={machine.name} value={machine.name}>
                        <Checkbox checked={type.indexOf(machine.name) > -1} />
                        <span className="text-sm">{machine.name}</span>
                      </MenuItem>)
)}
        </Select>
      </FormControl>
      
      
                                </div> */}
                                <div className="border-t pt-4 border-[#9F9F9F]">
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>گام</InputLabel>
                                        <Select
                                        disabled={(formik.values.fromDate || formik.values.toDate) ? true : false }
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formik.values.step}
                                            name="step"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="گام" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={formik.handleChange}>
                                            <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>بدون گام</MenuItem>
                                            <MenuItem value="امروز" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>امروز</MenuItem>
                                            <MenuItem value="دیروز" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دیروز</MenuItem>
                                            <MenuItem  value="گذشته" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>گذشته</MenuItem>
                                            <MenuItem  value="سال" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سال</MenuItem>
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
                                {formik.values.step==="گذشته" &&  <div className="flex justify-between items-center gap-2">
                                <div className="px-2 w-1/2 pt-4 ">
                                    <FormControl  fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>تعداد</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={count}
                                            name="count"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="تعداد" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={handleChangeCount}>
                                            <MenuItem value="یک" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>یک</MenuItem>
                                            <MenuItem value="دو" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دو</MenuItem>
                                            <MenuItem value="سه" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سه</MenuItem>
                                            <MenuItem  value=" چهار" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>چهار</MenuItem>   
                                            <MenuItem  value="پنج" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پنج</MenuItem>
                                            <MenuItem value="شش" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>شش</MenuItem>
                                            <MenuItem value="هفت" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>هفت</MenuItem>
                                            <MenuItem value="هشت" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>هشت</MenuItem>
                                            <MenuItem  value=" نه" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>نه</MenuItem>   
                                            <MenuItem  value="ده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>ده</MenuItem>
                                             <MenuItem value="یازده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>یازده</MenuItem>
                                            <MenuItem value="دوازده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>دوازده</MenuItem>
                                            <MenuItem value="سیزده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>سیزده</MenuItem>
                                            <MenuItem  value=" چهارده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>چهارده</MenuItem>   
                                            <MenuItem  value="پانزده" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>پانزده</MenuItem>
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
                                <div className="px-2 w-1/2 pt-4 ">
                                    <FormControl  fullWidth>
                                        <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>دوره</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={period}
                                            name="period"
                                            input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="دوره" />}
                                            sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                            onChange={handleChangePeriod}>
                                            <MenuItem value="هفته" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>هفته </MenuItem>
                                            <MenuItem value="ماه" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>ماه</MenuItem>
                                        </Select>
                                    </FormControl>
                                    
                                </div>
                                
                                </div>}
                                {   Boolean(formik.errors.duration) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.duration}
                                                </span>
                                            )}
                                {formik.values.step!=="گذشته" && <div>
                                <div className="w-full py-3">
                                <DatePicker
                                    disabled={(formik.values.step) ? true : false}
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker needsConfirmation={false} position="bottom"  />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red"
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
                                <div className="w-full py-3">
                                <DatePicker
                                    disabled={!formik.values.step ? false : true }
                                    format="YYYY/MM/DD HH:mm:ss"
                                    plugins={[
                                        <TimePicker needsConfirmation={false} position="bottom" />,
                                        
                                      ]}
                                        calendarPosition={`bottom`}
                                        className="red"
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
                                </div></div>}
                                {/* {!fromDate && !toDate &&
                                            Boolean(formik.errors.fromDate) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.step}
                                                </span>
                                            )
                                        } */}
                                          {   Boolean(formik.errors.period) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.period}
                                                </span>
                                            )}
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