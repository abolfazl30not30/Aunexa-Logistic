'use client'
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {ConvertToNull} from "@/helper/ConvertToNull";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {TailSpin} from "react-loader-spinner";
import {useSaveGeofenceMutation} from "@/redux/features/geofence/GeofenceSlice";
import {useLazyGetAllSubOrganizationQuery} from "@/redux/features/category/CategorySlice";
import {
     setCenterPoint,
    setFenceType,
    setMapStatus,
    setPoints,
    setRadius,
    setShapeColor
} from "@/redux/geofence/geofenceSlice";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {ChromePicker, SketchPicker} from "react-color";
import Checkbox, {checkboxClasses} from "@mui/material/Checkbox";
import {toast} from "react-toastify";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        }
    },
    textarea: {
        resize: "vertical"
    }
}));

function NewGeofence() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const fenceType = useSelector((state) => state.geofence.fenceType);
    const centerPoint = useSelector((state) => state.geofence.centerPoint);
    const radius = useSelector((state) => state.geofence.radius);
    const points = useSelector((state) => state.geofence.points);

    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState("")
    const [timeLimitation,setTimeLimitation] = useState(false)

    const handleTimeLimitation = () =>{
        formik.setFieldValue("stopTimeInMinutes","")
        setTimeLimitation((state)=>!state)
    }
    const handleOpenColorPicker = (e) => {
        e.preventDefault()
        setDisplayColorPicker((state) => !state)
    }
    const handleCloseColorPicker = () => {
        setDisplayColorPicker(false)
    };
    const handleChangeColor = (color) =>{
        formik.setFieldValue("color",color.hex)
        dispatch(setShapeColor(color.hex))
        setColor(color)
    }
    //subOrganization input
    const [subOrganization, setSubOrganization] = useState(null)
    const [openSubOrganizationList, setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList, {
        data: subOrganizationList = [],
        isLoading: isSubOrganizationLoading,
        isError: isSubOrganizationError
    }] = useLazyGetAllSubOrganizationQuery()
    useEffect(() => {
        if (openSubOrganizationList) {
            getSubOrganizationList()
        }
    }, [openSubOrganizationList])

    const handleReset = () => {
        formik.resetForm()
        setSubOrganization(null)
        dispatch(setShapeColor("#4D51DF"))
        dispatch(setFenceType(""))
        dispatch(setPoints(""))
        dispatch(setRadius(""))
        dispatch(setCenterPoint(""))
    }

    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useSaveGeofenceMutation()

    const schema = yup.object().shape({
        name: yup.string().required("لطفا نام ژئوفنس را وارد کنید"),
        subOrganizationId: yup.string().required("لطفا ناوگان را انتخاب کنید"),
    });

    const validate = (values, props) => {
        const errors = {};

        if(values.stopTimeInMinutes === "" && !timeLimitation){
            errors.stopTimeInMinutes = "لطفا حداکثر زمان توقف رو را وارد کنید"
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            subOrganizationId: "",
            subOrganizationName: "",
            stopTimeInMinutes: "",
            description: "",
            fenceType: "",
            centerPoint: "",
            radius: "",
            points: "",
            color:"#4D51DF",
        },

        validationSchema: schema,
        validate: validate,

        onSubmit: async (geofence, helpers) => {
            if(fenceType === ""){

                toast.error("لطفا ناحیه جغرافیایی رسم کنید", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }else {
                let updateGeofence = {...geofence,fenceType,centerPoint,radius,points};
                updateGeofence = ConvertToNull(updateGeofence)
                const userData = await submitData(updateGeofence)
                handleReset()
                dispatch(setMapStatus("show"))
            }

        },
    });

    const handleCancel = () => {
        dispatch(setMapStatus("show"))
        handleReset()
    }
    const popover = {
        position: 'absolute',
        zIndex: '10',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <>
            <div>
                <div className="mt-2 mb-4 text-center">
                    <h3 className="text-[1rem] text-mainPurple">افزودن ژئوفنس</h3>
                </div>
                <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col justify-center w-[90%] gap-3">
                        <div>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="نام"
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                inputProps={{
                                    style: {
                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                        fontSize: "0.8rem"
                                    }
                                }}
                                InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                        </div>
                        <div>
                            <TextField
                                multiline
                                rows={1}
                                maxRows={4}
                                fullWidth
                                placeholder="توضيحات (اختياری)"
                                type="text"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                inputProps={{
                                    className: classes.textarea,
                                    style: {
                                        fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                        fontSize: "0.8rem"
                                    }
                                }}
                                InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                        </div>
                        <div className=" flex flex-col">
                            <Autocomplete
                                size="small"
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
                                            style: {
                                                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                fontSize: "0.8rem"
                                            },
                                            endAdornment: (
                                                <React.Fragment>
                                                    {isSubOrganizationLoading ?
                                                        <CircularProgress color="inherit" size={20}/> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            )
                                        }}
                                        placeholder="ناوگان"
                                    />}
                            />
                        </div>

                        <div className="flex ">
                            {/*<div className="w-1/2">*/}
                            {/*    <TextField*/}
                            {/*        size="small"*/}
                            {/*        fullWidth*/}
                            {/*        placeholder="حداكثر‌سرعت مجاز (km/h)"*/}
                            {/*        type="number"*/}
                            {/*        name="speed"*/}
                            {/*        value={formik.values.speed}*/}
                            {/*        onChange={formik.handleChange}*/}
                            {/*        error={formik.touched.speed && Boolean(formik.errors.speed)}*/}
                            {/*        helperText={formik.touched.speed && formik.errors.speed}*/}
                            {/*        inputProps={{*/}
                            {/*            style: {*/}
                            {/*                fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",*/}
                            {/*                fontSize: "0.8rem"*/}
                            {/*            }*/}
                            {/*        }}*/}
                            {/*        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>*/}
                            {/*</div>*/}
                            <div className="w-full">
                                <TextField
                                    disabled={timeLimitation}
                                    size="small"
                                    fullWidth
                                    placeholder="حداكثرزمان‌توقف(دقيقه)"
                                    type="number"
                                    name="stopTimeInMinutes"
                                    value={formik.values.stopTimeInMinutes}
                                    onChange={formik.handleChange}
                                    error={formik.touched.stopTimeInMinutes && Boolean(formik.errors.stopTimeInMinutes)}
                                    helperText={formik.touched.stopTimeInMinutes && formik.errors.stopTimeInMinutes}
                                    inputProps={{
                                        style: {
                                            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                            fontSize: "0.8rem"
                                        }
                                    }}
                                    InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div>
                                <Checkbox
                                    checked={timeLimitation}
                                    onClick={handleTimeLimitation}
                                    sx={{
                                        [`&.${checkboxClasses.checked}`]: {
                                            color: '#4D51DF',
                                        },
                                    }}
                                    inputProps={{"aria-label": "controlled"}}/>
                            </div>
                            <div className="text-[#797979] text-[0.9rem]">
                                بدون محدودیت زمانی
                            </div>

                        </div>
                        <div className="flex gap-3">
                            <div>
                                <span className="text-[#797979] text-[0.9rem]">
                                    رنگ :
                                </span>
                            </div>
                            <div>
                                <div className={`w-5 h-5 rounded`} style={color !== "" ? {backgroundColor:color.hex}:{backgroundColor:"#4D51DF"}}></div>
                            </div>
                            <div>
                                <button onClick={handleOpenColorPicker}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.1111 10C15.6691 10 15.2452 9.82441 14.9326 9.51184C14.62 9.19928 14.4444 8.77536 14.4444 8.33333C14.4444 7.89131 14.62 7.46738 14.9326 7.15482C15.2452 6.84226 15.6691 6.66667 16.1111 6.66667C16.5531 6.66667 16.9771 6.84226 17.2896 7.15482C17.6022 7.46738 17.7778 7.89131 17.7778 8.33333C17.7778 8.77536 17.6022 9.19928 17.2896 9.51184C16.9771 9.82441 16.5531 10 16.1111 10ZM12.7778 5.55556C12.3357 5.55556 11.9118 5.37996 11.5993 5.0674C11.2867 4.75484 11.1111 4.33092 11.1111 3.88889C11.1111 3.44686 11.2867 3.02294 11.5993 2.71038C11.9118 2.39782 12.3357 2.22222 12.7778 2.22222C13.2198 2.22222 13.6437 2.39782 13.9563 2.71038C14.2688 3.02294 14.4444 3.44686 14.4444 3.88889C14.4444 4.33092 14.2688 4.75484 13.9563 5.0674C13.6437 5.37996 13.2198 5.55556 12.7778 5.55556ZM7.22222 5.55556C6.78019 5.55556 6.35627 5.37996 6.04371 5.0674C5.73115 4.75484 5.55556 4.33092 5.55556 3.88889C5.55556 3.44686 5.73115 3.02294 6.04371 2.71038C6.35627 2.39782 6.78019 2.22222 7.22222 2.22222C7.66425 2.22222 8.08817 2.39782 8.40073 2.71038C8.71329 3.02294 8.88889 3.44686 8.88889 3.88889C8.88889 4.33092 8.71329 4.75484 8.40073 5.0674C8.08817 5.37996 7.66425 5.55556 7.22222 5.55556ZM3.88889 10C3.44686 10 3.02294 9.82441 2.71038 9.51184C2.39782 9.19928 2.22222 8.77536 2.22222 8.33333C2.22222 7.89131 2.39782 7.46738 2.71038 7.15482C3.02294 6.84226 3.44686 6.66667 3.88889 6.66667C4.33092 6.66667 4.75484 6.84226 5.0674 7.15482C5.37996 7.46738 5.55556 7.89131 5.55556 8.33333C5.55556 8.77536 5.37996 9.19928 5.0674 9.51184C4.75484 9.82441 4.33092 10 3.88889 10ZM10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C10.442 20 10.866 19.8244 11.1785 19.5118C11.4911 19.1993 11.6667 18.7754 11.6667 18.3333C11.6667 17.9 11.5 17.5111 11.2333 17.2222C10.9778 16.9222 10.8111 16.5333 10.8111 16.1111C10.8111 15.6691 10.9867 15.2452 11.2993 14.9326C11.6118 14.62 12.0357 14.4444 12.4778 14.4444H14.4444C15.9179 14.4444 17.3309 13.8591 18.3728 12.8173C19.4147 11.7754 20 10.3623 20 8.88889C20 3.97778 15.5222 0 10 0Z" fill="#797979"/>
                                    </svg>
                                </button>

                                {displayColorPicker ?
                                    <div style={popover}>
                                        <div style={cover} onClick={handleCloseColorPicker}/>
                                        <ChromePicker  color={color} onChange={handleChangeColor}/>
                                    </div> : null}
                            </div>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <div>
                                {
                                    isSubmitLoading ? (<button disabled type="submit"
                                                               className="flex  items-center justify-center py-1 px-7 rounded-[0.5rem]   border border-solid border-1 border-neutral-400  text-textGray bg-neutral-200">
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
                                                className="rounded-[0.5rem] py-1 px-7 hover:border hover:opacity-80   bg-mainPurple text-white">ثبت
                                        </button>
                                    )
                                }
                            </div>
                            <div>
                                <button
                                    onClick={handleCancel}
                                    className="rounded-[0.5rem] py-1 px-7 hover:border hover:opacity-80 bg-[#D9D9D9] text-[#797979]">
                                    لغو
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewGeofence