"use client"
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Doughnut, Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
};

const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

export const data = {
    labels,
    datasets: [
        {
            label: 'بیل مکانیکی',
            data: [300,511,260,145,123,561,782,1000,236,474,236,145],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'کامیون های گهر ترابر',
            data: [142,587,260,369,123,254,782,100,236,169,540,145],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export function Mileage() {
    return(
        <div className="bg-white shadow rounded p-5 w-full">
            <div className="text-center mb-5">
                <h3 className="text-[1rem]">کیلومتراژ</h3>
            </div>
            <div className="w-full">
                <Line options={options} data={data} />;
            </div>
        </div>
    )
}
