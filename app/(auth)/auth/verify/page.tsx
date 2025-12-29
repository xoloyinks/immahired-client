"use client"
import { useGetVerifyMailMutation } from '@/app/api/general';
import Footer from '@/components/footer'
import Navbar from '@/components/nav'
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function Verify() {
    const search = useSearchParams();
    const token = search?.get('token');
    const [submitData, {data, isLoading, isError, error}] = useGetVerifyMailMutation<any>();
    const route = useRouter()

    useEffect(() => {
        const verifyMail = async () => {
            const verifyToken = {
                token
            }
            console.log(verifyToken)
            const res = await submitData(verifyToken).unwrap()
            if(res){
                route.push('/login')
            }
        }
        verifyMail()
    }, [])

  return (
    <>
        <Navbar isScrolled = {true} />  
            <section className='w-screen h-screen flex items-center justify-center'>
                <div className='bg-white sm:w-[30%] w-[80%] shadow-md shadow-gray-300 p-5 rounded'>
                    <h2 className='text-xl font-semibold'>Email verification</h2>

                    {
                        data && (
                            <div className='mt-2 items-center flex gap-2'>
                                <FaCheck className='text-2xl' /> Email Verified!
                            </div>
                        )
                    }

                    {
                        isError && (
                            <div>
                                {error?.data.message}
                            </div>
                        )
                    }

                    {
                        isLoading && (
                            <div>
                                Verifing ...
                            </div>
                        )
                    }
                </div>
            </section>
        <Footer />
    </>
  )
}

const VerifyMail = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Verify />
        </Suspense>
    );
  };

  
  export default VerifyMail;
