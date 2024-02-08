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
import CircularProgress from '@mui/material/CircularProgress';
import "react-multi-date-picker/styles/colors/red.css"
import {useLazyGetAllSubOrganizationQuery,} from "@/redux/features/category/CategorySlice";
import {useSavePurchaseRequestMutation} from "@/redux/features/purchase-request/PurchaseRequestSlice";
import { PersianToEnglish } from "@/helper/PersianToEnglish";
import osm from "../../../../helper/osm-providers";
import L from "leaflet";
import {TileLayer, FeatureGroup, MapContainer} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
delete L.Icon.Default.prototype._getIconUrl;
import "leaflet-draw/dist/leaflet.draw.css";
import {useSaveGeofenceMutation} from "@/redux/features/geofence/GeofenceSlice";
import {ConvertToNull} from "@/helper/ConvertToNull";
import {useRef} from "react";

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});


export default function AddDataDialog(props) {
    const [center, setCenter] = useState([29.120738496597934,55.33779332882627]);

    let edit = useRef();

    const ZOOM_LEVEL = 14;

    let lastAddedPolygonID = null;
    let layerType = null;

    const removeAllEditControlLayers = () => {
        let layerContainer = edit.current,
             layers = layerContainer._layers,
             layer_ids = Object.keys(layers),
             layer;
        layer_ids.forEach(id => {
            layer = layers[id]
            layerContainer.removeLayer(layer);
        })
        lastAddedPolygonID = null;
        layer_ids = null
    }

    const convertPolygon = (arr) =>{
        let newArr = []
        for(let location of arr[0]){
            let obj = {}
            obj = {
                latitude:(Math.round(location.lat * 1000000) / 1000000),
                longitude:(Math.round(location.lng * 1000000) / 1000000)
            }
            newArr.push(obj)
        }
        return newArr
    }


    const onCreated = (e) => {
        if(lastAddedPolygonID !== null){
            if(e.sourceTarget._layers[lastAddedPolygonID]){
                e.sourceTarget._layers[lastAddedPolygonID].remove();
            }
            lastAddedPolygonID = null
        }

        if (e.layerType === 'circle') {
            formik.setFieldValue("fenceType", "CIRCLE")

            let radius = e.layer.getRadius()
            formik.setFieldValue("radius", (Math.round(radius * 1000000) / 1000000))
            const location = e.layer.getLatLng()
            const locationObject = {
                latitude:(Math.round(location.lat * 1000000) / 1000000),
                longitude:(Math.round(location.lng * 1000000) / 1000000)
            }
            formik.setFieldValue("centerPoint", locationObject)
        } else {
            formik.setFieldValue("fenceType", "POLYGON")
            const polygonArr = convertPolygon(e.layer.getLatLngs())
            formik.setFieldValue("points", polygonArr)
        }
        lastAddedPolygonID = e.layer._leaflet_id;
        layerType = e.layerType;
    }

    const OnEdited = (e) => {
        const layer = e.layers._layers[lastAddedPolygonID]
        if (layerType === 'circle') {
            formik.setFieldValue("fenceType", "CIRCLE")

            let radius = layer.getRadius()
            formik.setFieldValue("radius", (Math.round(radius * 1000000) / 1000000))
            const location = layer.getLatLng()
            const locationObject = {
                latitude:(Math.round(location.lat * 1000000) / 1000000),
                longitude:(Math.round(location.lng * 1000000) / 1000000)
            }
            formik.setFieldValue("centerPoint", locationObject)
        } else {
            formik.setFieldValue("fenceType", "POLYGON")
            const polygonArr = convertPolygon(layer.getLatLngs())
            formik.setFieldValue("points", polygonArr)
        }
    }

    const onDelete = (e) => {
        lastAddedPolygonID = null;
        layerType = null;
        formik.setFieldValue("fenceType", "")
        formik.setFieldValue("radius", "")
        formik.setFieldValue("centerPoint", "")
        formik.setFieldValue("points", "")
    }

    //subOrganization input
    const [subOrganization,setSubOrganization] = useState(null)
    const [openSubOrganizationList,setOpenSubOrganizationList] = useState(false)
    const [getSubOrganizationList,{ data : subOrganizationList  = [] , isLoading : isSubOrganizationLoading, isError: isSubOrganizationError }] = useLazyGetAllSubOrganizationQuery()
    useEffect(()=>{
        if(openSubOrganizationList){
            getSubOrganizationList()
        }
    },[openSubOrganizationList])

    const handleReset = () =>{
        removeAllEditControlLayers()
        lastAddedPolygonID = null;
        layerType = null;
        formik.resetForm()
        setSubOrganization(null)
    }

    //submit data
    const [submitData, { isLoading:isSubmitLoading ,error}] = useSaveGeofenceMutation()

    const schema = yup.object().shape({
        name: yup.string().required("لطفا نام ناحیه جغرافیایی را وارد کنید"),
        subOrganizationId: yup.string().required("لطفا نام ناحیه جغرافیایی را وارد کنید"),
        fenceType:yup.string().required("لطفا  ناحیه جغرافیایی مورد نظر  را انتخاب کنید"),
        speed:yup.string().required("لطفا حداكثر سرعت مجاز در اين ناحيه را وارد كنيد"),
        stopTimeInMinutes:yup.string().required("لطفا حداكثر زمان توقف در اين ناحيه را وارد كنيد"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            subOrganizationId: "",
            subOrganizationName:"",
            speed:"",
            stopTimeInMinutes:"",
            fenceType: "",
            description: "",
            centerPoint: "",
            radius:"",
            points:"",
        },

        validationSchema: schema,

        onSubmit: async (geofence,helpers) => {
            let updateGeofence = ConvertToNull(geofence)
            const userData = await submitData(updateGeofence)
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
                            <h3 className="text-[1.1rem]">ثبت ناحیه جغرافیایی</h3>
                        </div>
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-4">
                                <div>
                                    <TextField
                                        multiline
                                        rows={1}
                                        maxRows={4}
                                        fullWidth
                                        placeholder="نام"
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
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
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="حداكثر سرعت مجاز (km/h)"
                                        type="number"
                                        name="speed"
                                        value={formik.values.speed}
                                        onChange={formik.handleChange}
                                        error={formik.touched.speed && Boolean(formik.errors.speed)}
                                        helperText={formik.touched.speed && formik.errors.speed}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="حداكثر زمان توقف (دقيقه)"
                                        type="number"
                                        name="stopTimeInMinutes"
                                        value={formik.values.stopTimeInMinutes}
                                        onChange={formik.handleChange}
                                        error={formik.touched.stopTimeInMinutes && Boolean(formik.errors.stopTimeInMinutes)}
                                        helperText={formik.touched.stopTimeInMinutes && formik.errors.stopTimeInMinutes}
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
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
                                        inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                        InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div className="geofence-map" >
                                    <MapContainer center={center} zoom={ZOOM_LEVEL} >
                                        <FeatureGroup ref={edit}>
                                            <EditControl
                                                position="topright"
                                                onCreated={onCreated}
                                                onEdited={(e)=>{OnEdited(e)}}
                                                onDeleted={onDelete}
                                                draw={
                                                    {
                                                         rectangle: false,
                                                         //circle: false,
                                                         circlemarker: false,
                                                         marker: false,
                                                         polyline: false,
                                                    }
                                                }/>
                                        </FeatureGroup>
                                        <TileLayer
                                            url={osm.maptiler.url}
                                            attribution={osm.maptiler.attribution}/>
                                    </MapContainer>
                                    <div>
                                        {
                                            Boolean(formik.errors.fenceType) && (
                                                <span className="mx-3 text-[0.6rem] text-red-600 ">
                                                    {formik.errors.fenceType}
                                                </span>)
                                        }
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