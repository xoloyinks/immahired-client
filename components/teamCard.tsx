import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function TeamCard({src, name, position}: { src: StaticImageData, name: string, position: string }) {
  return (
    <section className='w-full min-w-[350px] sm:w-[45%] lg:w-[40%] flex flex-col gap-3 items-center text-xs rounded-xl h-fit shadow-xl shadow-gray-300  py-5 bg-basic'>
        <div className='w-[170px] h-[180px] relative mb-1 bg-gray-400 rounded-full overflow-hidden shadow-lg shadow-gray-500'>
                <Image 
                    fill
                    alt='Team Boss'
                    src={src}
                    className='object-fill'
                />
        </div>
        <div className='space-y-2 text-lg text-center'>
            <p className='text-xl font-semibold'>
                <span>{name}</span>
            </p>
            <p className='text-sm font-extrabold'>
                <span>{position}</span>
            </p>
        </div>
    </section>
  )
}
