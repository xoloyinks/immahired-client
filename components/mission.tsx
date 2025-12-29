import React from 'react'
import SideImage from './sideImage'
import about_2 from '@/public/images/Frame 51.png'
import Header from './headers'
import parse from 'html-react-parser'


export default function Mission({title, details}: any) {
  return (
    <section id='mission' className='h-fit lg:h-screen flex lg:flex-row flex-col items-center justify-between bg-basic px-banner-clamp py-20'>
        <div className="">
            <SideImage src={about_2} left={true} />
        </div>
        <div className="w-full lg:w-[50%] space-y-5">
            <Header title={title}/>
            {parse(details)}
        </div>
    </section>
  )
}
