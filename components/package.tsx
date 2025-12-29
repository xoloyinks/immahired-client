"use client"
import React from 'react'
import { PackageType } from './submitPackage'
import { FaCheck } from 'react-icons/fa6'
import { usePayForPackageMutation } from '@/app/api/general';
import { PiSpinner } from 'react-icons/pi';

export default function Package({ plan, target, role, packType }: { plan: any, target: any, role: string, packType: string }) {
    const emp = (role === 'employer');
    const [submitData, { isLoading, data }] = usePayForPackageMutation()

    const getStarted = async () => {
        const packageJson = {
            package: packType,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://immahired.global'}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://immahired.global'}/cancel`
        }

        try {
            const res = await submitData(packageJson).unwrap();
            window.open(await res.url, '_blank');
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <section className='px-4 py-8 rounded-xl shadow-black shadow-sm bg-main/50 sm:min-w-[350px] w-full sm:w-[32%] text-black space-y-8'>
            {plan.job_top ? <h2 className='text-2xl font-semibold'>{plan.period} {target.year}</h2> :
                <h2 className='text-2xl font-semibold'>{plan.months} {target.months}</h2>
            }
            <h1 className='text-4xl'>${plan.price}</h1>

            <div className='space-y-3 text-sm'>
                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.jobPostings : plan.resumePostings} {emp ? target.job_posting : target.resume_posting}
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.downloadResumes : plan.jobApplications} {emp ? target.download_resume : target.app}
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.automaticJobRefreshals : plan.automaticResumeRefreshals} {emp ? target.refresh_jobs : target.refresh_resume}
                    </span>
                </div>
                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? target.job_top : target.resume_top}(  {emp ? plan.refreshJobToTop : plan.refreshResumeToTop}{target.times})
                    </span>
                </div>
                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.receiveTalentApplicationAlerts : plan.dailyEmployersChatPerDay} / {target.chats}
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.jobPostingAdverstiments : plan.upgradeTalentSelfIntroductionVideo} {emp ? target.job_ad : target.intro_vid}
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? plan.viewTalentsContacts : plan.viewEmployersContacts} {emp ? target.talent : target.employer}
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <span>
                        <FaCheck />
                    </span>
                    <span>
                        {emp ? target.talent_app : target.job_app}({emp ? plan.receiveTalentApplicationAlerts : plan.receiveJobApplicationAlerts})
                    </span>
                </div>
            </div>

            <button onClick={getStarted} disabled={isLoading} className='w-full py-3 rounded-xl text-white flex justify-center bg-abstract'>
                {isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : target.get_started}
            </button>
        </section>
    )
}
