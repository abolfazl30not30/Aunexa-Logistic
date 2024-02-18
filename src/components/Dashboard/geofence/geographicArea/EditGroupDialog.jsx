'use client'

import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {
    DialogContent,
    DialogContentText,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Pagination,
    Skeleton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";

import "leaflet-draw/dist/leaflet.draw.css";
import {useGetAllGeofenceQuery, useSaveGeofenceMutation} from "@/redux/features/geofence/GeofenceSlice";
import {ConvertToNull} from "@/helper/ConvertToNull";
import {makeStyles} from "@material-ui/core/styles";
import Checkbox, {checkboxClasses} from "@mui/material/Checkbox";
import {useSaveGroupMutation, useUpdateGroupMutation} from "@/redux/features/geofence/GroupOfGeofencSlice";
import {useEffect} from "react";
import {ConvertToEmpty} from "@/helper/ConvertToEmpty";


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

export default function EditGroupDialog(props) {
    const [searchValue, setSearchValue] = useState("");

    const classes = useStyles();

    const [page, setPage] = useState(1);

    const [sort, setSort] = useState("desc");
    const [filterItem, setFilterItem] = useState("");
    const [selectedGeofence, setSelectedGeofence] = useState([])
    const handleReset = () => {
        formik.resetForm()
    }

    //submit data
    const [submitData, {isLoading: isSubmitLoading, error}] = useUpdateGroupMutation()

    const schema = yup.object().shape({
        groupName: yup.string().required("لطفا نام گروه را انتخاب کنید"),
        geoFenceIds: yup.array().min(1, "حداقل یک ژئوفنس برای این گروه انتخاب کنید").required("حداقل یک ژئوفنس برای این گروه انتخاب کنید")
    });

    const handleChangeChecked = (event, geo) => {
        if (event.target.checked) {
            const id = geo.id;
            let updateList = [...formik.values.geoFenceIds, id];
            formik.setFieldValue("geoFenceIds",updateList)
        } else {
            let temp = formik.values.geoFenceIds.filter((item) => item !== geo.id);
            formik.setFieldValue("geoFenceIds",temp)
        }
    };

    const handleSearchBox = (e) => {
        setSearchValue(e.target.value);
        let params = new URLSearchParams();
        params.set("name", e.target.value);
        setFilterItem(params.toString());
    };

    const handlePagination = (event, value) => {
        setPage(value);
    };

    const {
        data: geofenceData = [],
        isLoading: isDataLoading,
        isError: isDataError,
    } = useGetAllGeofenceQuery({page, sort, filterItem},
        {refetchOnMountOrArgChange: true});


    const formik = useFormik({

        initialValues: {
            id:"",
            groupName: "",
            description: "",
            geoFenceIds:[],
        },

        validationSchema: schema,

        onSubmit: async (geofence, helpers) => {
            let updateGeofence = ConvertToNull(geofence)
            const userData = await submitData(updateGeofence)
            handleReset()
            props.handleCloseEditInfo()
        },
    });

    useEffect(()=>{
        const editInfoObj = ConvertToEmpty(props.editInfoTarget)
        formik.setValues({
            id:editInfoObj.id,
            groupName: editInfoObj.groupName,
            description: editInfoObj.description,
        })
        let updateList = []
        for(let geo of editInfoObj.geoFenceIds){
            const id = geo.id;
            updateList.push(id)
        }
        formik.setFieldValue("geoFenceIds",updateList)

    },[props.openEditInfo])

    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openEditInfo}
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
                            <button onClick={() => {
                                props.handleCloseEditInfo();
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
                            <h3 className="text-[1.1rem]">ویرایش گروه</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-4">
                                <div>
                                    <TextField
                                        size="small"
                                        multiline
                                        rows={1}
                                        maxRows={4}
                                        fullWidth
                                        placeholder="نام"
                                        type="text"
                                        name="groupName"
                                        value={formik.values.groupName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                                        helperText={formik.touched.groupName && formik.errors.groupName}
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
                                <div className="p-5 border border border-1 border-[#D9D9D9]">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-full ">
                                            <FormControl fullWidth>
                                                <OutlinedInput
                                                    value={searchValue}
                                                    onChange={handleSearchBox}
                                                    className=""
                                                    size="small"
                                                    sx={{
                                                        py: "0.1rem",
                                                        borderRadius: 0,
                                                    }}
                                                    placeholder="جستوجو..."
                                                    id="outlined-adornment-amount"
                                                    inputProps={{
                                                        style: {
                                                            fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189",
                                                            fontSize: "0.9rem",
                                                        },
                                                    }}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                                    stroke="#9F9F9F"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <div>
                                            <ul>
                                                {
                                                    isDataLoading ? (
                                                        [...Array(5)].map(() => (
                                                            <li className="py-2 border-b border-1 border-[#D9D9D9] flex justify-between items-center text-[0.9rem] text-[#797979]">
                                                                <div className="flex gap-3 items-center">
                                                                    <div>
                                                                        <Skeleton
                                                                            variant="rounded"
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                    </div>
                                                                    <div className="w-16">
                                                                        <Skeleton
                                                                            variant="text"
                                                                            sx={{fontSize: "1rem"}}/>
                                                                    </div>
                                                                </div>
                                                                <div className="flex item-center">
                                                                    <div
                                                                        className="rounded-full hover:bg-neutral-100 p-2">
                                                                        <Skeleton
                                                                            variant="rounded"
                                                                            width={18}
                                                                            height={18}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="rounded-full hover:bg-neutral-100 p-2">
                                                                        <Skeleton
                                                                            variant="rounded"
                                                                            width={18}
                                                                            height={18}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="rounded-full hover:bg-neutral-100 p-2">
                                                                        <Skeleton
                                                                            variant="rounded"
                                                                            width={18}
                                                                            height={18}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        geofenceData?.content?.map((geofence) => (
                                                            <li className="py-2 border-b border-1 border-[#D9D9D9] flex justify-between items-center text-[0.9rem] text-[#797979]">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        <Checkbox
                                                                            checked={formik.values?.geoFenceIds?.some(
                                                                                (item) => item === geofence.id
                                                                            )}
                                                                            onClick={(e) => {
                                                                                handleChangeChecked(e, geofence);
                                                                                e.stopPropagation();
                                                                            }}
                                                                            sx={{
                                                                                [`&.${checkboxClasses.checked}`]: {
                                                                                    color: '#4D51DF',
                                                                                },
                                                                            }}
                                                                            inputProps={{"aria-label": "controlled"}}/>
                                                                    </div>
                                                                    <div className="mx-1">
                                                                        {geofence.name}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    )
                                                }
                                            </ul>
                                            <div
                                                className="flex justify-center mb-5 mt-7"
                                                style={{direction: "rtl"}}>
                                                <Pagination
                                                    page={page}
                                                    count={geofenceData.totalPages}
                                                    onChange={handlePagination}
                                                    shape="rounded"/>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                Boolean(formik.errors.geoFenceIds) && (
                                                    <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.geoFenceIds}
                                                </span>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {
                                        isSubmitLoading ? (<button disabled type="submit"
                                                                   className="hidden flex  items-center justify-center w-full rounded-[0.5rem] py-2  border border-solid border-1 border-neutral-400 font-bold text-textGray bg-neutral-200">
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
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainPurple text-white">ثبت
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