'use client'
import './page.scss'
import React from 'react'
import BuyTicketsQty from '@/app/components/BuyTicketsQty/BuyTicketsQty'
import BuyTicketsOverview from '@/app/components/buyTicketsOverview/BuyTicketsOverview'



const Page = () => {

  return (
    <div className='buy1Container'>
      <div className='buy1TicketsQty'>
        <BuyTicketsQty />
      </div>
      <div className='buy1Overview'>
        <BuyTicketsOverview />
      </div>
    </div>
  )
}

export default Page