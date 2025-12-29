"use client"
import React, { useContext, useEffect, useState } from 'react'
import lang from "@/app/(auth)/page.json"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from '@/components/headers';
import { LanguageData } from '@/app/context';
import PasswordInput from '@/components/password';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { FaRegUser, FaToolbox } from 'react-icons/fa';
import Navbar from '@/components/nav';
import Footer from '@/components/footer';
import PhoneInput from 'react-phone-number-input'
import { PiSpinner } from "react-icons/pi";
import 'react-phone-number-input/style.css'
import { useCreateAccountMutation } from '@/app/api/features/candidates';
import { useCreateEmployerAccountMutation } from '@/app/api/features/employer';
import Link from 'next/link';
import RegistrationSuccess from '@/components/registrationSuccess';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const jsonData: any = lang;

const validateEmail: any = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export default function Register() {
    const [phoneValue, setValue] = useState<any>('')
    const [empPhoneValue, setEmpValue] = useState<any>('')
    const languageContext = useContext(LanguageData);
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const route = useRouter();

    const [submitData, {isLoading, error, isSuccess, isError}] = useCreateAccountMutation<any>();

    const [submitEmployerData, {isLoading: empLoading, error: empError, isSuccess: empSuccess, isError: empIsError}] = useCreateEmployerAccountMutation<any>()

    if (!languageContext) {
        throw new Error("LanguageData context is not provided!");
    }

const [language, setLanguage] = languageContext;
  const target: any = jsonData[language]


//   Data control for candidate
  const [canData, setCanData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    type: 'admin'
  });
  const [password, setPassword] = useState('');
  const [emailValidity, setEmailValidity] = useState(false)
  const [terms, setTerms] = useState(false)
  const [notTerms, setNotTerms] = useState(false)
  const [passLength, setPassLength] = useState(false)
  const [passwordValidity, setPasswordValidity] = useState(false)
  const [mailcheck, setMailcheck] = useState(false)

  const handleAdmin = async(e: any) => {
    e.preventDefault();
    if(validateEmail(canData.email)){
        setEmailValidity(false);
        if(password === canData.password){
            setPasswordValidity(false)
            if(canData.password.length >= 6){
                setPassLength(false)
                if(terms){
                    setNotTerms(false)
                    const data = {
                        name: canData.first_name,
                        lastName: canData.last_name,
                        email: canData.email,
                        phoneNumber: canData.phone_number,
                        type: canData.type,
                        password: canData.password
                    }

                    try{
                        const res = await submitData(data).unwrap();
                        if(await res){
                            toast('Registration Successfull!')
                            setMailcheck(true)
                        }
                    }catch(err){
                        console.error(err);
                        toast('Error occured!')
                    }
                    // console.log(canData)
                }else{
                    setNotTerms(true)
                }
            }else{
                setPassLength(true)
            }
        }else{
            setPasswordValidity(true)
        }
    }else{
        setEmailValidity(true)
    }
  }

  useEffect(() => {
    setCanData(prev => ({
        ...prev,
        phone_number: phoneValue
    }))
  }, [phoneValue])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCanData(prev => ({
      ...prev, [name]: value
    }))
  }
 
  return (
   <>
            <Navbar isScrolled = {true} />

            <section className='h-[100svh] px-5 relative w-screen flex items-center justify-center'>
                {
                    !isSuccess || empSuccess && (
                        <RegistrationSuccess target={target} />
                    )
                }
                <div className="w--[85%] md:w-1/2 lg:w-1/3 space-y-10">
                    {/* <Header title=/> */}
                    <h2 className='text-2xl sm:text-4xl font-bold'>Register Admin </h2>
                            {mailcheck && <div className='bg-main p-3 rounded text-white text-center text-sm mb-3'>
                                Registration successfull! Check Email for verification
                            </div>}
                            <form onSubmit={handleAdmin} className='space-y-5'>
                                    {isError && error.status === 409 && <div className='w-full text-xs p-2 text-center font-semibold rounded-md text-white bg-red-600'>
                                        {target.email_taken || 'Error occured! Try again'}
                                    </div>}
                                        <div className='flex justify-between gap-3'>
                                            <input onChange={handleChange} type='text' name='last_name' required placeholder={target.last_name} className='w-full p-2 rounded-md border-2 border-main' />
                                            <input onChange={handleChange} type='text' name='first_name' required placeholder={target.other_names} className='w-full p-2 rounded-md border-2 border-main' />
                                        </div>
                                        
                                    <div>
                                        <input onChange={handleChange} type='email' name='email' required placeholder={target.email} className='w-full p-2 rounded-md 
                                            border-2 border-main' />
                                            {emailValidity && <div className='w-full text-xs py-2 font-semibold rounded-md text-red-600'>
                                                {target.valid_email}
                                            </div>}
                                    </div>
                                        <div className='w-full p-2 rounded-md border-2 border-main'>
                                                            <PhoneInput
                                                                defaultCountry="CN"
                                                                placeholder={target.phone_number}
                                                                value={phoneValue}
                                                                onChange={setValue}
                                                            />
                                        </div>
                                        <div className=''>
                                            <div className='flex gap-3'>
                                                <div className='w-full relative h-5'>
                                                    <input required value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder={target.password} type={`${showPassword ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                                    <div onClick={() => setShowPassword(!showPassword)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                                        {
                                                            showPassword ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />
                                                        }
                                                                        
                                                    </div>
                                                    
                                                </div>

                                                <div className='w-full h-5 relative mb-2'>
                                                                <div className='w-full relative mb-10'>
                                                                    <input onChange={handleChange} required name='password' placeholder={target.confirm_password} type={`${showPasswordConfirm ? "text" : "password"}`} className=' p-2 rounded-md  w-full border-2 border-main absolute  z-10 pr-10' />
                                                                    <div onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
                                                                        {
                                                                            showPasswordConfirm ? <IoEyeOff  className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />

                                                                        }
                                                                        
                                                                    </div>
                                                                </div>
                                                </div>
                                            </div>

                                                {passwordValidity && <div className='w-full text-xs pt-5 font-semibold rounded-md text-red-600'>
                                                    {target.pass_match}
                                                </div>}
                                                {passLength && <div className='w-full text-xs pt-5 font-semibold rounded-md text-red-600'>
                                                    {target.pass_char}
                                                </div>}

                                        </div>

                                        <div className='text-xs pt-5'>
                                            <div className='flex items-center  gap-3'>
                                                <input type='checkbox' checked={terms} onClick={() => setTerms(!terms)} />
                                                <Link href={'/terms'} className=''>{target.conditions}</Link>
                                            </div>
                                            {
                                                notTerms && <div className='w-full text-xs pt-2 font-semibold rounded-md text-red-600'>
                                                                {target.pls_terms}
                                                            </div>
                                            }
                                        </div>

                                        <div className='pt-5'>
                                            <button className='w-full p-2 bg-main flex justify-center rounded-md text-white'>
                                                {isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : target.register}
                                            </button>
                                        </div>
                            </form>
                </div>
            </section>
            <Footer />
   </>
    )
}
