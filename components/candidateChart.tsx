"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis,Tooltip, CartesianGrid } from 'recharts';
import lang from "@/app/employer/page.json"
import { LanguageData } from '@/app/context';
import useWindowSize from './window';
import Cookies from 'js-cookie';
import { useApplicationsQuery } from '@/app/api/features/candidates';

const jsonData:any = lang;
export default function Chart() {
    const { width, height } = useWindowSize();
    const languageContext = useContext(LanguageData);

    const token = Cookies.get('token');
    var userData: any;
    if(token){
      userData = JSON.parse(token);
    }

  if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
  }

  const [language, setLanguage] = languageContext;
  const target = jsonData[language]

    const [isMounted, setIsMounted] = useState(false);

    const { isLoading, data } = useApplicationsQuery(userData ? userData.token : null)


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

    const sales = [
        {name: 'Jan', uv: 0, pv: 2400, amt: 5500},
        {name: 'Feb', uv: 0, pv: 2400, amt: 3999},
        {name: 'Mar', uv: 0, pv: 2400, amt: 1000},
        {name: 'Apr', uv: 0, pv: 2400, amt: 4830},
        {name: 'May', uv: 0, pv: 2400, amt: 2400},
        {name: 'Jun', uv: 0, pv: 2400, amt: 4500},
        {name: 'Jul', uv: 0, pv: 2400, amt: 7300},
        {name: 'Aug', uv: 0, pv: 2400, amt: 2344},
        {name: 'Sep', uv: 0, pv: 2400, amt: 6445},
        {name: 'Oct', uv: 0, pv: 2400, amt: 9090},
        {name: 'Nov', uv: 0, pv: 2400, amt: 6899},
        {name: 'Dec', uv: 0, pv: 2400, amt: 1234},
    ];

    // Count applications by month
    const applicationCounts = new Array(12).fill(0);

    data && data.data.forEach((app: any) => {
      const date = new Date(app.createdAt);
      const month = date.getUTCMonth(); // Get month (0 - 11)
      applicationCounts[month]++;
    });

    // Update the sales array to set uv directly
    sales.forEach((sale, index) => {
      sale.uv = applicationCounts[index];
    });

  
    const CustomTooltip: any = ({ active, payload, label}: {active: any, payload: any, label: string}) => {
        if (active && payload && payload.length) {
          return (
            <div className="px-5 py-3 text-white bg-black rounded-lg custom-tooltip">
              <p className="font-semibold label">{`${label}`}</p>
              <p className="text-sm text-center desc">{`${payload[0].value}`} Job(s) applied</p>
            </div>
          );
        }
        return null;
    }

    return (
        <div className='mt-5'>
            <AreaChart
                      width={width && width >= 1024 ? 700 : width && width >= 820 ? 600 : width && width >= 600 ? 500 : 350 }
                      // height={200}
                      height={width && width >= 640 ? 300 : 200}
                      data={sales}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <YAxis fontSize={10}  className='font-semibold sora' />
                      <Area type="bump" dataKey="uv" stroke="#8884d8" fillOpacity={0.5} fill="#8884d8"  strokeWidth={3}  />
                      <XAxis dataKey="name" fontSize={10} color='white' className='font-semibold text-white' />
                      {/* <CartesianGrid strokeDasharray="1 1" color='black' /> */}
                      <Tooltip content={<CustomTooltip />}/>
                    </AreaChart>
        </div>
    )
}
