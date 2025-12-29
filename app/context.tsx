"use client"

import React, { useEffect, useState } from "react"
import { createContext } from "react"

type LanguageContextType = [string, (language: string) => void];
export default function Language({ children }: {
    children: React.ReactNode,
}): React.ReactNode{
    const [language, setLanguage] = useState<string>('en');
    const [jobDetails, setJobDetails] = useState()
    
   return(
        <>
            <LanguageData.Provider value={[language, setLanguage]}>
                <JobData.Provider value={[jobDetails, setJobDetails]}>
                    {children}
                </JobData.Provider>
            </LanguageData.Provider>
        </>
   )
}

export const LanguageData = createContext<LanguageContextType | null>(null);
export const JobData = createContext<any>(null);