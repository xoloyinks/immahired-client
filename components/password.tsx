"use client"
import { useState } from 'react';
import { IoEyeOff, IoEye } from 'react-icons/io5';

const PasswordInput = ({ label = "Password", placeholder = "Enter password", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full relative'>
      {label && <label>{label}</label>}
      <input 
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder} 
        className=' placeholder:text-gray-300 w-full border-gray-300 absolute z-10 pr-10' 
        {...props}
      />
      <div onClick={() => setShowPassword(!showPassword)} className='absolute z-20 right-3 hover:cursor-pointer h-10 flex items-center'>
        {
          showPassword ? <IoEyeOff className='text-2xl text-gray-500' /> : <IoEye className='text-2xl text-gray-500' />
        }
      </div>
    </div>
  );
};

export default PasswordInput;
