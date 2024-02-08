"use client"

import React, {useState} from 'react';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {IconButton, InputAdornment} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { TailSpin } from  'react-loader-spinner'

export default function SuccessfulPage() {

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
                    <h3 className="font-extrabold text-xl md:text-2xl">
                        رمز عبور شما با موفقیت تغییر کرد.
                    </h3>
                </div>
                <div>
                    <Link href="/"
                            className="block text-center w-full rounded-[0.5rem] py-3 bg-mainRed text-white font-bold text-mainRed hover:opacity-80 ">ورود
                    </Link>
                </div>
            </div>
        </>
    )
}
