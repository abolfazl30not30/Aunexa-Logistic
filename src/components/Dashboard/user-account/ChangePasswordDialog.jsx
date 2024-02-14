'use client'
import TextField from "@mui/material/TextField";
import React, {useEffect,useRef, useState} from "react";
import {DialogContent, DialogContentText} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TailSpin} from "react-loader-spinner";
import * as yup from "yup";
import {useFormik} from "formik";
import SuccessChangingPasswordDialog from "./SuccessChangingPasswordDialog";
import OTPInput from "react-otp-input";

export default function ChangePasswordDialog(props) {

    const [openSuccessChangePassword, setOpenSuccessChangePassword] = useState(false);
  const handleOpenSuccessChangePassword = () => {
    setOpenSuccessChangePassword(true);
    
  };
  const handleCloseSuccessChangePassword = () => {
    setOpenSuccessChangePassword(false);
  };
 
  const [clickForSubmit,setClickForSubmit]=useState(false)
  const [otp, setOtp] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    part5: "",
    part6: "",
})
useEffect(() => {
    const otpString = otp.part6 + otp.part5 + otp.part4 + otp.part3 + otp.part2 + otp.part1
    formik.setFieldValue("otp", otpString)
}, [otp])

const handleOtp = (e) => {
    if (e.target.name === "part1") {
        setOtp((co) => ({...co, part1: e.target.value}))
        
    } else if (e.target.name === "part2") {
        setOtp((co) => ({...co, part2: e.target.value}))
        
    } else if (e.target.name === "part3") {
        setOtp((co) => ({...co, part3: e.target.value}))
        
    } else if (e.target.name === "part4") {
        setOtp((co) => ({...co, part4: e.target.value}))
        
    } else if (e.target.name === "part5") {
      setOtp((co) => ({...co, part5: e.target.value}))
      
    } else if (e.target.name === "part6") {
    setOtp((co) => ({...co, part6: e.target.value}))
   
   }
}
const validate = (values, props) => {
    const errors = {};

    if (clickForSubmit && !values.otp ) {
        errors.otp = 'لطفا کد ارسالی را وارد کنید';
    } 
      if ( values.otp) {
        if (otp.part1===""||otp.part2===""||otp.part3===""||otp.part4===""||otp.part5===""||otp.part6==="") {
            errors.otp = "کد ارسالی دارای 6 رقم است";
        }
    }

    return errors;
};

    const schema = yup.object().shape({
        otp:yup.string().matches(/^[0-9]+$/, "کد ارسالی فقط شامل عدد میتواند باشد"),
        password:yup.string().matches(/^[0-9]+$/, "رمز فقط شامل عدد میتواند باشد").required("این بخش الزامی است").min(8,"رمز عبور شما باید حداقل 8 رقم باشد").max(16,"رمز عبور شما باید حداکثر 16 رقم باشد"),
        repeatPassword:yup.string().matches(/^[0-9]+$/, "رمز فقط شامل عدد میتواند باشد").required("این بخش الزامی است").oneOf([yup.ref('password'), null], "رمز وارد شده با تکرار آن یکسان نمی باشد."),
    });

    const handleReset = () => {
        formik.resetForm()
        setOtp({
          part1: "",
          part2: "",
          part3: "",
          part4: "",
          part5: "",
          part6: "",
      })
        
    }
    const formik = useFormik({
        initialValues: {
            otp:"",
            password: "",
            repeatPassword:""
            
        },

        validate: validate,
        validationSchema: schema,

        onSubmit: async (password, helpers) => {
            let updatePassword = {...password}
            // const userData = await submitData(updatePassword)
            setClickForSubmit(false)
           handleReset()
           props.handleCloseChangePassword()
           handleOpenSuccessChangePassword()
            
        },
    });
    return (
        <>
            <Dialog
                fullWidth={true}
                open={props.openChangePassword}
                keepMounted
                // onClose={() => {
                //     setClickForSubmit(false)
                //     props.handleCloseChangePassword();
                //     handleReset()
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
                                
                                props.handleCloseChangePassword();
                                setClickForSubmit(false)
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
                            <h3 className="text-[1.1rem] text-[#4E4E4E]">تغییر رمز عبور</h3>
                        </div>
                        
                            
                            <form className="flex justify-center " onSubmit={formik.handleSubmit} method="POST">
                              <div className="flex flex-col justify-center w-[90%] gap-5">
                                {props.seconds !== 0 || props.minutes!== 0 ? <div className="text-center text-[#9F9F9F]">
                                  <p>یک کد 6 رقمی به *********091 ارسال شد. لطفا کد را وارد کنید.</p>
                                </div>:null}
                                
                                    <div className={"flex  justify-center items-center"}>
                                        <input  name="part6"  onChange={handleOtp} value={otp.part6} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center   border border-[#D9D9D9]"}/>

                                        <input  name="part5"  onChange={handleOtp} value={otp.part5} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center  border border-[#D9D9D9]t"}/>

                                        <input    name="part4"  onChange={handleOtp} value={otp.part4} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center  border border-[#D9D9D9]"}/>

                                        <input  name="part3"  onChange={handleOtp} value={otp.part3} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center  border border-[#D9D9D9]"}/>

                                        <input name="part2"  onChange={handleOtp} value={otp.part2} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center  border border-[#D9D9D9]"}/>

                                        <input name="part1" onChange={handleOtp} value={otp.part1} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center  border border-[#D9D9D9]"}/>
                                    </div>
                                    <div className="flex justify-center">
                                        {
                                            Boolean(formik.errors.otp) && (
                                                <span className="mx-3 text-[0.6rem]  text-red-600 ">
                                                    {formik.errors.otp}
                                                </span>
                                            )
                                        }
                                    </div>
                                
                                <div  className="flex justify-center text-[#4E4E4E] ">
                                  {props.seconds === 0 && props.minutes=== 0 ? (
                                    <button 
                                    className="flex gap-2 items-center border text-[#4D51DF] border-[#4D51DF] px-4 py-2 rounded hover:bg-[#4D51DF] hover:text-white"
                                   
                                    onClick={props.resendOTP}
                                  >
                                    <span>
                                       دریافت کد از طریق پیامک
                                    </span>
                                  </button>
                                    
                                  ) : (
                                    <p>
                                      زمان با قی مانده: {props.minutes < 10 ? `0${props.minutes}` : props.minutes}:
                                      {props.seconds < 10 ? `0${props.seconds}` : props.seconds}
                                    </p>
                                  )}
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="رمز عبور جدید"
                                        type="text"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                       inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        placeholder="تکرار رمز عبور جدید"
                                        type="text"
                                        name="repeatPassword"
                                        value={formik.values.repeatPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                       inputProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189", fontSize: "0.8rem"}}}
                                            InputLabelProps={{style: {fontFamily: "__fonts_2f4189,__fonts_Fallback_2f4189"}}}/>
                                </div>

                               
                                <div>
                                            <button type="submit" onClick={()=>setClickForSubmit(true)}  
                                                    className="w-full rounded-[0.5rem] py-3 hover:border hover:opacity-80 font-bold  bg-mainPurple text-white">ثبت
                                            </button>
                                </div>
                            </div>
                            </form>
                            
        
               
                                
                            
                            
                            
                        
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <SuccessChangingPasswordDialog
       handleCloseSuccessChangePassword={handleCloseSuccessChangePassword}
       openSuccessChangePassword={openSuccessChangePassword}/>
        </>
    )
}