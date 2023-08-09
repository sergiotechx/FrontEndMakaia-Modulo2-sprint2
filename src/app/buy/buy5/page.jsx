'use client'
import './page.scss'
import React from 'react'
import QRCode from "react-qr-code";
import { tickets } from '@/services/buyTickets';
const Page = () => {
  
            

  return (
    <div className='buy5'>
      <div className='buy5__header'>
        <div className='buy5__header__col'>
          <h2>Boletos</h2>
        </div>
        <div className='buy5__header__col'>
          <div className='buy5__header__col__dates'>
            {tickets.value != undefined && (
              <>
                <p>{tickets.value.dateDescription}</p>
                <h4>{tickets.value.hour}</h4>
              </>)}

          </div>
        </div>

      </div>
      <div className='buy5__info'>
        <div className='buy5__info__poster'>
          {tickets.value != undefined && <img src={tickets.value.poster_path} />}
        </div>
        <div className='buy5__info__data'>
          {tickets.value != undefined && (
            <>
              <div className='buy5__info__data__row'>
                <p>Pelicula:{tickets.value?.spanish_title}</p>
              </div>
              <div className='buy5__info__data__row'>
                <p>Complejo: {tickets.value?.cinema}</p>
              </div>
              <div className='buy5__info__data__row'>
                <p>Asientos: </p>{tickets.value?.seat.map((item, index) => <p key={index}>{item}</p>)}
              </div>
              <div className='buy5__info__data__row'>
                <p>Sala: {tickets.value?.room}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='buy5__qr'>
     
      {tickets.value != undefined ? (
      <QRCode
          size={300}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={tickets.value.qrMessage}
          viewBox={`0 0 256 256`}
        />
      ):null}
        
      </div>
    </div>
  )
}

export default Page