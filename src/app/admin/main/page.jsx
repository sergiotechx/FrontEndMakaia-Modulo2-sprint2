'use client'

import React from 'react'

import OnScreen from '@/app/containers/onScreen/OnScreen';
import { Button } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation'

const Page = () => {
  const router = useRouter();
  const CurrentPath = usePathname()
  return (
    <div className='onScreen'>
      <Button radius="md" compact uppercase onClick={()=> router.push(`/admin/movie?new=true&id=0`)} >
        Adicionar película
      </Button>
      <p>EN CARTELERA</p>
      <OnScreen />
    </div>
  )
}

export default Page

