"use client"
import { useGetJobQuery } from '@/app/api/general'
import React, { useEffect } from 'react'
import { FaBell, FaBox } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { useGetEmployerQuery } from '@/app/api/features/employer'
import Image from 'next/image'
import pp from '@/public/images/no-image.jpg'
export default function AppliedJob({target, id, approved}: any) {
  const { data, isLoading } = useGetJobQuery(id);

  const Block = ({data}: any) => {
    const { data: empData } = useGetEmployerQuery(data && data.data.employer)
    return(
      <div className='flex items-center gap-3 w-[80%]'>
          <div className='sm:p-4 p-2 max-sm:text-sm rounded-full bg-white text-abstract'>
              <Image
                alt='Profile Image'
                src={empData?.data?.logo?.url || pp}
                width={50}
                height={50}
                className='object-cover'
              />
          </div>
          <div className='text-xs sm:text-sm font-semibold flex flex-col'>
              <span>{empData?.data.companyName ? empData?.data.companyName : "Company Name"}</span>
              <span className='text-gray-400'>{target.position}: {isLoading ? 'Loading...' : data?.data.title}</span>
          </div>
        </div>
    )
  }
  return (
    <section className='w-full py-5 flex justify-between border-b border-gray-700 items-center gap-3'>
        { data && (<Block data={data} />)}
        <div className={`sm:text-xs max-sm:w-[20%] text-center text-[8px] sm:min-w-[93px] px-1 sm:px-3 py-1  ${approved ? 'bg-blue-400' : 'bg-yellow-500' } rounded-xl`}>
          {
              approved ? target.approved : target.under_review
          }
        </div>
    </section>
  )
}
