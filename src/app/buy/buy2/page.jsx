'use client'
import './page.scss'
import React from 'react'
import BuyTicketsQty from '@/app/components/BuyTicketsQty/BuyTicketsQty'
import BuyTicketsOverview from '@/app/components/buyTicketsOverview/BuyTicketsOverview'
import BuyBookingSeats from '@/app/components/buyBookingSeats/buyBookingSeats'






const Page = () => {

  return (
    <div className='buy2Container'>
      <div className='buy2Seats'>
        <BuyBookingSeats />
      </div>
      <div className='buy2Overview'>
        <BuyTicketsOverview />
      </div>
    </div>
  )
}

export default Page
