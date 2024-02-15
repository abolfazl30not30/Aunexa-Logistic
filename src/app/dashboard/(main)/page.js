
import React from "react";
import {MovementStatus} from "@/components/Dashboard/mainDashbaord/MovementStatus";
import {OnlineStatus} from "@/components/Dashboard/mainDashbaord/OnlineStatus";
import {DisplacedVolume} from "@/components/Dashboard/mainDashbaord/DisplacedVolume";
import {Mileage} from "@/components/Dashboard/mainDashbaord/Mileage";

export default function Dashboard() {
    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <div className="w-3/4 flex flex-col gap-10">
                    <div className="flex gap-16 w-full">
                            <DisplacedVolume/>
                            <MovementStatus/>
                            <OnlineStatus/>
                    </div>
                    <div>
                        <Mileage/>
                    </div>
                </div>
            </div>
        </>
    )
}
