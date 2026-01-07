"use client"
import Footer from '@/components/footer'
import Navbar from '@/components/nav'
import React, { useContext } from 'react'
import pageLanguage from "@/app/page.json"
import { LanguageData } from '../context';
import parse from 'html-react-parser'

export default function Terms() {
    const [language, setLanguage] = useContext<any>(LanguageData);
    const jsonData: any = pageLanguage;
    const target: any = jsonData[language];

    const Title = ({number, title}: any) => {
        return(
            <div className='space-x-2 font-bold'>
                <span>{number}.</span>
                <span>{title}</span>
            </div>
        )
    }
  return (
    <>
        <Navbar isScrolled = {true} />
        <section className='w-full pt-24'>
            <div className='h-fit sm:h-[50vh] w-full sm:bg-main px-job-clamp text-main sm:text-white py-20 text-center space-y-3'>
                <h2 className='text-main sm:text-white text-3xl sm:text-6xl font-semibold'>{target.terms}</h2>
                <h2 className='text-sm sm:text-xl font-semibold text-red-800 animate-pulse'>{target.terms_warn}</h2>
            </div>
            <div className='flex justify-center'>
                <div className='w-full sm:w-[70%] bg-white sm:-translate-y-32 p-10 rounded-xl sm:shadow-md shadow-gray-300 space-y-10'>
                    {/* intro */}
                    <div className='space-y-3'>
                        <Title number={1} title={target.intro} />
                        <p className='text-sm'>
                            {parse(target.intro_p)}
                        </p>
                    </div>

                    {/* Info */}
                    <div className='space-y-3'>
                        <Title number={2} title={target.info} />
                        <p className='text-sm'>
                            {parse(target.info_p)}
                            <ul className='mt-3 list-disc list-inside space-y-3'>
                                <li className=''>{parse(target.info_p_1)}</li>
                                <li className=''>{parse(target.info_p_2)}</li>
                                <li className=''>{parse(target.info_p_3)}</li>
                            </ul>
                        </p>
                    </div>

                    {/* how */}
                    <div className='space-y-3'>
                        <Title number={3} title={target.how} />
                        <p className='text-sm'>
                            {parse(target.how_p)}
                            <ul className='mt-3 list-disc list-inside space-y-3'>
                                <li className=''>{parse(target.how_p_1)}</li>
                                <li className=''>{parse(target.how_p_2)}</li>
                                <li className=''>{parse(target.how_p_3)}</li>
                                <li className=''>{parse(target.how_p_4)}</li>
                                <li className=''>{parse(target.how_p_5)}</li>
                            </ul>
                        </p>
                    </div>

                    {/* share */}
                    <div className='space-y-3'>
                        <Title number={4} title={target.share} />
                        <p className='text-sm'>
                            {parse(target.share_p)}
                            <ul className='mt-3 list-disc list-inside space-y-3'>
                                <li className=''>{parse(target.share_p_1)}</li>
                                <li className=''>{parse(target.share_p_2)}</li>
                                <li className=''>{parse(target.share_p_3)}</li>
                            </ul>
                        </p>
                    </div>

                    {/* security */}
                    <div className='space-y-3'>
                        <Title number={5} title={target.security} />
                        <p className='text-sm'>
                            {parse(target.security_p)}
                        </p>
                    </div>

                    {/* right */}
                    <div className='space-y-3'>
                        <Title number={6} title={target.right} />
                        <p className='text-sm'>
                            {parse(target.right_p)}
                            <ul className='mt-3 list-disc list-inside space-y-3'>
                                <li className=''>{parse(target.right_p_1)}</li>
                                <li className=''>{parse(target.right_p_2)}</li>
                                <li className=''>{parse(target.right_p_3)}</li>
                                <li className=''>{parse(target.right_p_4)}</li>
                            </ul>
                        </p>
                        <p>
                            {parse(target.right_p_5)}
                            <a href="mailto:contact@immahired.cn" className='text-blue-700'>contact@immahired.cn</a>
                        </p>
                    </div>

                    {/* policy */}
                    <div className='space-y-3'>
                        <Title number={7} title={target.change} />
                        <p className='text-sm'>
                            {parse(target.change_p)}
                        </p>
                    </div>

                     {/* contact */}
                     <div className='space-y-3'>
                        <Title number={8} title={target.contact} />
                        <p className='text-sm'>
                            {parse(target.reach_p)}
                        </p>
                        <p className='flex flex-col text-sm gap-2'>
                            <span>IMMA HIRED LTD</span>
                            <span>123a Kings Road , London, England , SW3 4PL</span>
                            <a href="mailto:contact@immahired.cn" className='text-blue-700'>contact@immahired.cn</a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}
