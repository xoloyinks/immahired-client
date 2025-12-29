"use client"
import { JobData, LanguageData } from '@/app/context';
import Navbar from '@/components/nav'
import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { FaArrowRotateLeft, FaBox } from 'react-icons/fa6'
import pageLanguage from './page.json'
import Footer from '@/components/footer';
import { CiBookmark } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import moment from 'moment'
import { PiSpinner } from 'react-icons/pi';
import { useGetPackageStatusQuery, useGetTalentMutation, useSaveJobMutation, useUnsaveJobMutation } from '@/app/api/general';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBookmark, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { IoMdArrowRoundBack } from 'react-icons/io';
import parse from 'html-react-parser';
import pp from '@/public/images/no-image.jpg'
import ppp from '@/public/images/difference-between-firm-and-company3.png'


export default function JobDetails() {
  const languageContext = useContext(LanguageData);
  const [jobDetails, setJobDetails] = useContext(JobData);
  const { data: statusData, isLoading: statusLoading } = useGetPackageStatusQuery(null)
    const [ submitId, {isLoading, data:repData} ] = useSaveJobMutation();
    const [ submitJobId, { data: resData, isLoading: meloading } ] = useUnsaveJobMutation();
    const [ submitToken, { data: canData } ] = useGetTalentMutation();
    const [savePressed, setSavePressed] = useState(true)
    const [unsavePressed, setunSavePressed] = useState(true)
    const [companyImage, setCompanyImage] = useState<any>(null)
    const [empData, setEmpData] = useState<any>(null);
    const [talentData, setTalentData] = useState<any>(null);
    const [me, setMe] = useState<any>(null)
    



  const [loading, setLoading] = useState(false)
  const route = useRouter()

  useEffect(() => {
    if(!jobDetails){
      route.push('/jobs')
    }

    // Only access localStorage on the client side
    const emp = localStorage.getItem('employer');
    if (emp) {
      setCompanyImage(JSON.parse(emp).data.logo.url || ppp)
      setEmpData(JSON.parse(emp));
    }

    const talent = Cookies.get('talent');
    if (talent) {
      setTalentData(JSON.parse(talent));
    }
  }, [])

  if (!languageContext) {
    throw new Error("LanguageData context is not provided!");
  }
  const jsonData: any = pageLanguage;
  
  const [language, setLanguage] = languageContext;
  const target = jsonData[language]

  

  
  // Function to check if a job is saved
  const isJobSaved = (savedJobs:any, jobId: any) => {
    return savedJobs?.some((job:any) => job.id === jobId);
  };

  // Check for a specific job ID
  const jobSaved = isJobSaved(talentData?.savedJobs, jobDetails?.id);

  console.log(jobDetails)


  const handleApply = () => {
    if(statusData?.data.canApplyToJobs){
      setLoading(true);
      route.push('/apply')
    }else{
      toast('Job application limit reached!')
    }
    
  }

  useEffect(() => {
    const talent = Cookies.get('user');
    var talentData: any;
    if(talent){
        talentData = JSON.parse(talent);
        if(talentData){
          setMe(talentData)
        }
    }
    async function getTalent(){
        if(talentData){
            try{
                const res = await submitToken(talentData.data.id).unwrap()
                
            }catch(err){
                console.error(err)
            }
        }
    }
    getTalent()
  }, [])

  const handleBookmark = async (id: string) => {
    setSavePressed(!savePressed)
    try{
        const res = await submitId(id).unwrap();
        if(await res){
            toast('Job Bookmarked!')
        }
    }catch(err){
        console.log(err)
    }
}

const handleUnBookmark = async (id: string) => {
    setunSavePressed(!unsavePressed)
    try{
        const res = await submitJobId(id).unwrap();
        console.log("delete: ",await res)
        if(await res){
            toast('Job Removed from bookmarks!')
        }
    }catch(err){
        console.log(err)
    }
}

const description = jobDetails?.description
    .trim()
    .split('\n') // Split by new lines
    .map((item: any) => item.trim()) // Trim each item
    .filter((item: any) => item.length > 0); // Filter out empty 
    
    const skills = jobDetails?.requirements
    .trim()
    .split('\n') // Split by new lines
    .map((item: any) => item.trim()) // Trim each item
    .filter((item: any) => item.length > 0); // Filter out empty items

    const responsibility = jobDetails?.instructions
    .trim()
    .split('\n') // Split by new lines
    .map((item: any) => item.trim()) // Trim each item
    .filter((item: any) => item.length > 0); // Filter out empty items

    const handleAbout = (e: any) => {
        e.preventDefault();
        setAboutCompany(true)

    }

    function formatTextWithLineBreaks(text: any) {
      if(text){
        return text.replace(/(\r\n|\n|\r)/g, "<br />");
      }else{
        return;
      }
    }

    const [ aboutCompany, setAboutCompany ] = useState(false)
    

    const CompanyDetails = () => {
      return(
        <div className='w-screen h-screen bg-black/70 fixed items-center justify-center flex z-50 top-0 left-0'>

            <div className='w-[90%] sm:w-[60%] bg-gradient-to-br from-white to-gray-200 relative p-5 rounded shadow-md shadow-black max-h-[80vh] overflow-y-scroll'>
              <button onClick={() => setAboutCompany(false)} className='text-red-500 text-xl absolute top-5 right-5'>
                <FaTimes />
              </button>
                <div className='space-y-5'>
                  <div className='flex items-center gap-3 max-sm:justify-between mt-3'>
                      <span className='p-4 rounded-full border-2 border-gray-300 text-xl bg-green-500 text-white w-20 h-20 relative overflow-hidden  shadow-md shadow-gray-300'>
                        {
                          companyImage && (
                            <Image 
                                src={companyImage}
                                fill
                                alt='Company Image'
                                className='object-cover'
                            />
                          )
                        }
                        {
                          !companyImage && (
                            <FaBox />
                          )
                        }
                      </span>
                    <span className='text-sm sm:text-[2rem] font-extrabold'>{empData?.data.companyName}</span>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold'>Company Overview:</span>
                        <span className='text-sm'>{empData?.data.overview}</span>
                    </div>

                    { empData.data.shortVideo.url && 
                    <div className='flex flex-col gap-3'>
                        <span className='text-sm relative h-[200px] sm:h-[300px] flex items-center justify-center shadow-md shadow-gray-400 rounded-xl  overflow-hidden  bg-gray-200 w-full sm:w-[60%]'>
                                
                                    <video 
                                        src={empData.data.shortVideo.url}
                                        controls
                                        className="absolute inset-0 object-cover w-full h-full"
                                    ></video>
                        </span>
                    </div>
                    }
                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold'>Company Information:</span>
                        <span className='text-sm'>{empData?.data.contactInformation && parse(formatTextWithLineBreaks(empData?.data.contactInformation))}</span>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <span className='font-semibold'>Equal Opportunity Statement:</span>
                        <span className='text-sm'>{empData?.data.equalOpportunityStatement}</span>
                    </div>
                </div>
            </div>
        </div>
      )
    }

    console.log("companyImage:", companyImage)


  return (
    <>
      <Navbar isScrolled = {true} />
      <ToastContainer />
      <section className='px-banner-clamp py-32 space-y-10'>
         {aboutCompany && <CompanyDetails />}
          <div>
            <button onClick={() => window.history.back()} className='flex items-center gap-2 font-semibold'><IoMdArrowRoundBack /> Back</button>
            <div className='flex items-center gap-3 max-sm:justify-between mt-3'>
            <span className='text-2xl sm:text-5xl font-extrabold'>{empData?.data.companyName}</span>
              <span className='p-4 rounded-full text-xl bg-green-500 text-white w-20 h-20 relative overflow-hidden  shadow-md shadow-gray-300'>
                {
                  companyImage && (
                    <Image 
                        src={companyImage !== undefined ? companyImage : pp }
                        fill
                        alt='Company Image'
                        className='object-cover'
                    />
                  )
                }
                {
                  !companyImage && (
                    <FaBox />
                  )
                }
              </span>
            </div>
          </div>
          <button onClick={handleAbout} className='bg-main text-white w-fit px-4 py-2 rounded shadow-sm shadow-black text-sm'>
              About Company
          </button>


          <div className='rounded-2xl shadow-md shadow-gray-400 p-5 sm:p-16 bg-abstract text-white '>
              <h1 className='text-3xl font-semibold flex items-center gap-2'>
                <span>{jobDetails?.title}</span>
                <span  className='bg-main/50 text-white w-fit px-4 py-2 rounded-tr-xl rounded-bl-xl shadow-sm shadow-black text-sm'> {jobDetails?.employmentType}</span>
              </h1>
              <div className='mt-10 max-sm:text-xs flex gap-12 flex-wrap'>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Date Posted</span>
                          <span className='text-gray-500'>{moment.utc(jobDetails?.createdAt).format("MMMM DD, YYYY")}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Location</span>
                          <span className='text-gray-500 max-w-[160px]'>{jobDetails?.location}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Offered salary</span>
                          <span className='text-gray-500'>{jobDetails?.salaryRange}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Expiration Date</span>
                          <span className='text-gray-500'>{moment(jobDetails?.deadline).format("MMMM DD, YYYY")}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Career level</span>
                          <span className='text-gray-500'>{jobDetails?.preferredQualification}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Qualification</span>
                          <span className='text-gray-500'>{jobDetails?.requiredQualification}</span>
                      </div>
                  </div>
                  <div className='flex items-center gap-2'>
                      <div className='text-gray-300'><FaBox /></div>
                      <div className='flex flex-col text-md'>
                          <span>Experience</span>
                          <span className='text-gray-500'>{jobDetails?.benefits}</span>
                      </div>
                  </div>
              </div>
          </div>

          <div> 
            <h1 className='text-xl sm:text-3xl font-semibold'>{target.job_description}</h1>
            <p className='w-full sm:w-1/2 mt-3'>
            <ol className='space-y-3'>
                {description && description.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ol>
            </p>
          </div>

          <div> 
            <h1 className='text-xl sm:text-3xl font-semibold'>{target.key_responsibilities}</h1>
            <p className='w-full sm:w-1/2 mt-3'>
            <ol className='space-y-3'>
                {responsibility && responsibility.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ol>
            </p>
          </div>

          <div> 
            <h1 className='text-xl sm:text-3xl font-semibold'>{target.skill}</h1>
            <p className='w-full sm:w-1/2 mt-3'>
            <ol className='space-y-3'>
                {skills && skills.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ol>
            </p>
          </div>

          <div className='flex gap-3'>
            <button disabled={loading || !me?.data.approved } onClick={handleApply} className='bg-main max-sm:text-sm sm:py-3 rounded-xl flex justify-center items-center text-white w-[90%]'>
                {loading ?  <PiSpinner className='animate-spin text-2xl ' /> : !me?.data.approved  ? 'Cannot apply till approved by admin' : target.apply_now}
            </button>
            <button className='rounded-full text-2xl bg-main/20 text-main p-4 border-main/25 border-2'>
                {
                    canData && canData.data.savedJobs.includes(jobDetails.id) ?  <FaBookmark onClick={() => handleUnBookmark(jobDetails.id)} className='text-blue-400 text-lg' /> : isLoading ? '...' : <CiBookmark onClick={() => handleBookmark(jobDetails.id)} />
                }
            </button>
          </div>
      </section>
      <Footer />

    </>
  )
}
