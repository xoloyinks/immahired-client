"use client"
import { useGetJobQuery, useGetUserMutation } from '@/app/api/general'
import { JobData } from '@/app/context';
import React, { useContext, useEffect } from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import { useGetEmployerQuery } from '@/app/api/features/employer';
import Image from 'next/image';
import { PiSpinner } from 'react-icons/pi';

export default function Shorlisted({target, jobs}: any) {
  const { data, isLoading } = useGetJobQuery(jobs);
  const [jobDetails, setJobDetails ] = useContext(JobData)
  const route = useRouter()

  
  // useEffect(() => {
  //   if(data){
  //     console.log(empData)
  //   }
  // }, [empData])

  const Block = ({data}: any) => {
    const { data: empData } = useGetEmployerQuery(data && data.data.employer)
    const [ submitEmp, {data: useData, isLoading: userLoading} ] = useGetUserMutation()

    useEffect(() => {
      const getUser = async () => {
        if(empData){
          try {
              const res = await submitEmp(empData.data.user).unwrap()
              console.log(res)
          } catch (error) {
              console.error(error)
          }
        }
      }
      getUser()
    }, [empData])

    const handleDetails = () => {
      if(localStorage){
        setJobDetails(data.data);
        localStorage.setItem('compImage', useData.data.image.url)
        route.push('/jobs/job-details');
      }
  }
      return(
        <div key={empData} className='text-sm font-semibold w-full items-center flex justify-between'>
            <div className='flex gap-2 items-center'>
              <div className='p-2 sm:p-4 rounded-full w-16 h-16 flex items-center justify-center overflow-hidden bg-white text-abstract relative'>
                {
                  userLoading && (
                      <PiSpinner className='animate-spin text-2xl ' />
                    )
                }
                {
                    useData && useData.data.image.url && (
                            <Image 
                                src={useData.data.image.url}
                                fill
                                alt='Company image'
                                className='object-cover'
                            />
                    )
                }
              </div>
              <div className='flex flex-col max-sm:text-xs'>
                <span>{empData?.data.companyName ? empData?.data.companyName : 'Company Name'}</span>
                <span className='text-gray-400'>{target.position}: {data && data.data.title} {isLoading && 'Loading...'}</span>
              </div>
            </div>
            <button onClick={handleDetails} className='px-5 py-2 bg-main rounded max-sm:text-xs'>{target.view_details}</button>
        </div>
      )
  }

  return (
    <section className={`${data && data.data.title ? 'block' : 'hidden'} w-full py-5 border-b border-gray-700 items-center gap-3`}>
        <div className='flex items-center gap-3'>
          {
            data && (
              <Block data={data} />
            )
          }
        </div>
    </section>
  )
}
