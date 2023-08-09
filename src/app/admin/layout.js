'use client'

import {  useRouter } from 'next/navigation'

import { getSessionStorage } from '@/services/sessionStoraje';
import { useEffect, useState } from 'react';



export default function RootLayout({ children }) {
  const router = useRouter();
  const [session,Setsession] = useState()
 useEffect(() => {
   let _session = getSessionStorage("CineColombia")
   if(!(Object.keys(_session).length > 0) ){
    router.push(`/`)
   }
   else{Setsession(_session)}
 
  
 }, [])
 

  return (
   <>
  
  { children }
  
   </>
  )
}
