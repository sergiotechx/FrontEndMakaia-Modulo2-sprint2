'use client'
import Image from 'next/image'
import OnScreen from './containers/onScreen/OnScreen'

export default function Home() {
  
    return (
      <div className='onScreen'>
        <p>EN CARTELERA</p>
        <OnScreen/>
      </div>

    )
  }
