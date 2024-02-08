"use client"

import {generateCodeChallenge, generateCodeVerifier} from '../../helper/pkce';
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Entrance() {
    const [codeChallenge,setCodeChallenge] = useState()

    useEffect(()=>{
        const verifier = generateCodeVerifier();
        const code = generateCodeChallenge(verifier);
        setCodeChallenge(code)
    },[])

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
                        ورود به سامانه
                    </h3>
                </div>
                <div>
                <a href={`https://auth.prod.aunexa.net/oauth2/authorize?response_type=code&client_id=client1&scope=openid&redirect_uri=https://aunexa.net/redirect&code_challenge=${codeChallenge}&code_challenge_method=S256`}  className="block text-center w-full rounded-[0.5rem] py-3 bg-mainRed text-white font-bold text-mainRed hover:opacity-80 ">ورود
                    </a>
                </div>
            </div>
        </>
    )
}
