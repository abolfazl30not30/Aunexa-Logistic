"use client"

import React from "react";
import { useSelector } from "react-redux";
import { redirect } from 'next/navigation';

export default function RootLayout({ children }) {
  const pages = useSelector((state) => state.access.pages);

  
    return <>{children}</>;

}
