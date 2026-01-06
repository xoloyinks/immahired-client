import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

export default function Team({target}: any) {
  return (
    <section className="sm:py-12" id="team">
                  <h2 className="text-center p-10 sm:mb-20">
                    <span className="block text-sm uppercase tracking-[0.4em] text-abstract/60 mb-3">
                      {target.meet_the_people}
                    </span>

                    <span className="block text-4xl sm:text-5xl tracking-[0.2em] font-black text-abstract">
                      {target.meet_the_team}
                    </span>
                  </h2>



                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay:0.5 }}
                    className="flex sm:flex-row max-sm:justify-center max-sm:gap-8 flex-col justify-evenly">
                      <div className="text-center w-full sm:w-[30%] flex items-center gap-2 flex-col">
                        <div className="relative w-[215px] h-60 sm:w-64 sm:h-72 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={'/images/img-2.png'}
                            fill
                            alt="Profile image"
                            className="object-bottom"
                          />
                        </div>
                        <p className="text-xl font-bold ">Imma Jing</p>
                        <p>{target.ceo}</p>
                      </div>

                      <div className="text-center w-full sm:w-[30%] flex items-center gap-2 flex-col">
                        <div className="relative w-[215px] h-60 sm:w-64 sm:h-72 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={'/images/img3.png'}
                            fill
                            alt="Profile image"
                            className="object-bottom"
                          />
                        </div>
                        <p className="text-xl font-bold ">Maggie luo</p>
                        <p>{target.recruitment_specialist}</p>
                      </div>

                      <div className="text-center w-full sm:w-[30%] flex items-center gap-2 flex-col">
                        <div className="relative w-[215px] h-60 sm:w-64 sm:h-72 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={'/images/img1.png'}
                            fill
                            alt="Profile image"
                            className="object-bottom"
                          />
                        </div>
                        <p className="text-xl font-bold ">Chen Lanping</p>
                        <p>{target.sales_marketing_specialist}</p>
                      </div>
                  </motion.div>
                </section>
  )
}
