"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import lang from "./page.json"
import packageLang from "@/app/employer/submit-job/page.json"

import { LanguageData } from '@/app/context';
import Header from '@/components/headers';
import Input from '@/components/input';
import { IoDocumentOutline } from 'react-icons/io5';
import { useRefreshResumeMutation, useUpdateDocMutation } from '@/app/api/features/candidates';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiSpinner } from 'react-icons/pi';
import { useGetPackageStatusQuery, useGetTalentMutation, useGetUserMutation } from '@/app/api/general';
import { url } from 'inspector';
import Link from 'next/link';
import SubmitPackage from '@/components/submitPackage';

const jsonData: any = lang;
const jsonPackage: any = packageLang;

export default function Resume() {
  const languageContext = useContext(LanguageData);
  const [ submitId, {isLoading: packageLoading, data: packageData} ] = useGetUserMutation();
  const [ submitDoc, {data:doc, isLoading, isSuccess, isError, error } ] = useUpdateDocMutation<any>();
  const [ loadDocs, { isLoading: docLoading, isSuccess: docSuccess, data } ] = useGetTalentMutation();
  const { data: statusData, isLoading: statusLoading } = useGetPackageStatusQuery(null)
  const [ submitToken ] = useRefreshResumeMutation();

  const cookieToken = Cookies.get('token');
  var tokenData: any;
  if(cookieToken){
    tokenData = JSON.parse(cookieToken);
  }
  
  if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
  }

  const [language, setLanguage] = languageContext;
  const target = jsonData[language]
  const packLang = jsonPackage[language];
  const [workExp, setWorkExp] = useState('')
  const [durationValue, setDurationValue] = useState('')
  const [comDuration, setComDuration] = useState('')
  const [exp, setExp] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>()
  const [selectedCertificate, setSelecteCertificate] = useState<any>()
  const fileInputRef: any = useRef(null)
  const certificate: any = useRef(null)
  const [resumeFiles, setResumeFiles] = useState({
    name: '',
    url: '',
    cerName: '',
    cerUrl: ''
  });


  const duration = (e: any) => {
    setDurationValue(e.target.value)
  }

  useEffect(() => {
    setComDuration(workExp + ' ' + durationValue)
  }, [workExp, durationValue])

  useEffect(() => {
    async function getTalent(){
      try{
        const res = await loadDocs(tokenData.data.id).unwrap();
        console.log("Retrieved talent: ",await res)
      }catch(err){
        console.error(err)
      }
    }

    async function getUser(){
      try{
        const res = await submitId(tokenData.data.id).unwrap();
      }catch(err){
        console.error(err);
      }
    }
    getTalent();
    getUser()
  }, [])

  useEffect(() => {
      if(data){
        setResumeFiles({
          name: data.data.resume.name,
          url: data.data.resume.url,
          cerName: data.data.certificate.name,
          cerUrl: data.data.certificate.url
        });
        setExp(data.data.workExperience);

      }
  }, [data])

    const token = Cookies.get('token');
    var tokenData: any;
    if(token){
      tokenData = JSON.parse(token);
    }

    function bytesToMB(bytes: number) {
      return bytes / (1024 * 1024); // 1 MB = 1024 * 1024 bytes
    }

    const validateFile = (file: File) => {
      const allowedFileTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if(bytesToMB(file.size) > 1){
        return false
      }else{
        return allowedFileTypes.includes(file.type)
      }
    } 

    const validateCertificate = (file: File) => {
      const allowedFileTypes = [
        'image/jpeg',  // JPEG image
        'image/png',   // PNG image
        'image/webp',  // WebP image
        'image/svg+xml' // SVG image
      ];
      if(bytesToMB(file.size) > 1){
        return false
      }else{
        return allowedFileTypes.includes(file?.type)
      }

    }

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };
    const handleCertificateClick = () => {
      certificate.current.click(); // Trigger the hidden file input
    }
    const handleCertificateChange = (event: any) => {
      if(validateCertificate(event.target.files[0])){
          setSelecteCertificate(event.target.files[0])
      }else{
        toast(bytesToMB(event.target.files[0].size) > 1 ? 'File size more than 1MB' : target.not_valid);
      }
   };

    const handleFileChange = (event: any) => {
       if(validateFile(event.target.files[0])){
          setSelectedFile(event.target.files[0])
        }else{
          toast(bytesToMB(event.target.files[0].size) > 1 ? 'File size more than 1MB' : target.not_valid);
        }
    };

  const handleChange = (e: any) => {
      setWorkExp(e.value)
  }

  const handleDoc = async (e: any) => {
      e.preventDefault();
      const documents:any = new FormData();
      documents.append('workExperience', comDuration);
      documents.append('resume', selectedFile);
      documents.append('certificate', selectedCertificate)

      setExp(comDuration)

        // Log the contents of the FormData
        for (let [key, value] of documents.entries()) {
          console.log(`${key}: ${value instanceof File ? value : value}`);
        }
      try{
        const res = await submitDoc({token: tokenData.token, formData: documents}).unwrap()
        console.log(await res)
      }catch(err){
        console.error(err);
      }
  }

 if(isSuccess){
    toast(target.doc_uploaded)
 }

 const refreshResume = async () => {
    try{
      const res = await submitToken(data.data.id).unwrap();
      if(res){
        toast(res.message);
      }
    }catch(err){
      console.error(err)
    }
 }

 const [november, setNovember] = useState(false)

 const isNovember2024 = () => {
  const currentDate = new Date();
  const cutoffDate = new Date(2024, 11, 1); // December 1, 2024
  if(currentDate < cutoffDate){
    setNovember(true)
  }else{
    setNovember(false)
  }
}


 console.log("me: ",packageData)
  return (
      packageData && packageData.data.package 
      ?
      <>
        <section className='py-5'>
          <ToastContainer />
            {/* <Header title={target.edit_docs} />   */}
            <h1 className='text-2xl sm:text-3xl font-semibold'>{target.edit_docs}</h1>
                {/* <button onClick={refreshResume} disabled={statusData && !statusData.data.canRefreshResumeToTop} className={`p-3 rounded bg-main text-white text-xs mt-5 ${statusData && statusData.data.canRefreshResumeToTop ? 'bg-main' : 'bg-main/50' }`}>Refresh Resume to the top</button> */}
            <div className='mt-10 space-y-5 w-full sm:w-[70%]'>
              <div className=' rounded-lg bg-abstract p-5 space-y-5 shadow-lg shadow-gray-400'>
                <h3 className='text-xl text-white'>{target.work_exp} {' : ' + (exp ? exp : 'Not specified')}</h3>
                <div className='flex gap-3'>
                  <div className='w-1/2 sm:w-1/4'>
                    <Input label='' required onChange={handleChange} name='experience' value={workExp} type='number' />
                  </div>
                  <div className='flex'>
                    <select name="" id="" onChange={duration} className='rounded-md bg-main text-white px-2'>
                      <option value="">Select duration</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='rounded-lg bg-abstract p-5 space-y-5 text-white shadow-lg shadow-gray-400'>
                <h3 className='text-xl text-white'>{target.resume}</h3>
                {
                  selectedFile && (
                    <div className='space-y-5'>
                      <div>
                          {target.resume_att}
                      </div>
                      <div>
                        <div className='p-5 text-2xl bg-main w-fit rounded-full'>
                          <IoDocumentOutline />
                        </div>
                        <span className='text-xs'>{selectedFile.name}</span>
                      </div>
                    </div>
                  )
                }
                {
                  resumeFiles.name && resumeFiles.url && !selectedFile && (
                    <div className='space-y-5'>
                      <div>
                          {target.resume_att}
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Link href={resumeFiles.url} className='p-5 text-2xl bg-main w-fit rounded-full'>
                          <IoDocumentOutline />
                        </Link>
                        <span className='text-xs'>{resumeFiles.name}</span>
                        {/* {data && !data.data.validResume && (
                          <div className='text-xs rounded p-5 bg-yellow-600 w-fit font-semibold'>
                            <p className='mb-2 text-sm'>Warning!</p>
                            <p>This is not a valid resume. Employers might overlook it!</p>
                            <p>The uploaded file must not contain any images.</p>
                          </div>
                        )} */}
                      </div>
                    </div>
                  )
                }
                <div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange} 
                    />

                    {
                      statusData?.data.canPostResumes ? <button onClick={handleButtonClick} className='bg-main rounded-md px-5 py-2 text-xs'>{target.browse}</button> : <div className='bg-main opacity-30 text-red-300 rounded-md px-5 py-2 w-fit text-xs'>Resume upload limit reached!</div>
                    }
                </div>
                <div className='text-gray-400 text-sm'>
                  {target.warn}
                </div>
                <div>
                  {target.types}
                </div>
              </div>
              <div className='rounded-lg bg-abstract p-5 space-y-5 text-white shadow-lg shadow-gray-400'>
                <h3 className='text-xl text-white'>{target.education}</h3>
                {
                    isError  && (
                      <div className='w-fit px-10 rounded py-3 bg-red-600 text-white text-center text-xs'>
                        {error?.data.message}
                    </div>
                    )
                }
                {
                  selectedCertificate && (
                    <div className='space-y-5'>
                      <div>
                          {target.certificate_att} (Mba, PhD, or Masters)
                      </div>
                      <div className='bg-white p-3 rounded text-xs text-black w-fit font-semibold'>
                          Note: Please ensure that the uploaded image is of high resolution.
                      </div>
                      <div>
                        <div className='p-5 text-2xl bg-main w-fit rounded-full'>
                          <IoDocumentOutline />
                        </div>
                        <span className='text-xs'>{selectedCertificate.name}</span>
                      </div>
                    </div>
                  )
                }
                {
                  resumeFiles.cerName && resumeFiles.cerUrl && !selectedCertificate && (
                    <div className='space-y-5'>
                      <div>
                          {target.certificate_att} (Mba, PhD, or Masters)
                      </div>
                      <div className='bg-white p-3 rounded text-xs text-black w-fit font-semibold'>
                          Note: Please ensure that the uploaded image is of high resolution.
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Link href={resumeFiles.cerUrl} className='p-5 text-2xl bg-main w-fit rounded-full'>
                          <IoDocumentOutline />
                        </Link>
                        <span className='text-xs'>{resumeFiles.cerName}</span>
                        {data && !data.data.validCertificate && (
                          <div className='text-xs rounded p-5 bg-yellow-600 w-fit font-semibold'>
                            <p className='mb-2 text-sm'>Warning!</p>
                            <p>This is not a valid certificate. Employers might overlook it!</p>
                            <p>The uploaded file must not contain any images.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                }
                <div>
                    <input 
                        type="file" 
                        ref={certificate} 
                        style={{ display: 'none' }} 
                        onChange={handleCertificateChange} 
                    />
                    {
                      statusData?.data.canPostResumes ? <button onClick={handleCertificateClick} className='bg-main rounded-md px-5 py-2 text-xs'>{target.browse}</button> : <div className='bg-main opacity-30 text-red-300 rounded-md px-5 py-2 w-fit text-xs'>Upload limit reached!</div>
                    }
                  
                </div>
                <div className='text-gray-400 text-sm'>
                  {target.warn}
                </div>
                <div>
                  {target.typesCer}
                </div>
              </div>

              <div>
                <button disabled={isLoading} onClick={handleDoc} className='px-10 py-2 rounded-lg text-white bg-main'>
                    { isLoading ? <PiSpinner className='animate-spin text-2xl ' /> : target.save_changes}
                </button>
              </div>
            </div>
            
        </section>
      </>
      : <SubmitPackage target={packLang} />
  )
}
