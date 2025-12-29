import Image from 'next/image'
import React from 'react'
import pp from '@/public/images/pexels-cowomen-1058097-2041627.jpg'
import { RiSendPlaneFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Talent({data}: any) {
    const route = useRouter();
    const tokenData = Cookies.get('token');
    var tokenStatus: any;
    if(tokenData){
        tokenStatus = JSON.parse(tokenData);
    }
    const goToChat = () => {
       if(localStorage){
        localStorage.setItem('profile', JSON.stringify(data))
        route.push('/employer/messages/chat');
       }
    }
  return (
    <section className='py-5 flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
            <div className='relative h-16 w-16 shadow-xl shadow-gray-700 rounded-full overflow-hidden'>
                <Image 
                    src={data?.image.url}
                    alt='Profile picture'
                    fill
                    className='object-cover'
                />
            </div>
            <div className='flex flex-col text-sm text-gray-700 font-semibold'>
                <span>{data?.lastName} {data?.name}</span>
                <span>{data?.email}</span>
            </div>
        </div>

        <button disabled={!tokenStatus.data.approved} onClick={goToChat} className='py-2 px-5 h-fit text-lg bg-main rounded text-white hover:bg-gray-300 hover:border-2 hover:border-main hover:text-main'>
            <RiSendPlaneFill />
        </button>
    </section>
  )
}
