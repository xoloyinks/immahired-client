"use client"
import React, { useContext } from 'react'
import lang from "./page.json"
import { LanguageData } from '@/app/context';
import Shorlisted from '@/components/shorlisted';
import { FaSearch } from 'react-icons/fa';

const jsonData: any = lang;

export default function Alerts() {

    const languageContext = useContext(LanguageData);

    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }

    const [language, setLanguage] = languageContext;
    const target = jsonData[language]

  return (
    <section className='px-16'>
        <div className='space-y-3'>
            <h1 className='text-4xl '>{target.welcome}</h1>
            <h2 className='text-2xl'>Liisdom Francis</h2>
        </div>
        <div className='mt-10 w-full'>
            <h3 className='text-xl'>{target.job_alerts}</h3>
            <div className='w-full bg-primary p-8 rounded-xl mt-3 text-white space-y-8'>
                    <div className='w-[40%] rounded-xl border border-main p-2 bg-white text-black flex items-center'>
                        <input placeholder={target.search} className='w-[90%] focus:outline-none' />
                        <button className='h-full w-[10%] flex items-center p-3 rounded-md text-white justify-center bg-main'>
                            <FaSearch />
                        </button>
                    </div>

                    <div>
                        <h3 className='text-xl'>5 {target.alerts_found}</h3>
                        <div>
                            <Shorlisted target={target} />
                            <Shorlisted target={target} />
                            <Shorlisted target={target} />
                            <Shorlisted target={target} />
                        </div>
                    </div>
            </div>
        </div>  
        
    </section>
  )
}
