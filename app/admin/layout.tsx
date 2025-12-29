"use client"
import React, { useContext, useEffect, useState } from 'react'
import Nav from '@/components/adminNav';
import BackHome from '@/components/backHome';
import { UserData } from '../tokenContext';
import { useRouter } from 'next/navigation';
import { RiMenuFold4Line } from 'react-icons/ri';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import logo from "@/public/images/logo-2-removebg-preview.png"
import Language from '@/components/language';
import Cookies from 'js-cookie';



export default function AdminLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [active, setActive] = useContext(UserData);
  const [inView, setInview] = useState(false);
    const toggleView = () => {
        setInview(prev => !prev)
    }
  const route = useRouter()

  const tokenData = Cookies.get('token');
  var token: any;
  if(tokenData){
    token = JSON.parse(tokenData);
  }
 useEffect(() => {
  if (active === undefined) {
    return; 
  }
  if(active === false || !token?.data.approved ){
      route.push('/');
  }
 }, [active]);

  return (
      <section className={`h-screen overflow-hidden flex w-full` }>
        <Nav inView={inView} onClose={() => setInview(false)} />
        <section className='w-[100vw] xl:w-[80vw] px-5 sm:px-10 py-5 h-screen overflow-y-scroll '>
            <button onClick={toggleView} className='xl:hidden  bg-white text-3xl absolute right-8 border shadow-md p-3 rounded-md '>
              {inView ? <FaTimes /> : <RiMenuFold4Line />}
            </button>
            <div onClick={() => route.push('/')} className='relative cursor-pointer  flex mb-5 w-[200px] h-[60px] items-center text-logo font-bold'>
                <Image 
                    src={logo}
                    alt='logo'
                    fill
                    className=' object-cover'
                />
            </div>
            <div className='absolute right-10 top-10 max-sm:hidden z-50'>
                <Language />
              </div>
            {active === null ? 'Offline! Please sign in' : children}
            <div className='flex flex-col gap-3 items-center justify-center mt-10'>
              <span className='sm:hidden max-sm:block'><Language /></span>
              <BackHome />
            </div>
        </section>
      </section>
  )
}
