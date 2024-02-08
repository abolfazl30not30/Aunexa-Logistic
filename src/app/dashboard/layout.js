'use client'
import React from 'react'
import {useSelector} from "react-redux";
import {StompSessionProvider} from "react-stomp-hooks";

export default function RootLayout({children}) {

    return (
        <>
            <StompSessionProvider url={`https://socket.aunexa.net/ws-endpoint`}>
                {children}
            </StompSessionProvider>
        </>
    )
}
