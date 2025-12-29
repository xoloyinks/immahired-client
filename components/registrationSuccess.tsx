"use client"
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
export default function RegistrationSuccess({target}: any) {
    const route = useRouter();
  return (
    <section className='fixed w-screen z-50 h-screen flex bg-black/80 items-center justify-center'>
        <div className='text-black bg-white px-5 py-10 rounded-md'>
            <div className='flex flex-col-reverse gap-3 items-center text-4xl font-semibold'>
                <span className='w-[80%] text-center'>{target.success}</span> 
                <span className='text-main text-6xl'><FaCheckCircle /></span>
            </div>
            <button onClick={() => route.push('/login')} className='px-5 rounded py-2 text-sm bg-main flex mx-auto mt-5 text-white'>{target.proceed_login}</button>
        </div>
    </section>
  )
}
