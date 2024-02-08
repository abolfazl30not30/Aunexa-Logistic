"use client"

import React, {useState} from 'react';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {IconButton, InputAdornment} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TailSpin } from  'react-loader-spinner'
import {useLoginMutation} from "../../redux/api/loginSlice"
import axios from "axios";

export default function MainForm() {

    const schema = yup.object().shape({
        username: yup.string().required("لطفا کد پرسنلی خود را وارد کنید"),
        password: yup.string().required("لطفا رمز عبور خود را وارد کنید")
    });

    const [login, { isLoading,error }] = useLoginMutation()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const formData = {
        client_secret : "PAXWQpSsbaMyg80VKiSlPqWH3xLyUkIM",
        client_id:"client1",
        grant_type:"password",
        username:"",
        password: "",
    }

    const formik = useFormik({

        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: schema,

        onSubmit: async ({username, password}) => {
            try{
                const {data} = await axios.post('https://aunexa.net/realms/msc/protocol/openid-connect/token', {...formData,username,password}, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })

                console.log(data)
                // const userData = await login({...formData,username,password}).unwrap()
            }catch (err){
                console.log(err)
            }
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
                        ورود
                    </h3>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} method="POST">
                    <div className=" flex flex-col ">
                        <label htmlFor="name" className="text-textGray mb-4">کد پرسنلی</label>
                        <TextField
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            inputProps={{style: {fontFamily: "IranSans",fontWeight:"600",letterSpacing:"0.3rem", textAlign: 'center'}}}
                            InputLabelProps={{style: {fontFamily: "IranSans"}}}/>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="name" className="text-textGray mb-4">رمز عبور</label>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
                    <div className=''>
                        <button type="submit"
                                className="w-full  rounded-[0.5rem] py-3 border border-solid border-1 border-mainRed font-bold text-mainRed hover:bg-mainRed hover:text-white ">ورود
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
                            ورود
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <Link href="/forgot-password" className="text-[0.9rem] font-bold">فراموشی رمز عبور</Link>
                </div>
            </div>
        </>
    )
}
