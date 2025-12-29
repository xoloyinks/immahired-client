"use client"
import Image from 'next/image'
import React from 'react'
import can from "@/public/images/Frame 660.png"
import { useRouter } from 'next/navigation'

export default function Candidate({target}: any) {
    const route = useRouter();
    const changeRoute = () => {
        route.push('/employer/candidate')
    }
  return (
    <section className='flex justify-between items-center border-b border-gray-700 py-4'>
        <div className='w-1/2 flex items-center gap-3'>
            {/* <div className='w-[60px] h-[60px] rounded-full relative overflow-hidden border-2 border-gray-400'>
                <Image 
                    src={can}
                    alt='Candidate image'
                    fill
                    className='object-cover'
                />
            </div> */}
            <div className='flex flex-col gap-1'>
                <span className='text-md font-semibold text-gray-200'>
                    Roland Michel
                </span>
                <span className='text-sm text-gray-400'>
                    {target.applied_for}: Nurse
                </span>
            </div>
        </div>
        <button onClick={changeRoute} className='px-5 py-2 rounded h-fit bg-main text-white text-sm'>{target.view_profile}</button>
    </section>
  )
}
