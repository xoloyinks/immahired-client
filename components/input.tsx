import React, { ReactNode } from 'react'

interface InputProps {
    label: string;
    value?: string;
    onChange: any;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string; // Make the type prop optional
  }
export default function Input({label,value ='', onChange,name, type = 'text', placeholder = '', required = true }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target)
  }
  return (
    <div>
        <label className='text-sm font-semibold'>{label}</label>
        <input required={required} value={value} name={name} type={type} onChange={handleChange} placeholder={placeholder} className='w-full p-2 rounded-md border-2 border-main/20' />
    </div>
  )
}

