import Image from 'next/image'
import React from 'react'

export default function SideImage({ left, src }: { left:boolean, src:any}) {
  return (
    <div className={`relative w-[200px] h-[300px] sm:w-[350px] sm:h-[480px]`}>
        <div className={`absolute  w-[200px] h-[300px] sm:w-[350px] sm:h-[480px] bg-abstract rounded-2xl ${left ? 'sm:-translate-x-8 -translate-x-4 -top-4 sm:-top-8' : 'sm:translate-x-5 translate-x-3 -top-4 sm:-top-8'}`}></div>
        <div className={`absolute`}>
            <div className={`w-[200px] h-[300px] sm:w-[350px] sm:h-[480px] relative rounded-2xl overflow-hidden `}>
                <Image 
                    fill
                    src={src}
                    alt='Side Image'
                    className='object-cover'
                />
            </div>
        </div>
    </div>
  )
}
