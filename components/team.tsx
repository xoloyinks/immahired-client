import React from 'react'
import Header from './headers'
import boss from '@/public/images/img-2.png'
import TeamCard from './teamCard'
import mem1 from "@/public/images/img3.png"
import mem2 from "@/public/images/Frame 660.png"
import mem3 from "@/public/images/img1.png"

export default function Team({job_1,job_2,job_3,job_4, team, target }: any) {
    const members = [
        {
            name: 'Maggie luo',
            position: job_1,
            image: mem1
        },
        {
            name: 'Chen Lanping',
            position: job_3,
            image: mem3
        }
    ]
  return (
    <section id='team' className='bg-basic px-banner-clamp py-10 space-y-16'>
        <Header title={team} />
        <div className="flex justify-center">
            <TeamCard
                name={'Imma Jing'} 
                position={target.ceo}
                src={boss} 
            />
        </div>
        <div className="flex flex-col space-y-5 lg:flex-row justify-evenly">
            {
                members && members.map((member, index) => 
                    <TeamCard 
                        key={index}
                        name={member.name} 
                        position={member.position} 
                        src={member.image} 
                    />
                )
            }
        </div>
    </section>
  )
}
