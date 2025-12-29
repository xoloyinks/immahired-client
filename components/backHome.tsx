"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import lang from "@/app/candidate/page.json"
import { LanguageData } from '@/app/context'

const jsonData: any = lang;
export default function BackHome(){

  const languageContext = useContext(LanguageData);

  if (!languageContext) {
  throw new Error("LanguageData context is not provided!");
  }

  const [language, setLanguage] = languageContext;
  const target = jsonData[language]
  return (
    <Link href={'/'} className='px-4 py-2 flex items-center bg-main/25 text-sm rounded-md w-fit text-main'>
        <span><IoArrowBackOutline /></span>
        <span>{target.back_web}</span>
    </Link>
  )
}
