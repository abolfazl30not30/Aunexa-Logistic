'use client'
import React from 'react'
import Image from 'next/image'
import "../../styles/login.css"
import {prefixer} from 'stylis';
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function RootLayout({ children }) {
  return (
      <>
          <div>
              {children}
          </div>
      </>
  )
}
