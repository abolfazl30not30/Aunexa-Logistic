import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";


export default function Navbar(){
    const pathname = usePathname();
    return(

        <>
            <div className="flex gap-3">
                <div>
                    <Link
                        href="/dashboard"
                        className={pathname === "/dashboard" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M7 14.5V17.5M11.5 11.5V17.5M16 8.5V17.5M20.5 5.5V17.5" stroke={pathname === "/dashboard" ? "#CACBFF" :"#D9D9D9"}  stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            داشبورد
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/tracking"
                        className={pathname === "/dashboard/tracking" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/tracking"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.07598 7.48282L7.36402 10.5457C7.58715 10.705 7.69872 10.7847 7.81548 10.8031C7.91821 10.8192 8.02343 10.8029 8.11648 10.7565C8.22223 10.7037 8.30449 10.594 8.46901 10.3747L9.37511 9.16652C9.42164 9.10448 9.4449 9.07347 9.47224 9.04671C9.49652 9.02295 9.52315 9.00173 9.55173 8.98338C9.58392 8.9627 9.61935 8.94696 9.6902 8.91546L13.5588 7.19609C13.7192 7.12482 13.7993 7.08918 13.8598 7.03352C13.9133 6.9843 13.9554 6.924 13.9832 6.85684C14.0146 6.78091 14.0204 6.69336 14.0321 6.51826L14.3154 2.2694M13.5 13.5L16.116 14.6211C16.4195 14.7512 16.5713 14.8163 16.6517 14.9243C16.7222 15.0191 16.7569 15.1358 16.7496 15.2537C16.7413 15.3881 16.6497 15.5255 16.4665 15.8002L15.2375 17.6438C15.1507 17.774 15.1072 17.8391 15.0499 17.8863C14.9991 17.928 14.9406 17.9593 14.8777 17.9784C14.8067 18 14.7284 18 14.5719 18H12.5766C12.3693 18 12.2656 18 12.1774 17.9653C12.0995 17.9347 12.0305 17.885 11.9768 17.8208C11.916 17.7481 11.8832 17.6497 11.8177 17.453L11.1048 15.3144C11.0661 15.1983 11.0468 15.1403 11.0417 15.0814C11.0372 15.0291 11.0409 14.9764 11.0528 14.9253C11.0662 14.8677 11.0935 14.813 11.1482 14.7036L11.6897 13.6206C11.7997 13.4005 11.8547 13.2905 11.9395 13.2222C12.0141 13.162 12.1046 13.1246 12.1999 13.1143C12.3081 13.1027 12.4248 13.1416 12.6582 13.2194L13.5 13.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke={pathname === "/dashboard/tracking" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            مانیتورینگ
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/reports/new-report"
                        className={pathname === "/dashboard/reports/new-report" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/reports/new-report"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 16V21M12 16L18 21M12 16L6 21M21 3V11.2C21 12.8802 21 13.7202 20.673 14.362C20.3854 14.9265 19.9265 15.3854 19.362 15.673C18.7202 16 17.8802 16 16.2 16H7.8C6.11984 16 5.27976 16 4.63803 15.673C4.07354 15.3854 3.6146 14.9265 3.32698 14.362C3 13.7202 3 12.8802 3 11.2V3M8 9V12M12 7V12M16 11V12M22 3H2" stroke={pathname === "/dashboard/reports/new-report" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            گزارش
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/geofence/geographicArea"
                        className={pathname === "/dashboard/geofence/geographicArea" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/geofence/geographicArea"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12H20M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M19.0711 19.0711L17.6569 17.6569M4 12H2M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M6.34315 6.34315L4.92893 4.92893M12 4V2M17.6569 6.34315L19.0711 4.92893M12 22V20M4.92893 19.0711L6.34315 17.6569M12 8L16 12L12 16L8 12L12 8Z" stroke={pathname === "/dashboard/geofence/geographicArea" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ژئوفنس
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/vehicles-and-equipment"
                        className={pathname === "/dashboard/vehicles-and-equipment" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/vehicles-and-equipment"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 10V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.07989 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V10M5 9H2V8M19 9H22V8M6 13.5H6.01M18 13.5H18.01M6.8 10H17.2C18.8802 10 19.7202 10 20.362 10.327C20.9265 10.6146 21.3854 11.0735 21.673 11.638C22 12.2798 22 13.1198 22 14.8V18C22 18.9319 22 19.3978 21.8478 19.7654C21.6448 20.2554 21.2554 20.6448 20.7654 20.8478C20.3978 21 19.9319 21 19 21H18.4C18.0284 21 17.8426 21 17.6871 20.9754C16.8313 20.8398 16.1602 20.1687 16.0246 19.3129C16 19.1574 16 18.9716 16 18.6C16 18.5071 16 18.4606 15.9938 18.4218C15.96 18.2078 15.7922 18.04 15.5782 18.0062C15.5394 18 15.4929 18 15.4 18H8.6C8.5071 18 8.46065 18 8.42178 18.0062C8.20784 18.04 8.04004 18.2078 8.00616 18.4218C8 18.4606 8 18.5071 8 18.6C8 18.9716 8 19.1574 7.97538 19.3129C7.83983 20.1687 7.16865 20.8398 6.31287 20.9754C6.1574 21 5.9716 21 5.6 21H5C4.06812 21 3.60218 21 3.23463 20.8478C2.74458 20.6448 2.35523 20.2554 2.15224 19.7654C2 19.3978 2 18.9319 2 18V14.8C2 13.1198 2 12.2798 2.32698 11.638C2.6146 11.0735 3.07354 10.6146 3.63803 10.327C4.27976 10 5.11984 10 6.8 10ZM6.5 13.5C6.5 13.7761 6.27614 14 6 14C5.72386 14 5.5 13.7761 5.5 13.5C5.5 13.2239 5.72386 13 6 13C6.27614 13 6.5 13.2239 6.5 13.5ZM18.5 13.5C18.5 13.7761 18.2761 14 18 14C17.7239 14 17.5 13.7761 17.5 13.5C17.5 13.2239 17.7239 13 18 13C18.2761 13 18.5 13.2239 18.5 13.5Z" stroke={pathname === "/dashboard/vehicles-and-equipment" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            وسايل نقليه
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/organization"
                        className={pathname === "/dashboard/organization" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/organization"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 10V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.07989 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V10M5 9H2V8M19 9H22V8M6 13.5H6.01M18 13.5H18.01M6.8 10H17.2C18.8802 10 19.7202 10 20.362 10.327C20.9265 10.6146 21.3854 11.0735 21.673 11.638C22 12.2798 22 13.1198 22 14.8V18C22 18.9319 22 19.3978 21.8478 19.7654C21.6448 20.2554 21.2554 20.6448 20.7654 20.8478C20.3978 21 19.9319 21 19 21H18.4C18.0284 21 17.8426 21 17.6871 20.9754C16.8313 20.8398 16.1602 20.1687 16.0246 19.3129C16 19.1574 16 18.9716 16 18.6C16 18.5071 16 18.4606 15.9938 18.4218C15.96 18.2078 15.7922 18.04 15.5782 18.0062C15.5394 18 15.4929 18 15.4 18H8.6C8.5071 18 8.46065 18 8.42178 18.0062C8.20784 18.04 8.04004 18.2078 8.00616 18.4218C8 18.4606 8 18.5071 8 18.6C8 18.9716 8 19.1574 7.97538 19.3129C7.83983 20.1687 7.16865 20.8398 6.31287 20.9754C6.1574 21 5.9716 21 5.6 21H5C4.06812 21 3.60218 21 3.23463 20.8478C2.74458 20.6448 2.35523 20.2554 2.15224 19.7654C2 19.3978 2 18.9319 2 18V14.8C2 13.1198 2 12.2798 2.32698 11.638C2.6146 11.0735 3.07354 10.6146 3.63803 10.327C4.27976 10 5.11984 10 6.8 10ZM6.5 13.5C6.5 13.7761 6.27614 14 6 14C5.72386 14 5.5 13.7761 5.5 13.5C5.5 13.2239 5.72386 13 6 13C6.27614 13 6.5 13.2239 6.5 13.5ZM18.5 13.5C18.5 13.7761 18.2761 14 18 14C17.7239 14 17.5 13.7761 17.5 13.5C17.5 13.2239 17.7239 13 18 13C18.2761 13 18.5 13.2239 18.5 13.5Z" stroke={pathname === "/dashboard/organization" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ناوگان
                        </div>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/dashboard/notification"
                        className={pathname === "/dashboard/notification" ? "block py-2 px-2 border-b border-b-2 border-b-solid  border-b-lightPurple" : "block py-2 px-2 "}>
                        <div
                            className={
                                pathname === "/dashboard/notification"
                                    ? "flex gap-1 text-lightPurple text-[0.9rem]"
                                    : "flex gap-1 text-gray50 hover:text-neutral-100 text-[0.9rem]"
                            }>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.9998 21H9.99977M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z" stroke={pathname === "/dashboard/notification" ? "#CACBFF" :"#D9D9D9"} stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            اعلان‌ها
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}