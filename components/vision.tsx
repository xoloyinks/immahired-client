import React from 'react'
import SideImage from './sideImage'
import about_2 from '@/public/images/Frame 476.png'
import Header from './headers'


export default function Vision({title, details}:any) {
  return (
    <section id='vision' className='h-fit lg:h-screen py-20 lg:flex-row flex-col gap-10 flex items-center justify-between px-banner-clamp'>
        <div className="w-full lg:w-[50%] space-y-5">
            <Header title={title} />
            <p>{details}</p>
        </div>
        <div className="">
            <SideImage src={about_2} left={false} />
        </div>
    </section>
  )
}
