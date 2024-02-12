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
import {setMapStatus} from "@/redux/geofence/geofenceSlice";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";


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
    }

    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useSaveGeofenceMutation()

    const schema = yup.object().shape({
        name: yup.string().required("لطفا نام ناحیه جغرافیایی را وارد کنید"),
        speed: yup.string().required("لطفا حداكثر سرعت مجاز در اين ناحيه را وارد كنيد"),
        stopTimeInMinutes: yup.string().required("لطفا حداكثر زمان توقف در اين ناحيه را وارد كنيد"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            subOrganizationId: "",
            subOrganizationName: "",
            speed: "",
            stopTimeInMinutes: "",
            fenceType: "",
            description: "",
            centerPoint: "",
            radius: "",
            points: "",
        },

        validationSchema: schema,

        onSubmit: async (geofence, helpers) => {
            let updateGeofence = ConvertToNull(geofence)
            const userData = await submitData(updateGeofence)
            handleReset()
        },
    });

    const handleCancel = () => {
        dispatch(setMapStatus("show"))
    }
    return (
        <>
            <div>
                <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col justify-center w-[90%] gap-4">
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
                                        placeholder="گروه"
                                    />}
                            />
                        </div>
                        <div>
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="حداكثر‌سرعت مجاز (km/h)"
                                type="number"
                                name="speed"
                                value={formik.values.speed}
                                onChange={formik.handleChange}
                                error={formik.touched.speed && Boolean(formik.errors.speed)}
                                helperText={formik.touched.speed && formik.errors.speed}
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

                        <div className='flex justify-end gap-3'>
                            <div>
                                {
                                    isSubmitLoading ? (<button disabled type="submit"
                                                               className="flex  items-center justify-center w-full rounded-[0.5rem] py-2  border border-solid border-1 border-neutral-400  text-textGray bg-neutral-200">
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
                                    className="rounded-[0.5rem] py-1 px-7 hover:border hover:opacity-80   bg-[#D9D9D9] text-[#797979]">
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