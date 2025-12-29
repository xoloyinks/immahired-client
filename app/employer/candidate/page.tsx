"use client"
import Header from '@/components/headers'
import React, { useContext, useEffect, useState } from 'react'
import lang from "@/app/employer/candidate/page.json"
import pp from '@/public/images/no-image.jpg'
import { LanguageData } from '@/app/context';
import Image from 'next/image'
import { BsBookmarkCheckFill, BsChat, BsChatFill } from "react-icons/bs";
import { FaEnvelope, FaLocationPin, FaRegMessage } from 'react-icons/fa6'
import { CiBadgeDollar, CiBookmark, CiBookmarkCheck, CiLocationOn } from 'react-icons/ci'
import { GrUserWorker } from 'react-icons/gr'
import { FaBookmark, FaPhoneAlt, FaRegBookmark } from 'react-icons/fa'
import { HiMiniClipboardDocumentList } from 'react-icons/hi2'
import { GiTie } from "react-icons/gi";
import { useGetJobQuery, useGetPackageStatusQuery } from '@/app/api/general'
import Link from 'next/link'
import { useApproveApplicationMutation } from '@/app/api/features/employer'
import { PiSpinner } from 'react-icons/pi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'


const jsonData : any = lang;
export default function CandidateProfile() {
        const languageContext = useContext(LanguageData);
        const [applicant, setApplicant] = useState<any>({}) 
        const [application, setApplication] = useState<any>({}) 
        const [jobId, setJobId] = useState<any>(null)
        const [talentData, setTalentData] = useState<any>(null)
        const { data } = useGetJobQuery(jobId && jobId?.job)
        const [ submitId, {isLoading} ] = useApproveApplicationMutation();
        const [ submitData, {isLoading: loading} ] = useApproveApplicationMutation();
        const { data: statusData, isLoading: statusLoading } = useGetPackageStatusQuery(null)
        const route = useRouter();

       

        if (!languageContext){
            throw new Error("LanguageData context is not provided!");
        }
        const [language, setLanguage] = languageContext;
        const target = jsonData[language];

        useEffect(() => {
            const joby: any = localStorage.getItem('job');
            setJobId(JSON.parse(joby));

            const talent: any = localStorage.getItem('talent');
            setTalentData(JSON.parse(talent))

            const app = localStorage.getItem('profile')
            const job = localStorage.getItem('job')
            const applicationLocal = localStorage.getItem('applicant')
            if(app){
                setApplicant(JSON.parse(app));
            }
            if(applicationLocal){
                setApplication(JSON.parse(applicationLocal));
            }
    
        }, [])

        const handleApprove = async (e: any) => {
            e.preventDefault();
            try{
                const res = await submitId(application.id).unwrap();
                if(await res){
                    toast('Application approved!');
                }
                console.log(await res)
            }catch(err){
                console.error(err)
            }
        }

        const handleRejection = async (e: any) => {
            e.preventDefault();
            try{
                const res = await submitData(application.id).unwrap();
                if(await res){
                    toast('Application rejected!');
                }
            }catch(err){
                console.error(err)
            }
        }

        const goToMessage = () => {
            route.push('/employer/messages/chat');
        }

  return (
    <section className='py-2'>
        <ToastContainer />
        {/* <Header title={target.can_details} /> */}
        <h2 className='text-2xl font-semibold '>{target.application}</h2>
        
        <div className=''>
            <div className='w-full rounded-xl py-12 mt-5 text-black  space-y-8'>
                <div className='flex text-2xl flex-col w-fit gap-3 font-bold'>
                    <div className='relative w-[150px] h-[150px] rounded-full overflow-hidden shadow-md shadow-gray-600'>
                        <Image 
                            src={applicant ? applicant?.image?.url : pp}
                            alt='Candidate image'
                            fill
                            className='object-cover'
                        />
                    </div>
                    <div>{applicant?.lastName} {applicant?.name}</div>
                </div>

                <div className='flex gap-2 '>
                    <h5 className='text-gray-600 text-lg'>{target.applied_for}:</h5>
                    <h1 className='text-lg font-semibold '>{data && data.data.title}</h1>
                </div>

                <div className=' gap-2 w-fit flex '>
                    {
                        statusLoading && (
                            <div>Loading...</div>
                        )
                    }
                    { statusData?.data.canDownloadResumes && !statusLoading ? <Link href={talentData?.resume.url || ''} className='text-sm bg-main rounded text-white py-2 px-3'>{target.download_resume}</Link> : <div className='text-sm bg-red-500 rounded text-white py-2 px-3'>Resume Download limit reached!</div>}

                    {
                        statusData?.data.canChatTalents && !statusLoading ? <button onClick={goToMessage} className='p-2 flex items-center w-fit border-2 bg-main rounded text-white border-main'><FaRegMessage /></button> : <div className='text-sm bg-red-500 rounded text-white py-2 px-3'>Chat limit reached!</div>
                    }
                    
                    {/* <button className='p-2 flex items-center w-fit border-2 bg-main rounded border-main text-white font-bold'><CiBookmark /></button> */}
                </div>

                <div className='space-y-5 lg:space-y-8 text-sm lg:text-lg'>
                    <div className='w-full lg:w-[50%]'>
                        <h4 className='font-semibold'>{target.cover_letter}</h4>
                        <p className='text-sm'>{application.coverLetter}</p>
                    </div>
                    <div className='flex max-lg:gap-5 lg:flex-row flex-col '>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <FaPhoneAlt /> <span>
                            {target.phone}: <span className=' text-gray-400'> {statusData?.data.canViewTalentsContacts ? applicant?.phoneNumber : '********'}</span>
                            </span>
                        </div>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <FaEnvelope /> <span>
                            {target.email}: <span className=' text-gray-400'>{statusData?.data.canViewTalentsContacts ?  applicant.email : '********'}</span>
                            </span>
                        </div>
                        
                    </div>

                    <div className='flex max-lg:gap-5 lg:flex-row flex-col'>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <GrUserWorker /> <span>
                            {target.resposibility}: <span className=' text-gray-400'> {application.responsibilities}</span>
                            </span>
                        </div>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <HiMiniClipboardDocumentList /> <span>
                            {target.qualifications}: <span className=' text-gray-400'>{application.certifications?.flatMap((cert: any) => cert.split('-,'))}</span>
                            </span>
                        </div>
                    </div>

                    <div className='flex max-lg:gap-5 lg:flex-row flex-col'>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <GrUserWorker /><span>
                            {target.experience}: <span className=' text-gray-400'>{application?.workExperience}</span>
                            </span>
                        </div>
                        <div className='flex items-center w-full lg:w-[40%] gap-2'>
                            <GiTie /> <span>
                            {target.career_level}: <span className=' text-gray-400'>{application.careerLevel}</span>
                            </span>
                        </div>
                    </div>

                    <div className='flex max-lg:gap-5 lg:flex-row flex-col'>
                        <div className='w-full lg:w-[40%] flex items-center gap-2 h-fit'>
                            <CiBadgeDollar />
                            {target.current_salary}: <span className=' text-gray-400'>{application?.currentSalary}</span>
                        </div>
                        <div className='w-full lg:w-[40%] flex items-center gap-2 h-fit'>
                            <CiBadgeDollar />
                            {target.salary_expectation}: <span className=' text-gray-400'>{application?.salaryExpectations}</span>
                        </div>
                    </div>
                    <div className='w-full lg:w-[40%]'>
                            <h4 className='font-semibold'>{target.skills}</h4>
                            <ol className='text-sm'>
                                {application.skills?.map((datum: any, index: number) => <li key={index}>{datum}</li> )}
                            </ol>
                        </div>
                </div>

                <div className='flex gap-3 max-lg:text-sm max-lg:justify-center  text-white'>
                    <button disabled={isLoading} onClick={handleApprove} className='bg-main rounded px-5 py-2'>{ isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : target.approve}</button>
                    <button disabled={loading} onClick={handleRejection} className='bg-red-600 rounded px-5 py-2'>{loading ? <PiSpinner className='animate-spin text-2xl ' /> : target.reject}</button>
                </div>
            </div>
        </div>
    </section>
  )
}
