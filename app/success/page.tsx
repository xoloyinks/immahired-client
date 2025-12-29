"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/nav'
import React, { useContext } from 'react'
import { FaCheck, FaCircleCheck } from 'react-icons/fa6'
import pageLanguage from "@/app/page.json"
import { LanguageData } from '../context'
import Link from 'next/link'


export default function Success() {
    const languageContext = useContext(LanguageData);

    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }
    const jsonData: any = pageLanguage;


    const [language, setLanguage] = languageContext;
  const target: any = jsonData[language]
  return (
    <>
        <Navbar isScrolled = {true} />
        <section className='px-24 flex items-center justify-center h-screen'>
            <div className='w-1/2 rounded-lg bg-main/50 py-16 gap-4 flex flex-col items-center shadow-md shadow-gray-500'>
                    <FaCircleCheck className='text-6xl' />
                    <div className='text-2xl font-semibold'>{target.payment_success}</div>
                    <Link href={'/'} className='px-10 bg-main py-2 rounded text-white text-sm'>
                        {target.go_home}
                    </Link>
            </div>
        </section>
        <Footer />
    </>
  )
}
