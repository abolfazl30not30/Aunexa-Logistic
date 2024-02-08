'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
     useLazyGetAllSubOrganizationQuery,
    useLazyGetAllVehicleCategoryQuery
} from "@/redux/features/category/CategorySlice";

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {useSaveVehiclesMutation} from "@/redux/features/vehicles-and-equipment/VehiclesAndEquipmentSlice";
import { ConvertToNull } from "@/helper/ConvertToNull";

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 35,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 12,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(10px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(17px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#DB3746' : '#DB3746',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 13,
        borderRadius: 4,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

export default function AddDataDialog(props) {
    const alphabeticalList = [
        {value: "هیچ کدام"},
        {value: "ا"},
        {value: "ب"},
        {value: "پ"},
        {value: "ت"},
        {value: "ث"},
        {value: "ج"},
        {value: "ح"},
        {value: "د"},
        {value: "ر"},
        {value: "ز"},
        {value: "ژ"},
        {value: "س"},
        {value: "ش"},
        {value: "ص"},
        {value: "ض"},
        {value: "ط"},
        {value: "ظ"},
        {value: "ع"},
        {value: "ف"},
        {value: "ق"},
        {value: "ک"},
        {value: "گ"},
        {value: "ل"},
        {value: "م"},
        {value: "ن"},
        {value: "و"},
        {value: "ه"},
        {value: "ی"},
        {value: "D"},
        {value: "S"},
    ]

    //product input
    const [vehicleCategory,setVehicleCategory] = useState(null)
    const [openVehicleCategoryList,setOpenVehicleCategoryList] = useState(false)
    const [getVehicleCategoryList,{ data : vehicleCategoryList  = [] , isLoading : isVehicleCategoryLoading, isError: isVehicleCategoryError }] = useLazyGetAllVehicleCategoryQuery()
    useEffect(()=>{
        if(openVehicleCategoryList){
            getVehicleCategoryList()
        }
    },[openVehicleCategoryList])

    //product input
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])

    //date input
    const [date,setDate] = useState("")
    const handleDateInput = (value) => {
        if(value){
            setDate(value)
            let month = value?.month < 10 ? ('0' + value?.month) : value?.month;
            let day = value?.day < 10 ? ('0' + value?.day) : value?.day;
            let convertDate = value?.year + '/' + month + '/' + day;
            formik.setFieldValue("purchaseDate", convertDate)
        }else {
            formik.setFieldValue("purchaseDate", "")
        }
    }

    //tag input
    const [tag, setTag] = useState({
        part1: "",
        part2: "",
        part3: "",
        part4: "",
    })
    useEffect(()=>{
        const tagString = tag.part4 + tag.part2  + tag.part1  + tag.part3
        console.log(tagString)
        formik.setFieldValue("tag", tagString)
    },[tag])

    const handleTag = (e) => {
        if (e.target.name === "part1") {
            setTag((co) => ({...co, part1: e.target.value}))
        } else if (e.target.name === "part2") {
            setTag((co) => ({...co, part2: e.target.value}))
        } else if (e.target.name === "part3") {
            if(e.target.value!=="هیچ کدام"){
             setTag((co) => ({...co, part3: e.target.value}))
            }else{
             setTag((co) => ({...co, part3: ""}))
            }
         } else if (e.target.name === "part4") {
            setTag((co) => ({...co, part4: e.target.value}))
        }
    }

    const validate = (values, props) => {
        const errors = {};

        if (!values.tag && !values.code) {
            errors.tag = "لطفا پلاک یا کد وسیله نقلیه را وارد کنید";
        } else if ( values.tag) {
            if (!/[۰۱۲۳۴۵۶۷۸۹0-9]{7}./.test(values.tag)) {
                errors.tag = 'لطفا پلاک  وسیله نقلیه را به صورت صحیح و کامل وارد کنید';
            }
        }
        return errors;
    };

    const handleReset = () =>{
        formik.resetForm()
        setDate("")
        setVehicleCategory(null)
        setSubOrganization(null)
        setTag({
            part1: "",
            part2: "",
            part3: "",
            part4: ""})
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveVehiclesMutation()
    const schema = yup.object().shape({
        type: yup.string().required("لطفا نوع وسیله را وارد کنید"),
        subOrganizationId: yup.string().required("لطفا گروه مورد نظر را انتخاب کنید"),
        status: yup.string().required("لطفا وضعیت را انتخاب کنید"),
    
    });

    const formik = useFormik({
        initialValues: {
            type: "",   
            tag: "",
            code: "",
            hasGps:false,
            gpsURL: "",
            status:"",
            subOrganizationId:"",
            subOrganizationName:"",
            purchaseDate:""
        },
      
        validate: validate,
        

        validationSchema: schema,

        onSubmit: async (vehicle) => {
            const updateVehicle = ConvertToNull(vehicle)
            console.log(updateVehicle)
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
                // onClose={()=>{props.handleCloseAddData();handleReset()}}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                    },
                }}>
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
                            <h3 className="text-[1.1rem]">ثبت وسایل و تجهیزات</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                <div className=" flex flex-col">
                                    <Autocomplete
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
                                <div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="plate w-full md:w-[47%] flex items-center pl-4">
                                            <div>
                                                <div className="w-[55px] h-full pt-3  pl-1 pr-3">
                                                    <input  name="part1"
                                                           onChange={handleTag} value={tag.part1}
                                                           type="text" placeholder="55" maxLength="2"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-[60px] h-full py-1 pl-1 pr-3 h-full">
                                                    <input  name="part2"
                                                           onChange={handleTag} value={tag.part2}
                                                           type="text" placeholder="555" maxLength="3"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                                <div>
                                                    <FormControl sx={{width: "58px", bgcolor: "#fff"}} size="small">
                                                        <Select
                                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                            
                                                            name="part3"
                                                            value={tag.part3}
                                                            onChange={handleTag}
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small">
                                                            {
                                                                alphabeticalList.map((alpha)=>(
                                                                    <MenuItem  sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} value={alpha.value}>{alpha.value}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="w-[50px] h-full py-1 pl-2 pr-1 h-full">
                                                    <input  name="part4"
                                                           onChange={handleTag} value={tag.part4}
                                                           type="text" placeholder="55" maxLength="2"
                                                           className="w-full h-full placeholder-neutral-300 text-center rounded"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-[6%] flex justify-center items-center">
                                            <span className="text-[1rem]">
                                                یا
                                            </span>
                                        </div>
                                        <div className="w-full md:w-[47%]">
                                            <TextField
                                                
                                                fullWidth
                                                placeholder="کد وسیله نقلیه(اجباری)"
                                                type="text"
                                                name="code"
                                                value={formik.values.code}
                                                onChange={formik.handleChange}
                                                error={formik.touched.code && Boolean(formik.errors.code)}
                                                // helperText={formik.touched.tag && formik.errors.tag}
                                                inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                                InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            Boolean(formik.errors.tag) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.tag}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <div className="flex w-full">
                                            <div className="border border-[#D9D9D9] py-4 w-1/2 px-3">
                                                <span className="text-[#9F9F9F] text-[0.8rem]">آیا داری GPS می باشد؟</span>
                                            </div>
                                            <div className="border border-[#D9D9D9] py-4 w-1/2">
                                                <div className="flex justify-center gap-2">
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">خیر</span>
                                                    <AntSwitch checked={formik.values.hasGps} onChange={(e)=>{formik.setFieldValue("hasGps", e.target.checked)}}  inputProps={{ 'aria-label': 'ant design' }} />
                                                    <span className="text-[#9F9F9F] text-[0.8rem]">بله</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        disabled={!formik.values.hasGps}
                                        fullWidth
                                        placeholder="API جی پی اس"
                                        type="text"
                                        name="gpsURL"
                                        value={formik.values.gpsURL}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gpsURL && Boolean(formik.errors.gpsURL)}
                                        helperText={formik.touched.gpsURL && formik.errors.gpsURL}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className=" flex flex-col">
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
                                            formik.setFieldValue("subOrganizationName", newValue?.name)
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
                                                placeholder="گروه"
                                            />}
                                    />
                                </div>
                                <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                                    <InputLabel id="demo-simple-select-label" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem",color:"#9F9F9F"}}>وضعیت</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={formik.values.status}
                                        value={formik.values.status}
                                        name="status"
                                        input={<OutlinedInput sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}} label="وضعیت" />}
                                        sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                        onChange={formik.handleChange}>

                                        <MenuItem value="AVAILABLE" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>در دسترس</MenuItem>
                                        <MenuItem value="IN_USE" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>درحال استفاده</MenuItem>
                                        <MenuItem value="DESTROYED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>خراب</MenuItem>
                                    </Select>
                                    <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
                                </FormControl>
                                <div>
                                    <DatePicker
                                        calendarPosition={`bottom`}
                                        className="red"
                                        digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                        format={`YYYY/MM/DD`}
                                        containerStyle={{
                                            width: "100%"
                                        }}
                                        placeholder="تاریخ خرید (اختیاری)"
                                        inputClass={`border border-[#D9D9D9] placeholder-neutral-300 text-gray-900 text-[0.8rem] rounded focus:ring-[#3B82F67F] focus:border-[#3B82F67F] block w-full px-3 py-4`}
                                        value={date}
                                        onChange={(value) => {
                                            handleDateInput(value)
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
                                            setDate("")
                                            formik.setFieldValue("purchaseDate", "")
                                        }}>
                                            ریست
                                        </button>
                                    </DatePicker>
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