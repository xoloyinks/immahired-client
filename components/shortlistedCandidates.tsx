"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEmployerApplicationMutation } from '@/app/api/features/employer'
import { useGetUserMutation } from '@/app/api/general'
import User from './user'
import { Target } from 'lucide-react'

export default function Shorlisted({job, target}: any) {
    const [submitId, {data, isLoading}] = useEmployerApplicationMutation();
    const route = useRouter();
    const changeRoute = () => {
        route.push('/employer/candidate')
    }

    useEffect(() => {
        async function getApplicant(){
            try{
                const res = await submitId(job.id).unwrap();
            }catch(err){
                console.error(err);
            }
        }
        getApplicant();
    }, [])

  return (
    <section>
        { data && data.data.length > 0 &&
            <div>
                <h2 className='text-sm'>{target.job_title}: {job.title}</h2>
            </div>
        }

        {
            data && data.data.length > 0 && isLoading && (
                <div>
                    Loading...
                </div>
            )
        }

        {
            data && data.data.length > 0 && data.data.map((datum: any, index: number) => {
                return(
                        datum.approved === true && (
                        <User user={datum} />
                    )
                )
            }
           )
        }

       
    </section>
  )
}
