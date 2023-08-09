'use client'
import './page.scss'
import React from 'react'
import BuyTicketsQty from '@/app/components/BuyTicketsQty/BuyTicketsQty'
import BuyTicketsOverview from '@/app/components/buyTicketsOverview/BuyTicketsOverview'
import CreditCard from '@/app/components/creditCard/creditCard'



const Page = () => {

  return (
    <div className='buy3Container'>
      <div className='buy3CreditCard'>
        <CreditCard />
      </div>
      <div className='buy3Overview'>
        <BuyTicketsOverview />
      </div>
    </div>
  )
}

export default Page