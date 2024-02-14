"use client";
import React from "react";
import TrackingPc from "@/components/Dashboard/tracking/TrackingPc";
import TrackingMobile from "@/components/Dashboard/tracking/TrackingMobile";

export default function page() {

    return (
        <>
            {window.innerWidth >= 724 ? <TrackingPc /> : <TrackingMobile />}
        </>
    );
}
