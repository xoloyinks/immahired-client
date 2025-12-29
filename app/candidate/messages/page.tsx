"use client"
import { useGetContactsQuery } from '@/app/api/general'
import Employer from '@/components/employer'
import Talent from '@/components/talent'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Cookies from 'js-cookie'

export default function Messages() {
    const { data } = useGetContactsQuery(null);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [talent, setTalent] = useState('');
    const tokenData = Cookies.get('token');
    var tokenStatus: any;
    if(tokenData){
        tokenStatus = JSON.parse(tokenData);
    }
    useEffect(() => {
        if(data){
            setContacts(data.data);
            setFilteredContacts(data.data);
        }
    }, [data])
    // console.log("data: ", data);
    const handleChange = (e: any) => {
        const filtered = contacts.filter((contact: any) => 
            contact?.name.toLowerCase().includes(talent) || 
            contact?.lastName.toLowerCase().includes(talent)
        );
        setFilteredContacts(filtered);
    };
    
  return (
    <section>
        <h2 className='text-[2rem] font-semibold'>Chats</h2>
        {
            !tokenStatus.data.approved && (
                <p className='text-xs bg-red-500 text-white rounded p-2 w-fit mb-5'>Cannot send and view messages yet! Pending admin approval</p>
            )
        }
        <div className='bg-gray-300 w-full sm:w-1/2 shadow-xl shadow-black/20 rounded-xl p-5  sm:p-10'>
            <h2 className='text-[1rem] font-semibold text-black'>Employers</h2>
            <div className='border-b-2 border-white w-[50%] my-3 flex items-center justify-between py-2'>
                <input value={talent} onChange={(e:any) => setTalent(e.target.value)} type="text" className='focus:outline-none bg-transparent text-sm w-[85%]' placeholder='Search talent' />
                <button onClick={handleChange} className='text-sm text-main'>
                    <FaSearch />
                </button>
            </div>
            {
               filteredContacts && filteredContacts.map((datum: any, index:number) => <Employer key={index} data={datum} />)
            }

            {
                filteredContacts.length === 0 && (
                    <div className='py-3 text-sm'>
                        Employer not found!
                    </div>
                )
            }

            {
                data && data.data.length === 0 &&(
                    <div className='py-3 text-sm'>
                        No Chats..
                    </div>
                )
            }
        </div>
    </section>
  )
}
