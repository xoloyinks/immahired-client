"use client"
import React, { useContext, useEffect, useState } from 'react'
import lang from "@/app/employer/page.json"
import { LanguageData } from '../context';
import { FaToolbox } from "react-icons/fa";
import { LuMessagesSquare } from 'react-icons/lu';
import { FiEye } from "react-icons/fi";
import { CiBookmark } from 'react-icons/ci';
import Chart from '@/components/employerChart';
import Notifications from '@/components/notification';
import { useEmployerApplicationMutation, useGetEmployerQuery } from '../api/features/employer';
import Cookies from 'js-cookie';
import { useGetContactsQuery, useGetJobsQuery } from '../api/general';
import { PiSpinner } from 'react-icons/pi';


const jsonData: any = lang;

export default function Page() {
  const languageContext = useContext(LanguageData)
  const { data: jobsData, isLoading } = useGetJobsQuery(null)
  const { data: contactsData, isLoading: contactsLoading } = useGetContactsQuery(null);
  const [ submitId, {isLoading: appLoading} ] = useEmployerApplicationMutation();
  const [allApplications, setAllApplications] = useState(0)
  const [allApproved, setAllApproved] = useState(0)

    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }

    const [language, setLanguage] = languageContext;
    const target = jsonData[language]

    const token = Cookies.get('token');
    var tokenData;
    if(token){
      tokenData = JSON.parse(token);
    }
    const { data } = useGetEmployerQuery(tokenData.data.id)



    const dashCards =[
      {
        id: 1,
        icon: FaToolbox,
        title: target.posted_jobs,
        numbers: jobsData && jobsData.data.length,
        color: "skyblue"
      },
      {
        id: 1,
        icon: LuMessagesSquare,
        title: target.contact,
        numbers: contactsData && contactsData.data.length,
        color: "green"
      },
      {
        id: 1,
        icon: FiEye,
        title: target.applications,
        numbers: allApplications,
        color: "yellow"
      },
      {
        id: 1,
        icon: CiBookmark,
        title: target.approved,
        numbers: allApproved,
        color: "white"
      },
    ]

    useEffect(() => {
      async function getApplications() {
          let numberOfApplications = 0;
          let approvedApplications = 0;
          try {
              const promises = jobsData.data.map(async (job: any) => {
                  const res = await submitId(job.id).unwrap();
                  res.data.map((job:any) => job.approved ? approvedApplications++ : null)
                  return res ? res.data.length : 0;
              });
  
              const results = await Promise.all(promises);
              numberOfApplications = results.reduce((sum, length) => sum + length, 0);
          } catch (err) {
              console.error(err);
          } finally {
              setAllApplications(numberOfApplications);
              setAllApproved(approvedApplications)
          }
      }
  
      getApplications();
  }, [jobsData]);
    
  return (
    <section className='w-full'>
        <div className='text-xl space-y-2'>
          <div className='font-bold'>{target.welcome_back} 👋</div>
          <div className='text-sm font-semibold'>{data && data.data.companyName}</div>
        </div>
        
        <div className='mt-12 space-y-5'>
            <h1 className='text-2xl'>{target.app_stat}</h1>
            <div className='flex lg:flex-row flex-col gap-2 justify-between'>
                {
                  dashCards.map((card, index) => 
                    <div key={index} className='rounded-lg text-white shadow-md shadow-gray-400 bg-primary p-5 w-full md:w-[35%] lg:w-[24%] flex items-center justify-between'>
                        <div className={`bg-gray-600 h-fit w-fit rounded-xl p-3 text-2xl`} style={{ color: card.color}}>
                            <card.icon />
                        </div>
                        <div className="space-y-3">
                            <div style={{ color:card.color }} className='text-4xl flex justify-end'>{ isLoading || contactsLoading || appLoading ? <PiSpinner className='animate-spin text-2xl ' /> : card.numbers}</div>
                            <div>{card.title}</div>
                        </div>
                    </div>
                  )
                }


            </div>
        </div> 

        <div className='flex lg:flex-row flex-col justify-between gap-3 h- w-full mt-10 '>
          <div className='bg-abstract shadow-md shadow-gray-300 w-full sm:w-[80%] lg:w-auto rounded-xl text-white p-2 sm:p-5'>
              <h1 className='text-xl px-5'>Your Posted Jobs</h1>
             <Chart />
          </div>

          <Notifications target={target} />
        </div>
    </section>
  )
}
