'use client'
import React from "react"
import "../styles/globals.css";
import "../styles/main.css";
import {store} from '../redux/store'
import {Provider} from 'react-redux'
import localFont from 'next/font/local'
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
const fonts = localFont({
    src: [
        {
            path: '../fonts/IRANYekanLight.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../fonts/IRANYekanRegular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/IRANYekanMedium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/IRANYekanBold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../fonts/IRANYekanExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../fonts/IRANYekanBlack.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
})

export default function RootLayout({children}) {
    return (
        <html lang="en" className={fonts.className}>
        <head>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/mainIcons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="198x198"
                href="/mainIcons/icons198.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/mainIcons/icons32.png"
            />
            <link rel="manifest" href={"/manifest.json"} />
            <meta name={"theme-color"} content={"#ffffff"}/>
        </head>
        <body>
        <Provider store={store}>
            {children}
            <ToastContainer />
        </Provider>
        </body>
        </html>
    );
}
