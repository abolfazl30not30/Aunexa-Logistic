"use client"

import React, {useState} from 'react';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {IconButton, InputAdornment} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TailSpin } from  'react-loader-spinner'

export default function GetUsername() {

    const schema = yup.object().shape({
        username: yup.string().required("لطفا کد پرسنلی خود را وارد کنید"),
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({

        initialValues: {
            username: "",
        },

        validationSchema: schema,

        onSubmit: async ({username}) => {

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
                        فراموشی رمزعبور
                    </h3>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-textGray mb-4">کد پرسنلی</label>
                        <TextField
                            type="number"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            inputProps={{style: {fontFamily: "IranSans",fontWeight:"600",letterSpacing:"0.3rem", textAlign: 'center'}}}
                            InputLabelProps={{style: {fontFamily: "IranSans"}}}/>
                    </div>
                    <div>
                        <button type="submit"
                                className="w-full rounded-[0.5rem] py-3 border border-solid border-1 border-mainRed font-bold text-mainRed hover:bg-mainRed hover:text-white  ">بازنشانی رمزعبور
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
                            بازنشانی رمز عبور
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
