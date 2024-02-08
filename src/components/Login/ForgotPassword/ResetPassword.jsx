"use client"

import React, {useState} from 'react';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {IconButton, InputAdornment} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TailSpin } from  'react-loader-spinner'

export default function ResetPassword() {

    const schema = yup.object().shape({
        newPassword: yup.string().required("لطفا رمز عبور جدید خود را وارد کنید"),
        newPasswordAgain: yup.string().required("لطفا تکرار رمز عبور جدید را وارد کنید")
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [showPasswordAgain, setShowPasswordAgain] = useState(false);

    const handleClickShowPasswordAgain = () => setShowPasswordAgain(!showPasswordAgain);

    const formik = useFormik({

        initialValues: {
            newPassword: "",
            newPasswordAgain: "",
        },

        validationSchema: schema,

        onSubmit: async ({newPassword, newPasswordAgain}) => {

        },
    });

    return (
        <>
            <div className="w-[80%] md:w-[50%]">
                <div className="flex justify-center md:hidden mb-20">
                    <div className="w-[40%]">
                        <Image src="/redMICLogo.svg" alt="costumer" width={0}
                               height={0}
                               sizes="100vw"
                               style={{width: '100%', height: 'auto'}}/>
                    </div>
                </div>
                <div className="mb-9">
                    <h3 className="font-extrabold text-2xl">
                        تغییر رمزعبور
                    </h3>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-textGray mb-4">رمزعبور جدید</label>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                            inputProps={{style: {fontFamily: "IranSans", textAlign: 'center',fontWeight:"600",letterSpacing:"0.3rem",paddingRight:"3.5rem"}}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}>{showPassword ? <img src="/onVisible.svg" alt="onVisible"/> : <img src="/visible.svg" alt="visiable"/>}
                                        </IconButton>
                                    </InputAdornment>)}}
                            InputLabelProps={{style: {fontFamily: "IranSans"}}}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-textGray mb-4">تکرار رمزعبور جدید</label>
                        <TextField
                            type={showPasswordAgain ? "text" : "password"}
                            name="newPasswordAgain"
                            value={formik.values.newPasswordAgain}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newPasswordAgain && Boolean(formik.errors.newPasswordAgain)}
                            helperText={formik.touched.newPasswordAgain && formik.errors.newPasswordAgain}
                            inputProps={{style: {fontFamily: "IranSans", textAlign: 'center',fontWeight:"600",letterSpacing:"0.3rem",paddingRight:"3.5rem"}}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordAgain}>{showPasswordAgain ? <img src="/onVisible.svg" alt="onVisible"/> : <img src="/visible.svg" alt="visiable"/>}
                                        </IconButton>
                                    </InputAdornment>)}}
                            InputLabelProps={{style: {fontFamily: "IranSans"}}}/>
                    </div>
                    <div>
                        <button type="submit"
                                className="w-full rounded-[0.5rem] py-3 border border-solid border-1 border-mainRed font-bold text-mainRed hover:bg-mainRed hover:text-white  ">تغییر رمز عبور
                        </button>
                        <button disabled type="submit"
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

                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <Link href="/" className="text-[0.9rem] font-bold">بازگشت به صفحه ورود</Link>
                </div>
            </div>
        </>
    )
}
