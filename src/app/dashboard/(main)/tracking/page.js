"use client";
import React from "react";
import TrackingPc from "@/components/Dashboard/tracking/TrackingPc";
import TrackingMobile from "@/components/Dashboard/tracking/TrackingMobile";
import NewReportPc from "@/components/Dashboard/reports/new-report/NewReportPc";
import NewReportMobile from "@/components/Dashboard/reports/new-report/NewReportMobile";

export default function page() {

    return (
        <>
            <div className="hidden md:block">
                <TrackingPc />
            </div>
            <div className="block md:hidden">
                <TrackingMobile />
            </div>
        </>
    );
}
