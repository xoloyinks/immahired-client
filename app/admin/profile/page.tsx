"use client"
import React, { useContext } from 'react'
import lang from "./page.json"
import { LanguageData } from '@/app/context';
import Header from '@/components/headers';
import ProfileForm from '@/components/candidateProfile';
import Cookies from 'js-cookie';
import AdminForm from '@/components/adminProfile';
const jsonData: any = lang;


export default function Profile() {
  const languageContext = useContext(LanguageData);

    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }

    const [language, setLanguage] = languageContext;
    const target = jsonData[language]

    const user = Cookies.get('user');
    // const talent = Cookies.get('talent');
    const token = Cookies.get('token')
    
    var userData: any;
    var talentData: any;
    var tokenId: any;
    if(user && token){
      userData = JSON.parse(user);
      // talentData = JSON.parse(talent);
      tokenId = JSON.parse(token)
    }

    console.log("token: ", tokenId)


  return (
    <section className='px-banner-clamp'>
        <Header title={target.profile} />  
        <div className='mt-5'>
          <h3 className='text-xl'>{target.edit_profile}</h3>
          <AdminForm target={target} data={userData} token={tokenId} />
        </div>      
    </section>
  )
}
