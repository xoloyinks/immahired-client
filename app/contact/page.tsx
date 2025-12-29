"use client"
import Navbar from '@/components/nav'
import React, { useContext, useState } from 'react'
import pageLanguage from "@/app/page.json"
import { LanguageData } from '../context';
import Footer from '@/components/footer';
import Image from 'next/image';
import cn from '@/public/images/Flag-China.webp'
import Link from 'next/link';
import { FaFacebookSquare, FaInstagram, FaTimes } from 'react-icons/fa';
import { IoLogoWechat } from 'react-icons/io5';
import wechat from "@/public/images/wechat.jpg"


export default function Contact() {
    const [language, setLanguage] = useContext<any>(LanguageData);
    const [showChat, setShowChat] = useState(false)
    const jsonData: any = pageLanguage;
    const target: any = jsonData[language];
  return (
    <>
        <Navbar isScrolled = {true} />
                <section className='py-24'>
                {
                    showChat && (
                        <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 z-50 flex justify-center items-center">
                            <div className="p-10 rounded bg-white relative">
                                <button onClick={() => setShowChat(false)} className="text-red-500 text-xl absolute right-5 top-5"><FaTimes /></button>
                                <h2 className="text-black text-xl font-semibold text-center">{target.scan}</h2>
                                <Image 
                                    alt="Wechat qr code"
                                    src={wechat}
                                    width={300}
                                    height={400}
                                    className=""
                                />
                            </div>
                        </div>
                    )
                }
            <div className='h-fit sm:h-[50vh] w-full sm:bg-main px-job-clamp text-main sm:text-white py-10 text-center space-y-3'>
                <h2 className='text-2xl sm:text-6xl font-semibold'>{target.contact}</h2>
                <p className='text-sm sm:text-xl font-semibold'>{target.contact_info}</p>
                <div className="flex justify-center gap-3 text-3xl sm:text-white/70">
                        <Link href={'https://www.facebook.com/imma.hire'} className="hover:scale-110 transition-transform transform duration-300">
                            <FaFacebookSquare />
                        </Link>
                        <Link href={'https://www.instagram.com/immahired/'} className="hover:scale-110 transition-transform transform duration-300">
                            <FaInstagram />
                        </Link>
                        <button onClick={() => setShowChat(true)} className="hover:scale-110 transition-transform transform duration-300">
                            <IoLogoWechat />
                        </button>
                    </div>
            </div>
            <div className='max-sm:px-5'>
                <div className='sm:-translate-y-24 flex gap-3 sm:flex-row flex-col justify-evenly'>
                    <div className="w-full sm:w-[30%] flex flex-col rounded p-5 space-y-3 bg-white shadow-lg shadow-gray-300">
                        <div className='relative w-[100px] h-[100px] overflow-hidden'>
                            <Image
                                fill
                                alt='China flag' 
                                src={'https://flagdownload.com/wp-content/uploads/Flag_of_Peoples_Republic_of_China.svg'}
                                className='object-contain rounded-sm'
                            />
                        </div>

                        <div className='font-bold text-main'>
                            China
                        </div>

                        <div className='space-y-3 text-sm'>
                            <p><span className='font-semibold'>Phone Number:</span> <a href="tel:+8617368713072"> +86 173 6871 3072</a></p>
                            <p>
                                <span className='font-semibold'>Email:</span> 
                                <a href="mailto:china@immahired.global" className=""> china@immahired.global</a>
                            </p>
                            <p>
                                <span className='font-semibold'>Address: </span>
                                <span>Jiangning District , Nanjing City,China</span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-[30%] border rounded p-5 bg-white space-y-3 shadow-lg shadow-gray-300">
                        <div className='relative w-[100px] h-[100px] overflow-hidden'>
                                <Image
                                    fill
                                    alt='China flag' 
                                    src={'https://flagdownload.com/wp-content/uploads/Flag_of_Armenia.svg'}
                                    className='object-contain rounded-sm'
                                />
                        </div>

                        <div className='font-bold text-main'>
                            Armenia
                        </div>

                        <div className='space-y-3 text-sm'>
                                <p>
                                    <span className='font-semibold'>Email:</span> 
                                    <a href="mailto:armenia@immahired.global" className=""> armenia@immahired.global</a>
                                </p>
                                <p>
                                    <span className='font-semibold'>Address: </span>
                                    <span>Yerevan, 25 Mashtots Avenue, 42A building, zip code: 0001, Armenia</span>
                                </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-[30%] border rounded p-5 bg-white shadow-lg shadow-gray-300 space-y-3">
                        <div className='relative w-[100px] h-[100px] overflow-hidden'>
                            <Image
                                fill
                                alt='China flag' 
                                src={'https://flagdownload.com/wp-content/uploads/Flag_of_United_Kingdom.svg'}
                                className='object-contain rounded-sm'
                            />
                        </div>

                        <div className='font-bold text-main'>
                            United Kingdom
                        </div>

                        <div className='space-y-3 text-sm'>
                            <p><span className='font-semibold'>Phone Number:</span> <a href="tel:+441213184548"> +44 121 318 4548</a></p>
                            <p>
                                <span className='font-semibold'>Email:</span> 
                                <a href="mailto:uk@immahired.global" className=""> uk@immahired.global</a>
                            </p>
                            <p>
                                <span className='font-semibold'>Address: </span>
                                <span>Suite A ,82 James Carter Road , Mildenhall, IP28 7DE</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}
