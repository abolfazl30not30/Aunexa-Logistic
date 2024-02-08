'use client'
import React from 'react'
import Image from 'next/image'
import "../../styles/login.css"
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({ children }) {
  return (
      <>
          <div className="flex overflow-hidden">
              <div className="banerBackground hidden md:flex md:w-[40%] lg:w-[30%] h-screen flex-col items-center justify-center">
                  <div>
                      <Image src="/MSC.svg" alt="costumer" width={0}
                             height={0}
                             sizes="100vw"
                             style={{width: '100%', height: 'auto'}}/>
                  </div>
              </div>
              <div className="w-[100%] md:w-[60%] lg:w-[70%] flex flex-col justify-center items-center h-screen">
                  <CacheProvider value={cacheRtl}>
                    {children}
                  </CacheProvider>
              </div>
          </div>
      </>
  )
}
