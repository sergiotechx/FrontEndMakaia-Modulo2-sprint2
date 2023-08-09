'use client'
import React, { useEffect } from 'react'
import { signal } from '@preact/signals-react';
import { selectedSeats } from '../buyBookingSeats/buyBookingSeats';

export const ticketsQTY = signal(0)

const BuyticketsQty = () => {

  const handleClick = (operation) => {

    if (operation == '+') {
      if (ticketsQTY.value < 10) {
        ticketsQTY.value += 1
      }
    }
    else {
      if (ticketsQTY.value > 0) {
        ticketsQTY.value -= 1
      }
    }
  }

 useEffect(() => {
  ticketsQTY.value = 0;
  if(selectedSeats.value!=undefined){
    selectedSeats.value =[]
  }
 }, [])
 

  return (
    <div className='BuyticketsQty__numOfSeats'>
      <h3>Selecciona tus boletos</h3>
      <p>Puedes comprar 10 boletos máximo por transacción</p>
      <div className='BuyticketsQty__numOfSeatsGC'>
        <p>GENERAL</p>
        <div className='BuyticketsQty__numOfSeatsGC1'>
          <h5>10.000 COP</h5>
          <div className='BuyticketsQty__numOfSeatsGC2'>
            <button  onClick={() => { handleClick('-') }}>-</button>
            <span>{ticketsQTY} </span>
            <button  onClick={() => { handleClick('+') }}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyticketsQty
