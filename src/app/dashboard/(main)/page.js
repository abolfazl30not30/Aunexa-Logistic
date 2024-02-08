import Image from "next/image";
import React from "react";

export default function Dashboard() {
    return (
        <>
            <div className="hidden md:flex py-3 px-3 w-full h-screen">
                <Image src="/mainDash.svg" alt="costumer" width={0}
                       height={0}
                       sizes="100vw"
                       style={{width: '100%', height: 'auto'}}/>
            </div>
        </>
    )
}
