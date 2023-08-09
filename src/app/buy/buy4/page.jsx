'use client'
import './page.scss'
import React from 'react'
import BuyTicketsOverview from '@/app/components/buyTicketsOverview/BuyTicketsOverview'
import Success from '@/app/components/success/success'




const Page = () => {

  return (
    <div className='buy4'>
      
        <Success/>
        <BuyTicketsOverview/>
      </div>
     

  )
}

export default Page