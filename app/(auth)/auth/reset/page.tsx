"use client"
import { useResetPasswordMutation } from '@/app/api/general';
import Footer from '@/components/footer';
import Navbar from '@/components/nav';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { PiSpinner } from 'react-icons/pi';
import { toast, ToastContainer } from 'react-toastify';

const Reset = () => {
    const search = useSearchParams();
    const token = search?.get('token');
    const [showPassword, setShowPassword] = useState(false)
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setCofirmPassword] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [ submitData, { data, isLoading, isSuccess } ] = useResetPasswordMutation();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if(newPassword === confirmPassword){
        if(confirmPassword.length < 6){
          toast('Password should be atleast 6 characters!');
        }else{
            const data = {
              token: token,
              password: confirmPassword
            }
            console.log(data)
            try{
                const res = await submitData(data).unwrap();
                console.log(await res)
            }catch(err){
              console.error(err)
            }
        }
      }else{
        toast('Passwords must match!');
      }
      
    }

  return (
    <>
      <Navbar isScrolled={true} />
      <ToastContainer />
        <section className='w-screen h-screen flex items-center justify-center'>
            { isSuccess && (<div className='w-screen h-screen fixed bg-black/50 flex items-center justify-center z-50'>
                <div className='sm:w-1/3 w-full bg-white shadow-xl shadow-gray-600 space-y-5 text-center p-5 rounded'>
                    <h2 className='text-[1.5rem] font-semibold mb-5'>Password reset successfull!</h2>
                    <Link href={'/login'} className='px-5 py-2 text-sm bg-main mt-5 text-white rounded'>
                      Login
                    </Link>
                </div>
            </div>)
            }
            <div className='sm:w-1/3 w-full p-5'>
                <h2 className='text-[1.5rem] font-semibold'>Reset Password</h2>
                <div className='gap-5 flex flex-col mt-5'>
                    <div className='w-full relative h-5'>
                                <input required value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} placeholder={'New Password'} type={`${showPassword ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                <div onClick={() => setShowPassword(!showPassword)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                    {
                                        showPassword ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                    }
                                                    
                                </div>
                                
                            </div>
                            <div className='w-full h-5 relative mb-2 mt-5'>
                                            <div className='w-full relative mb-10'>
                                                <input value={confirmPassword} onChange={(e: any) => setCofirmPassword(e.target.value)} required name='password' placeholder={'Confirm Password'} type={`${showPasswordConfirm ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                                <div onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                                    {
                                                        showPasswordConfirm ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                                    }
                                                    
                                                </div>
                                            </div>
                            </div>

                            <button onClick={handleSubmit} className='px-5 flex justify-center py-2 rounded bg-main text-white mt-5'>
                                {isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : 'Save'}
                            </button>
                </div>
            </div>
        </section>
      <Footer />
    </>
  )
}

const ResetPassword = () => {
  return (
      <Suspense fallback={<p>Loading...</p>}>
          <Reset />
      </Suspense>
  );
};


export default ResetPassword;