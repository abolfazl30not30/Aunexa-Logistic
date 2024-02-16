"use client";

import React, { useEffect, useState } from "react";
import GeographicAreaMobile from "@/components/Dashboard/geofence/geographicArea/GeographicAreaMobile";
import GeographicAreaPC from "@/components/Dashboard/geofence/geographicArea/GeographicAreaPC";


function GeographicArea() {


  return (
    <>
      <div className="hidden md:block">
        <GeographicAreaPC/>
      </div>
      <div className="block md:hidden">
        <GeographicAreaMobile/>
      </div>
    </>
  );
}

export default GeographicArea;
