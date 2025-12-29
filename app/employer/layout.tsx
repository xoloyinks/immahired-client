"use client"
import BackHome from '@/components/backHome';
import EmployerNav from '@/components/employerNav';
import React, { useContext, useEffect, useState } from 'react'
import { UserData } from '../tokenContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "@/public/images/logo.png"
import { FaTimes } from 'react-icons/fa';
import { RiMenuFold4Line } from 'react-icons/ri';
import Language from '@/components/language';


export default function EmployerLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const [active, setActive] = useContext(UserData);
  const route = useRouter();
  const [inView, setInview] = useState(false);
  const toggleView = () => {
      setInview(prev => !prev)
  }
  useEffect(() => {
    if (active === undefined) {
      return; 
    }
    if(active === false){
        route.push('/');
    }
  }, [active]);

    return (
        <section className={`h-screen overflow-hidden flex w-full` }>
          <EmployerNav inView={inView} onClose={() => setInview(false)} />
          <section className='w-[100vw] xl:w-[80vw] px-5 sm:px-10 py-5 h-screen overflow-y-scroll'>
              <button onClick={toggleView} className='xl:hidden  bg-white text-3xl absolute right-8 border shadow-md p-3 rounded-md z-50 '>
                  {inView ? <FaTimes /> : <RiMenuFold4Line />}
              </button>
              <div onClick={() => route.push('/')} className='relative cursor-pointer  flex mb-5 w-[250px] h-[80px] items-center text-logo font-bold'>
                    <Image 
                        src={logo}
                        alt='logo'
                        fill
                        className=' object-cover'
                    />
              </div>
              <div className='absolute right-10 top-10 max-sm:hidden'>
                <Language />
              </div>
              {active === null || active === false ? 'Offline! Please sign in' : children}
              <div className='flex flex-col gap-3 items-center justify-center mt-10'>
                <span className='sm:hidden max-sm:block'><Language /></span>
                <BackHome />
            </div>
          </section>
        </section>
    )
  }
  