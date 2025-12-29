"use client"
import { LanguageData } from '@/app/context';
import React, { useContext, useEffect } from 'react'
import ReactFlagsSelect from 'react-flags-select'
import { IoEarthSharp } from 'react-icons/io5';

export default function Language() {
    const languageContext: any = useContext(LanguageData); 
    const [language, setLanguage] = languageContext;
    
    useEffect(() => {
      const localLanguage = localStorage.getItem('language');
      if(localLanguage){
        setLanguage(localLanguage)
      }  
    }, [])
    

    const handleChange = (e: any) => {
        console.log(e);
        if(localStorage){
          if(e === 'GB'){
            setLanguage('en');
            localStorage.setItem('language', 'en')
          }
          if(e === 'ES'){
            setLanguage('es');
            localStorage.setItem('language', 'es')
            // setTransLanguage('Spanish')
          }
          if(e === 'CN'){
            setLanguage('cn');
            localStorage.setItem('language', 'cn')
            // setTransLanguage('Chinese')
          }
        }
      }
  return (
    <section className='flex items-center gap-2'>
        <label><IoEarthSharp /></label>
         <ReactFlagsSelect
                      selected={language}
                      countries={["GB", "CN", "ES"]}
                      onSelect={handleChange}
                      className={`menu-flags outline-none `}
                      placeholder={language}
                      showSelectedLabel={true}
                    //   selectButtonClassName="menu-flags-button"
                      selectedSize={10}
                      optionsSize={14}
        />
    </section>
  )
}
