"use client"
import { useGetUserMutation } from '@/app/api/general'
import React, { useEffect } from 'react'
import { FaEnvelope } from 'react-icons/fa';
import moment from 'moment';

export default function ChatNot({obj}: any) {
   
  return (
 
            <div className='text-sm py-2 border-b-2 sm:border-gray-500/50 border-gray-200'>
                <div className='flex gap-2 items-center '>
                    <FaEnvelope />
                    <span>New Chat</span>
                </div>
                <span className='text-[10px] flex justify-end '>{moment(obj.createdAt).format('hh:mma')}</span>
            </div>
  )
}
