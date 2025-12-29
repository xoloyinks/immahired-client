"use client"
import Header from '@/components/headers'
import React, { useContext, useState } from 'react'
import lang from "./page.json"
import { LanguageData } from '@/app/context';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useChangPasswordMutation } from '@/app/api/general';
import { PiSpinner } from 'react-icons/pi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const jsonData: any = lang
export default function ChangePassword() {
    const [ submitPassword, { data, isLoading, isError, error } ] = useChangPasswordMutation<any>();
    const languageContext = useContext(LanguageData);
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState(false)
    const [passwords, setPasswords] = useState({
        password: '',
        newPassword: ''
    })


    if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
    }

    const [language, setLanguage] = languageContext;
    const target = jsonData[language];

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setPasswords(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePassword = async (e: any) => {
        e.preventDefault();

        const password = {
            newPassword: passwords.newPassword,
            password: passwords.password
        }
        try{
            if(passwords.newPassword.length >= 6 ){
                setPassLength(false)
                setPasswordValidity(false)
                if(passwords.newPassword !== passwords.password){
                    setPasswordValidity(false)
                    const res = await submitPassword(password).unwrap();
                    toast('Password changed!')
                }else{
                    setPasswordValidity(true)
                }
            }else{
                setPassLength(true)
            }
        }catch(err){
            console.error(err)
        }
    }


  return (
    <section className='items-center flex-col flex'>
        <ToastContainer />
        <h2 className='text-2xl font-semibold w-full sm:w-[30%] text-center'>{target.change_password}</h2>
        {
            isError && (
                <div className='bg-red-600 text-white text-xs rounded w-[30%] p-3 text-center mt-2'>
                    {error?.data?.message || 'Error occured! Try again'}
                </div>
            )
        }
        <div className='w-full sm:w-[30%] mt-5'>
                        <div className='w-full relative h-5'>
                            <input value={passwords.password} onChange={handleChange} name='password' placeholder={target.current} type={`${showPassword ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                            <div onClick={() => setShowPassword(!showPassword)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                {
                                    showPassword ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />
                                }    
                            </div>
                        </div>

                        <div className='w-full h-5 relative mb-5'>
                                        <div className='w-full relative mb-10'>
                                            <input value={passwords.newPassword} onChange={handleChange} name='newPassword' placeholder={target.new} type={`${showPasswordConfirm ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                            <div onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                                {
                                                    showPasswordConfirm ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                                }
                                                
                                            </div>
                                        </div>
                        </div>
                        {passwordValidity && <div className='w-full text-xs pt-5 font-semibold rounded-md text-red-600'>
                                {target.pass_match}
                            </div>}
                        {passLength && <div className='w-full text-xs pt-5 font-semibold rounded-md text-red-600'>
                                {target.pass_char}
                        </div>}

                        <button disabled={isLoading} onClick={handlePassword} className='bg-main w-full flex justify-center py-2 rounded px-10 text-white mt-10 '>
                            {isLoading ? <PiSpinner className='animate-spin text-2xl ' />  : target.submit}
                        </button>
        </div>
    </section>
  )
}
