"use client"
import { useGetMeQuery } from '@/app/api/general'
import React from 'react'
import pp from '@/public/images/no-image.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdVerified } from 'react-icons/md';
import { toast } from 'react-toastify';


export default function EachCandidate({ candidate, search, me}: any) {
    const { data, isLoading } = useGetMeQuery(candidate?.user);
    const { category, location, keyword } = search;
    const route = useRouter()
    const handleClick = () => {
        if(localStorage){
            localStorage.setItem('viewCandidate', JSON.stringify(data));
            localStorage.setItem('candidateTalent', JSON.stringify(candidate));
            route.push('/candidates/candidate-details')
        }
    }

    const handleAdminClick = () => {
        if(localStorage){
            if(!me.data.approved){
                toast('Cannot perform action! Account not approved');
            }else{
                localStorage.setItem('candidateTalent', JSON.stringify(candidate));
                localStorage.setItem('userData', JSON.stringify(data.data));
                route.push('/admin/details')
            }
           
        }
    }
    function truncateText(text: string, maxLength: number) {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

            // Filter checks based on `category`, `location`, and `keyword`
        const matchesCategory = !category ||  data?.data.jobCategory && data?.data.jobCategory.toLowerCase().includes(category.toLowerCase());

        const matchesLocation = !location || data?.data.location && data?.data.location.toLowerCase().includes(location.toLowerCase());
        const matchesKeyword = !keyword || data?.data.name && data?.data.name.toLowerCase().includes(keyword.toLowerCase()) || data?.data.location && data?.data.location.toLowerCase().includes(keyword.toLowerCase()) || data?.data.lastName && data?.data.lastName.toLowerCase().includes(keyword.toLowerCase()) || data?.data.jobCategory && data?.data.jobCategory.toLowerCase().includes(keyword.toLowerCase());

  return (
        matchesCategory && matchesLocation && matchesKeyword && (
    <button onClick={me.data.type === 'admin' ? handleAdminClick : handleClick}  className=" bg-white transition-transform transform hover:scale-105 duration-300 max-sm:max-w-[350px] rounded-lg shadow-md p-4 flex gap-4">
                   <div className="w-16 h-16 rounded-full relative overflow-hidden text-xs bg-black">
                    <Image
                        src={data ? data.data.image.url : pp}
                        alt={data?.data.image.name || 'Candidate image'}
                        fill
                        className="object-cover"
                    />
                   </div>
                    <div className='text-left w-[80%]'>
                        <h2 className="text-blue-600 font-semibold text-sm flex items-center gap-1">
                            {data && data.data.lastName} {data && data.data.name}{data?.data.approved && <MdVerified />}
                        </h2>
                        <p className="text-gray-500 text-xs">Location: {data && data.data.location ? data.data.location : 'Not specified' }</p>
                        <p className=" font-semibold text-gray-600 text-xs mt-1">{data && data.data.jobCategory ? truncateText(data && data.data.jobCategory, 20) : ''}</p>
                        <p className="text-gray-600 text-xs">
                             {data && data.data.description ? truncateText(data.data.description, 80) : "No description available"}
                        </p>
                        {/* <p className="text-xs text-gray-400 mt-1">{user.language}</p> */}
                        {/* <div className="text-xs text-gray-500 mt-1">
                            {user.startDate} - {user.endDate} | {user.jobCategory}
                        </div> */}
                    </div>
                </button>
                )
  )
}
