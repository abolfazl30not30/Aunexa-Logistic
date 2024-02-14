'use client'
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select,
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
import {
    useLazyGetAllProductQuery,
    useLazyGetAllSubOrganizationQuery,
    useLazyGetAllVehicleCategoryQuery
} from "@/redux/features/category/CategorySlice";
import {useEffect} from "react";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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
                backgroundColor: theme.palette.mode === 'dark' ? '#4D51DF' : '#4D51DF',
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

export default function FilterDialog(props) {
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

    const handleURLSearchParams = (values) =>{
        let params = new URLSearchParams()
        if(values.type){
            params.set("type",values.type)
        }
        if(values.subOrganizationId){
            params.set("subOrganizationId",values.subOrganizationId)
        }
        if(values.status){
            params.set("status",values.status)
        }
        if(values.hasGps === true){
            params.set("hasGps","true")
        }
        return params
    }

    const handleResetForm = () =>{
        formik.resetForm()
        setVehicleCategory(null)
        setSubOrganization(null)
    }
    const formik = useFormik({

        initialValues: {
            subOrganizationId:"",
            type: "",
            status:"",
            hasGps: false,
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
                                        <MenuItem value="" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>همه وضعیت ها</MenuItem>
                                        <MenuItem value="AVAILABLE" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>در دسترس</MenuItem>
                                        <MenuItem value="IN_USE" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>درحال استفاده</MenuItem>
                                        <MenuItem value="DESTROYED" sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}>خراب</MenuItem>
                                    </Select>
                                    <FormHelperText>{formik.touched.status && formik.errors.status}</FormHelperText>
                                </FormControl>
                                <div>
                                    <div className="flex flex-col">
                                        <div className="flex w-full">
                                            <div className="border border-[#D9D9D9] py-4 w-1/2 px-3">
                                                <span className="text-[#9F9F9F] text-[0.8rem]">فقط GPS دار </span>
                                            </div>
                                            <div className="border border-[#D9D9D9] py-4 w-1/2">
                                                <div className="flex justify-center">
                                                    <AntSwitch checked={formik.values.hasGps} onChange={(e)=>{formik.setFieldValue("hasGps", e.target.checked)}}  inputProps={{ 'aria-label': 'ant design' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit"
                                            className="w-full text-[0.9rem] rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainPurple text-white">اعمال فیلتر
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