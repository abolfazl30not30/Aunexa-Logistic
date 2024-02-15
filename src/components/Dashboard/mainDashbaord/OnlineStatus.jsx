'use client'
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: [ 'آفلاین', 'آنلاین'],
    datasets: [
        {
            label: "",
            data: [20,80],
            backgroundColor: [
                '#A9B1A6',
                '#5CA443',

            ],
            borderColor: [
                '#A9B1A6',
                '#5CA443',
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

export function OnlineStatus() {
    return (
        <>
            <div className="bg-white shadow rounded p-5 h-96">
                <div className="text-center mb-3">
                    <h3 className="text-[1rem]">وضعیت اتصال</h3>
                </div>
                <Doughnut data={data} options={options} />
            </div>
        </>
    );
}
