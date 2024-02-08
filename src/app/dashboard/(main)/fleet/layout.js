"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const pages = useSelector((state) => state.access.pages);

  // if (pages.hasOwnProperty("Employees")) {
  return <>{children}</>;
  // } else {
  //   redirect('/panel');
  // }
}
