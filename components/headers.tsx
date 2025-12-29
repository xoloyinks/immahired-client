import React from 'react'

export default function Header({ title }: { title:any }) {
  return (
    <div className='text-4xl sm:text-5xl font-extrabold'>{title}</div>
  )
}
