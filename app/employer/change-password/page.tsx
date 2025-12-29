"use client"
import Header from '@/components/headers'
import React, { useContext, useState } from 'react'
import lang from "./page.json"
import { LanguageData } from '@/app/context';
import { IoEye, IoEyeOff } from 'react-icons/io5';


const jsonData: any = lang
export default function ChangePassword() {
    const languageContext = useContext(LanguageData);
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)


    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }

    const [language, setLanguage] = languageContext;
    const target = jsonData[language]
  return (
    <section className=''>
        <Header title={target.change_password} />
        <div className='w-[50%] mt-10'>
                        <div className='w-full relative h-5'>
                            <input placeholder={target.current} type={`${showPassword ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                            <div onClick={() => setShowPassword(!showPassword)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                {
                                    showPassword ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                }    
                            </div>
                        </div>

                        <div className='w-full h-5 relative mb-5'>
                                        <div className='w-full relative mb-10'>
                                            <input placeholder={target.new} type={`${showPasswordConfirm ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                            <div onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                                {
                                                    showPasswordConfirm ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                                }
                                                
                                            </div>
                                        </div>
                        </div>
        </div>
    </section>
  )
}
