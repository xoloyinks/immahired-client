"use client"
import { LanguageData } from '@/app/context';
import Header from '@/components/headers';
import React, { useContext, useState } from 'react';
import langy from '@/app/(auth)/page.json'
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Footer from '@/components/footer';
import Navbar from '@/components/nav';
import { useForgotPasswordMutation } from '@/app/api/general';
import { PiSpinner } from 'react-icons/pi';

const lang: any = langy;

export default function Forgot() {
    const languageContext = useContext(LanguageData);
    const [ submitData, { isLoading, isSuccess, isError, error } ] = useForgotPasswordMutation<any>();
    const [ inView, setInView ] = useState(false)
    const [ email, setEmail] = useState('')
    if (!languageContext) {
        throw new Error("LanguageData context is not provided!");
    }
    const [language, setLanguage] = languageContext;
    const target: any = lang[language]

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = {
            email: email.toLocaleLowerCase()
        }
        try{
            const res = await submitData(data).unwrap();
            if(await res){
                setInView(true);
            }
        }catch(err){
            console.error(err);
        }
    }

  return (
    <>  
        <Navbar isScrolled = {true} />
        <section className='h-[100svh] w-screen flex items-center justify-center'>
            {
                isSuccess && inView && (
                    <div className='fixed w-screen h-screen bg-black/50 flex items-center justify-center'>
                        <div className='py-5 px-10 bg-white shadow-xl shadow-gray-600 rounded space-y-5 w-[80%] sm:w-1/4 text-center'>
                            <h2 className='text-[1rem] font-semibold text-black'>Check your email to reset your Password!</h2>
                            <button onClick={() => setInView(false)} className='px-5 py-2 bg-main text-white rounded'>Got it!</button>
                        </div>
                    </div>
                )
            }

          
            <div className='w-[80%] sm:w-1/3 space-y-5'>
                {/* <Header title={target.login_header} /> */}
                <h2 className='text-[2rem] font-semibold'>Forgot Password</h2>
                <div>
                    {
                        isError && (
                            <div className='p-3 mb-2 text-xs rounded text-white bg-red-500'>
                                <h2 className='font-semibold'>{error && error?.data?.message}</h2>
                            </div>
                        )
                    }
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' required placeholder={target.email} className='w-full p-2 rounded-md border-2 border-main' />

                    <div className='pt-5'>
                        <button disabled={isLoading} onClick={handleSubmit} className='w-full flex justify-center text-center p-2 bg-main rounded-md text-white'>
                            {isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : target.new_pass}
                        </button>
                    </div>


                    <Link href='/login' className='text-xs pt-5 flex font-semibold items-center gap-3'>
                        <FaArrowLeftLong />{target.back}
                    </Link>
                </div>
                </div>
        </section>
        <Footer />
    </>
  )
}
