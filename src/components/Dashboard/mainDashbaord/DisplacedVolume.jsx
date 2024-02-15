'use client'
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['هیدروکربن', 'تولوئن', 'بوتادین'],
    datasets: [
        {
            label: "",
            data: [16,28,53],
            backgroundColor: [
                '#4D79E8',
                '#FFC122',
                '#FF2F93',
            ],
            borderColor: [
                '#4D79E8',
                '#FFC122',
                '#FF2F93',
            ],
            borderWidth: 1,
        },
    ],
};
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
};

export function DisplacedVolume() {
    return (
        <>
            <div className="bg-white shadow rounded p-5 h-96">
                <div className="text-center mb-5">
                    <h3 className="text-[1rem]">حجم جابجا شده ی امروز</h3>
                </div>
                <div>
                    <Image src="/volume.svg" alt="costumer" width={0}
                           height={0}
                           sizes="100vw"
                           style={{width: '100%', height: 'auto'}}/>
                </div>
            </div>
        </>
    );
}
