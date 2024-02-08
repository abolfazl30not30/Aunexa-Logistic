"use client"

import React, {useState} from 'react';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {IconButton, InputAdornment} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TailSpin } from  'react-loader-spinner'
import OtpInput from 'react-otp-input';

export default function GetOTPCode() {

    const schema = yup.object().shape({
        username: yup.string().required("لطفا کد پرسنلی خود را وارد کنید"),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState('');

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
                        کد تایید را وارد کنید
                    </h3>
                </div>
                <div className="mt-10 mb-8">
                    <label htmlFor="name" className="text-textGray mb-4">کد تایید برای شماره 8047  ***  0937 ارسال گردید.</label>
                </div>
                <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit} method="POST">
                    <div className="flex flex-col w-full">
                        <OtpInput
                            inputStyle={{width:"4rem",height:"4rem",backgroundColor:'transparent',border:"2px solid #D9D9D9",borderRadius:"0.4rem"}}
                            containerStyle="gap-3 flex justify-center flex-row-reverse"
                            inputType="number"
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>   </span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                    <div className="mt-7">
                        <button type="submit"
                                className="w-full rounded-[0.5rem] py-3 border border-solid border-1 border-mainRed font-bold text-mainRed hover:bg-mainRed hover:text-white  ">تایید
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
                            تایید
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
