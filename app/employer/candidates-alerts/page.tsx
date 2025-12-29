"use client"
import React, { useContext } from 'react'
import lang from "@/app/employer/candidates-alerts/page.json"
import { LanguageData } from '@/app/context';
import Header from '@/components/headers';
import { FaSearch } from 'react-icons/fa';
import Candidates from '@/components/candidates';
import Candidate from '@/components/candidates';

const jsonData: any = lang;
export default function Alerts(){
        const languageContext = useContext(LanguageData);
        if (!languageContext){
            throw new Error("LanguageData context is not provided!");
        }
        const [language, setLanguage] = languageContext;
        const target = jsonData[language];


  return (
    <section className='px-16'>
        <Header title={target.alerts} />
        <div className='mt-5'>
            <h3 className='text-xl font-semibold'>{target.candidate_alert}</h3>

            <div className='p-5 bg-abstract w-full rounded-lg mt-5 space-y-5'>
                <div className='flex justify-between items-center'>
                    <div className='w-[40%] rounded-lg border border-main px-2 py-1 bg-white text-black flex items-center'>
                        <input placeholder={target.search} className='w-[90%] focus:outline-none' />
                        <button className='h-full w-[10%] flex items-center rounded-xl text-main py-2 text-xl justify-center'>
                            <FaSearch />
                        </button>
                    </div>

                    <div className='text-sm'>
                        <label htmlFor="" className='text-white'>Filter by Job: </label>
                        <select name="" id="" className='bg-abstract text-white'>
                            <option value=""></option>
                            <option value="">Engineer</option>
                            <option value="">Teacher</option>
                            <option value="">Doctor</option>
                            <option value="">Scholar</option>
                        </select>
                    </div>
                </div>

                <div className='text-white space-y-5'>
                    <h3 className='text-xl text-gray-400'>{target.all_candidates}</h3>

                    <div>
                        <Candidate target={target} />
                        <Candidate target={target} />
                        <Candidate target={target} />
                        <Candidate target={target} />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
