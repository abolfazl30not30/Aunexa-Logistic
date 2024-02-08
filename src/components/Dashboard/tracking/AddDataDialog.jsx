

'use client'

import {
    FormControl,
    InputAdornment,
    Menu,
    OutlinedInput,
  } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import {useSaveRoleMutation} from "@/redux/features/role/RoleSlice";
import ListSubheader from '@mui/material/ListSubheader';
import Checkbox from '@mui/material/Checkbox';
import {useSelector} from "react-redux";
import { useGetAllTrackingMachineListQuery } from "@/redux/features/tracking/TrackingSlice";
import List from "@mui/material/List";
import { useLazyGetAllVehicleCategoryQuery } from "@/redux/features/category/CategorySlice";
export default function AddDataDialog(props) {
    const [listOfChecked,setListOfChecked] = useState({})

    const handleReset = () => {
        formik.resetForm()
        // setBooleanList()
    }

    const [submitData, {isLoading: isSubmitLoading, error}] = useSaveRoleMutation()
    const schema = yup.object().shape({
        
    });


    const formik = useFormik({
        initialValues: {
            
        },

        validationSchema: schema,

        onSubmit: async (role) => {
            let authorities = []
            let pages = []
            for (const auth in listOfChecked){
                if(listOfChecked[auth] === true){
                    authorities.push(auth)
                    let result = auth.split("::")
                    if(!(pages.find(value => value === result[0]))){
                        pages.push(result[0])
                    }
                }
            }
            const sendObj = {
                
                authorities:authorities,
                
            }
            const res = await submitData(sendObj)
            handleReset()
            props.handleCloseAddData()
        },
    });

    const [openAccess, setOpenAccess] = React.useState(true);

    const token = useSelector((state) => state.auth.accessToken)

    const [nameOfFleet,setNameOfFleet]= useState("")
    useEffect(()=>{
        setNameOfFleet(window.sessionStorage.getItem("organizationName"))
    },[])

    const [trackingVehicleList, setTrackingVehicleList] = useState([]);
    const handleChangeCheckedVehicle = (event, vehicle) => {
        if (event.target.checked) {
          const obj = { ...vehicle };
          let updateList = [...trackingVehicleList, obj];
          setTrackingVehicleList(updateList);
        } else {
          let temp = trackingVehicleList.filter((item) => item.name !== vehicle.name);
          setTrackingVehicleList(temp);
         
        }
       
      };

    const [trackingMachineList, setTrackingMachineList] = useState([]);
    const handleChangeChecked = (event, machine) => {
        if (event.target.checked) {
          const obj = { ...machine };
          let updateList = [...trackingMachineList, obj];
          setTrackingMachineList(updateList);
        } else {
          let temp = trackingMachineList.filter((item) => item.id !== machine.id);
          setTrackingMachineList(temp);
         
        }
       
      };
      const handleChangeAllChecked = (event,item)=>{
        if(event.target.checked){
            const obj=item?.machines
            
            let updateList=trackingMachineList?.filter((machine)=>  !item.machines.find(vehicle => (vehicle.id === machine.id ) )) 
            updateList=[...updateList,...obj]
            setTrackingMachineList(updateList)
        }else{
           
            let updateList= trackingMachineList.filter((machine)=>  !item.machines.find(vehicle => (vehicle.id === machine.id ) ))  
            setTrackingMachineList(updateList)
        }
      }
    const [searchValue, setSearchValue] = useState("");
    const [filterType, setFilterType] = useState("filter");
    const [filterItem, setFilterItem] = useState(null);
    const handleSearchBox = (e) => {
      setSearchValue(e.target.value);
      let params = new URLSearchParams();
      params.set(filterType, e.target.value);
      setFilterItem(params.toString());
    };
    const {
        data: organizationList = [],
        isLoading: isDataLoading,
        isError: isDataError,
      } = useGetAllTrackingMachineListQuery({filterItem},{ refetchOnMountOrArgChange: true });
      const [type,setType]=useState("movement")

      //

     
      const [getVehicleCategoryList,{ data : vehicleCategoryList  = [] , isLoading : isVehicleCategoryLoading, isError: isVehicleCategoryError }] = useLazyGetAllVehicleCategoryQuery()
      useEffect(()=>{
          if(type==="type"){
              getVehicleCategoryList()
          }
      },[type])
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openAddData}
                keepMounted
                // onClose={() => {
                //     handleReset()
                //     props.handleCloseAddData();
                // }}
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
                                handleReset()
                                props.handleCloseAddData();
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center mb-4">
                            <h3 className="text-[1.1rem]"> انتخاب متحرک</h3>
                        </div>
                        <div className="flex items-center justify-evenly py-3">
                                    <div>
                                        <button onClick={()=>{setType("movement")}} 
                                                    className={type==="movement" ? "w-full text-sm px-4  py-2  hover:opacity-80 font-bold   text-mainRed border-b border-mainRed":"w-full text-sm px-4  py-2  hover:opacity-80 font-bold   text-[#9F9F9F] border-b border-[#9F9F9F]"}>متحرک
                                            </button>
                                    </div>
                                    <div>
                                        <button   onClick={()=>{setType("type")}} 
                                                    className={type==="type" ? "w-full text-sm px-4  py-2  hover:opacity-80 font-bold   text-mainRed border-b border-mainRed":"w-full text-sm px-4  py-2  hover:opacity-80 font-bold   text-[#9F9F9F] border-b border-[#9F9F9F]"}>نوع وسیله
                                            </button>
                                    </div>
                                </div>
                       {type==="movement" &&  <div className="flex justify-center w-full mb-5">
                            
                            <div className="w-[90%]  ">
    <FormControl fullWidth>
      <OutlinedInput
        value={searchValue}
        onChange={handleSearchBox}
        className=""
        size="small"
        sx={{
          py: "0.2rem",
          borderRadius: 0,
        }}
        placeholder="جست و جو ..."
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
                            </div>}
                        <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                            <div className="flex flex-col justify-center w-[90%] gap-5">
                                
                                
                                {  type==="movement" &&
                                    (<div className="w-full  flex flex-col gap-2 h-48 overflow-y-auto">
                                    <List
                                        sx={{
                                            bgcolor: 'background.paper',
                                            border: "1px solid #D9D9D9",
                                            borderBottom:"0px solid #FFF",
                                            paddingBottom:0,
                                            color: "#29262A"}}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            <ListSubheader sx={ {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}} component="div" id="nested-list-subheader">
                                                 ناوگان : {nameOfFleet}
                                            </ListSubheader>}>
                                        {
                                            organizationList?.map((item,page)=>(
                                            item?.machines.length>0 &&  (<div>
                                                <details className="group py-1 border-b border-b-1 border-b-solid  border-b-borderGray">
                                                    <summary className="flex items-center justify-between gap-2  font-medium marker:content-none hover:cursor-pointer px-2">
                                                    <div className="flex items-center py-1 gap-2">
                                                    <span  className="table-cell     text-gray70 whitespace-nowrap ">
                                                                
                                                                <Checkbox
                                                                  id={item?.machines[0]?.id}
                                                                  checked={item.machines?.every(
                                                                    (data) => trackingMachineList?.some((machine)=>machine.id===data.id)
                                                                  )}
                                                                  onClick={(e) => {
                                                                    handleChangeAllChecked(e, item);
                                                                  
                                                                  }}
                                                                  style={{
                                                                    
                                                                    width: 10,
                                                                    height: 10
                                                                  }}
                                                              
                                                                         inputProps={{ "aria-label": "controlled" }}
                                                                />
                   
                                                                </span>
                                                        <span className="text-textGray  text-[0.9rem] text-sm">{item?.subOrganizationName}</span>
                                                    </div>
                                                        <svg
                                                            className="transition group-open:rotate-90"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none">
                                                            <path
                                                                d="M10 4L6 8L10 12"
                                                                stroke="#9F9F9F"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                            />
                                                        </svg>
                                                    </summary>
                                                    <ul className="flex flex-col gap-1 pr-2">
                                                    {item.machines?.map(
                                      (machine, index) => (
                                                        <li className="flex gap-4 items-center px-2 py-0.5">
                                                            <div className="gap-1.5 flex items-center">
                                                                <span  className="table-cell     text-gray70 whitespace-nowrap ">
                                                                
                                                                <Checkbox
                                                                  id={machine.id}
                                                                  checked={trackingMachineList.some(
                                                                    (item) => item?.id === machine.id
                                                                  )}
                                                                  onClick={(e) => {
                                                                    handleChangeChecked(e, machine);
                                                                  
                                                                  }}
                                                                  style={{
                                                                    
                                                                    width: 10,
                                                                    height: 10
                                                                  }}
                                                              
                                                                         inputProps={{ "aria-label": "controlled" }}
                                                                />
                   
                                                                </span>
                                                                <span  className="table-cell text-sm   text-gray70 whitespace-nowrap ">
                                                                
                                                                {machine?.type}
                   
                                                                </span>
                                                            </div>
                                                            <div>
                                                                
                                                                <sppan className="text-sm">
                                                                {machine?.tag ?(machine?.tag?.slice(2, 5) +
                                                "-" +
                                                machine?.tag?.slice(5, 7) +
                                                " " +
                                                machine?.tag?.slice(7, 8) +
                                                " " +
                                                machine?.tag?.slice(0, 2)):machine?.code}
                                                                </sppan>
                                                            </div>
                                                            {/* <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                <FormControlLabel
                                                                    label={page.authorities[`${page.title}::ReadOne`]}
                                                                    control={<Checkbox checked={listOfChecked[`${page.title}::ReadOne`] || false}
                                                                                       value={`${page.title}::ReadOne`}
                                                                                       onChange={handleChangeChecked}/>}/>
                                                            </Box> */}
                                                        </li>))}
                                                        {/* <li>
                                                            <Box sx={{display: 'flex', flexDirection: 'column',fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", ml: 3}}>
                                                                <FormControlLabel
                                                                    sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                                    label={page.authorities[`${page.title}::ReadAll`]}
                                                                    control={<Checkbox checked={listOfChecked[`${page.title}::ReadAll` ] || false}
                                                                                       value={`${page.title}::ReadAll` || ''}
                                                                                       onChange={handleChangeChecked}/>}/>
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                <FormControlLabel
                                                                    sx={{fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}
                                                                    label={page.authorities[`${page.title}::Create`]}
                                                                    control={<Checkbox checked={listOfChecked[`${page.title}::Create` ]|| false}
                                                                                       value={`${page.title}::Create` || ''}
                                                                                       onChange={handleChangeChecked}/>}/>
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                <FormControlLabel
                                                                    label={page.authorities[`${page.title}::Update`]}
                                                                    control={<Checkbox checked={listOfChecked[`${page.title}::Update` ]|| false}
                                                                                       value={`${page.title}::Update` || ''}
                                                                                       onChange={handleChangeChecked}/>}/>
                                                            </Box>
                                                        </li>
                                                        <li>
                                                            <Box sx={{display: 'flex', flexDirection: 'column', ml: 3}}>
                                                                <FormControlLabel
                                                                    label={page.authorities[`${page.title}::Delete`]}
                                                                    control={<Checkbox checked={listOfChecked[`${page.title}::Delete` ] || false}
                                                                                       value={`${page.title}::Delete` || ''}
                                                                                       onChange={handleChangeChecked}/>}/>
                                                            </Box>
                                                        </li> */}
                                                    </ul>
                                                </details>
                                            </div>)
                                            ))
                                        }
                                    </List>
                                </div>)
                                }
                                {type==="type" && (<ul className="grid grid-cols-3 gap-1 pr-2 border p-3  border-[#D9D9D9] rounded-sm h-64 overflow-y-auto">
                                                    {vehicleCategoryList?.map(
                                      (vehicle, index) => (
                                                        <li className="flex justify-between items-center px-2 py-0.5">
                                                            <div className="gap-1.5 flex items-center px-4 ">
                                                                <span  className="table-cell     text-gray70 whitespace-nowrap ">
                                                                
                                                                <Checkbox
                                                                  
                                                                  checked={trackingVehicleList.some(
                                                                    (item) => item?.name === vehicle.name
                                                                  )}
                                                                  onClick={(e) => {
                                                                    handleChangeCheckedVehicle(e, vehicle);
                                                                  
                                                                  }}
                                                                  style={{
                                                                    
                                                                    width: 10,
                                                                    height: 10
                                                                  }}
                                                              
                                                                         inputProps={{ "aria-label": "controlled" }}
                                                                />
                   
                                                                </span>
                                                                <span  className="table-cell text-sm   text-gray70 whitespace-nowrap ">
                                                                
                                                                {vehicle?.name}
                   
                                                                </span>
                                                            </div>
                                                            
                                                         
                                                        </li>))}
                                                      
                                                    </ul>)}
                               
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