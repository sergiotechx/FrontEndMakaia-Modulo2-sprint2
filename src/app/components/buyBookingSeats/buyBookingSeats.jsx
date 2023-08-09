'use client'
import Image from 'next/image'
import SeatPicker from "react-seat-picker";
import { useEffect, useState } from 'react';
import React from 'react'
import { getSeats } from '@/services/getSeats';
import { tickets } from '@/services/buyTickets';
import { ticketsQTY } from '../BuyTicketsQty/BuyTicketsQty';
import { signal } from "@preact/signals-react";
export const selectedSeats = signal([]);
const BuyBookingSeats = () => {

  const [rows, setRows] = useState([]);
  
  const loadChairsData = async () => {
    ticketsQTY.value = 0
    selectedSeats.value = []

    let temp = await getSeats(tickets.value.cinemasId, tickets.value.roomId, tickets.value.moviesId
      , tickets.value.daymonth, tickets.value.hour);
    setRows(temp)
  
  }
  useEffect(() => {
    loadChairsData()
  }, []) 

  const addSeatCallback = ({ row, number, id }, addCb) => {
    selectedSeats.value = [...selectedSeats.value, number]
    const newTooltip = `Silla que seleccionaste`;
    addCb(row, number, id, newTooltip);
    ticketsQTY.value = selectedSeats.value.length
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    selectedSeats.value = selectedSeats.value.filter((item) => item !== number)
    ticketsQTY.value = selectedSeats.value.length
    removeCb(row, number);
  };




  return (
    <div className='Seats__Container'>

      <h3>Selecciona tus asientos</h3>
      <p>Para cambiar tu lugar asignado da click en el asiento deseado</p>
      <div className='Seats__Container__options'>
        <img src='/images/EmptySeat.png' />
        <p>Libre</p>
        <img src='/images/SelectedSeat.png' />
        <p>Seleccionada</p>
        <img src='/images/ReservedSeat.png' />
        <p>Reservada</p>
      </div>
      {rows.length > 0 ? (
        <SeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rows}
          alpha
          maxReservableSeats={tickets.value.numOfSeats}
          visible
        />
      ) : null}


    </div>
  )
}

export default BuyBookingSeats
