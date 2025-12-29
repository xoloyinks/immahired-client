"use client"
import Header from '@/components/headers'
import React, { useContext } from 'react'
import lang from "@/app/employer/profile/page.json"
import { LanguageData } from '@/app/context';
import Image from 'next/image';
import { FaPen } from 'react-icons/fa';
import EmployerProfileForm from '@/components/employerProfile';
import { useGetEmployerQuery } from '@/app/api/features/employer';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const jsonData: any = lang;
export default function Profile() {
    const token = Cookies.get('token');
    var tokenData;
    if(token){
      tokenData = JSON.parse(token);
    }
    const languageContext = useContext(LanguageData);
    const { data } = useGetEmployerQuery(tokenData.data.id)
    

    if (!languageContext){
        throw new Error("LanguageData context is not provided!");
    }
    const [language, setLanguage] = languageContext;
    const target = jsonData[language]

    console.log("Mine: ",tokenData)
  return (
    <section className='sm:px-banner-clamp'>
        <ToastContainer />
        <Header title={target.profile} />  
        <div className='mt-5'>
          <h3 className='text-xl'>{target.edit_profile}</h3>
          {
            data && (
              <EmployerProfileForm target={target} data={data.data} user={tokenData.data} />
            )
          }
        </div>      
    </section>
  )
}
