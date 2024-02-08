'use client'

import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import Checkbox from '@mui/material/Checkbox';
import { List } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
} from "@/redux/features/category/CategorySlice";
import {styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import {useSavePurchaseRequestMutation} from "@/redux/features/purchase-request/PurchaseRequestSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import osm from "../../../../helper/osm-providers";
import L from "leaflet";
import {TileLayer, FeatureGroup, MapContainer} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
delete L.Icon.Default.prototype._getIconUrl;
import "leaflet-draw/dist/leaflet.draw.css";

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

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
    const [geofenceList, setGeofenceList] = useState([]);
const handleChangeChecked = (event, geofence) => {
    if (event.target.checked) {
      const obj = { ...geofence };
      let updateList = [...geofenceList, obj];
      setGeofenceList(updateList);
    } else {
      let temp = geofenceList.filter((item) => item.id !== geofence.id);
      setGeofenceList(temp);
     
    }
   
  };
    // const [center, setCenter] = useState({ lat: 35.7219, lng: 51.3347 });
    // const ZOOM_LEVEL = 12;

    // const log = (e) => console.log(e);

    // group input
    const [group,setGroup] = useState(null)
    const [openGroupList,setOpenGroupList] = useState(false)
    const [getGroupList,{ data : groupList  = [] , isLoading : isGroupLoading, isError: groupIsError }] = useLazyGetAllProductQuery()
    useEffect(()=>{
        if(openGroupList){
            getGroupList()
        }
    },[openGroupList])

    //unit input
    // const [unit,setUnit] = useState(null)
    // const [openUnitList,setOpenUnitList] = useState(false)
    // const [getUnitList,{ data : unitList  = [] , isLoading : isUnitLoading, isError: unitIsError }] = useLazyGetAllUnitQuery()
    // useEffect(()=>{
    //     if(openUnitList){
    //         getUnitList()
    //     }
    // },[openUnitList])

    const handleReset = () =>{
        formik.resetForm()
        setGroup(null)
        // setUnit(null)
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSavePurchaseRequestMutation()

    const schema = yup.object().shape({
        groupId: yup.string().required("لطفا نام گروه را وارد کنید"),
       
    });


    const formik = useFormik({
        initialValues: {
            groupId:"",
            groupName:"",
            
        },

        validationSchema: schema,

        onSubmit: async (product,helpers) => {
            let updateProduct = {...product,...geofenceList}
            const userData = await submitData(updateProduct)
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
                            <h3 className="text-[1.1rem]">ثبت گروه</h3>
                        </div>
                        
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                            <div className=" flex flex-col">
                                    <Autocomplete
                                        open={openGroupList}
                                        onOpen={() => {
                                            setOpenGroupList(true);
                                        }}
                                        onClose={() => {
                                            setOpenGroupList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={groupList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={group}
                                        onChange={(event, newValue) => {
                                            setGroup(newValue)
                                            formik.setFieldValue("groupId", newValue?.id)
                                            formik.setFieldValue("groupName", newValue?.persianName)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.groupId && Boolean(formik.errors.groupId)}
                                                helperText={formik.touched.groupId && formik.errors.groupId}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isGroupLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                            }}
                                                placeholder="نام گروه (اجباری)"
                                            />}
                                    />
                                </div>
                                <div className="w-full  flex flex-col gap-2 border border-[#D9D9D9]">
                                <ul className="flex flex-col gap-1 pr-2">
                                                    {/* {item.geofences?.map(
                                      (geofence, index) => ( */}
                                                        <li className="flex justify-between items-center px-2 py-0.5">
                                                            <div className=" flex items-center">
                                                                <span  className=" whitespace-nowrap ">
                                                                <Checkbox/>
                                                                {/* <Checkbox
                                                                //   id={geofence.id}
                                                                //   checked={geofenceList.some(
                                                                //     (item) => item?.id === geofence.id
                                                                //   )}
                                                                //   onClick={(e) => {
                                                                //     handleChangeChecked(e, geofence);
                                                                  
                                                                //   }}
                                                                checked={false}
                                                                  style={{
                                                                    
                                                                    width: 18,
                                                                    height: 18
                                                                  }}
                                                              
                                                                        //  inputProps={{ "aria-label": "controlled" }}
                                                                /> */}
                   
                                                                </span>
                                                                <span  className=" text-sm   text-gray70 whitespace-nowrap ">
                                                                
                                                                {/* {geofence?.name} */}
                                                                  نام ژئوفنس
                                                                </span>
                                                            </div>
                                                         
                                                        </li>
                                                        {/* ))} */}
                                                      
                                                    </ul>
                                </div>
                                {/* <div>
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
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className=" flex flex-col">
                                    <Autocomplete
                                        open={openProductList}
                                        onOpen={() => {
                                            setOpenProductList(true);
                                        }}
                                        onClose={() => {
                                            setOpenProductList(false);
                                        }}
                                        fullWidth
                                        clearOnEscape
                                        disablePortal
                                        id="combo-box-demo"
                                        ListboxProps={{
                                            sx: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                        }}
                                        options={productList}
                                        getOptionLabel={(option) => option.persianName}
                                        value={product}
                                        onChange={(event, newValue) => {
                                            setProduct(newValue)
                                            formik.setFieldValue("productId", newValue?.id)
                                            formik.setFieldValue("productName", newValue?.persianName)
                                            formik.setFieldValue("productImage",newValue?.imageURL)
                                        }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={formik.touched.productId && Boolean(formik.errors.productId)}
                                                helperText={formik.touched.productId && formik.errors.productId}
                                                {...params}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"},
                                                    endAdornment:(
                                                        <React.Fragment>
                                                            {isProductLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    )
                                                }}
                                                placeholder="گروه"
                                            />}
                                    />
                                </div>
                                <div className="geofence-map">
                                    <MapContainer center={center} zoom={ZOOM_LEVEL} >
                                        <FeatureGroup>
                                            <EditControl
                                                position="topright"
                                                onCreated={log}
                                                onEdited={(e)=>{console.log(e)}}
                                                onMounted={log}
                                                draw={
                                                    {
                                                         rectangle: false,
                                                         //circle: false,
                                                         circlemarker: false,
                                                         marker: false,
                                                         polyline: false,
                                                    }
                                                }
                                            />
                                        </FeatureGroup>
                                        <TileLayer
                                            url={osm.maptiler.url}
                                            attribution={osm.maptiler.attribution}/>
                                    </MapContainer>
                                </div> */}
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