'use client'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const date = new Date().toLocaleDateString()
const uuid = uuidv4();
const Success = () => {
   const [transactionDate, setTransactionDate]= useState(date)
   const [transactionCode, settransactionCode]= useState(uuid)
   console.log('transactionCode',transactionCode)
   
    
    return (
        <div className='Success'>
            <div className='Success__Message'>
                <img src='/images/check_circle.png' />
                <p>¡Transacción exitosa!</p>
            </div>
            <h4>Información de compra</h4>
            <div className='Success__PaymentInfo'>
                <div className='Success__PaymentInfo__Column'>
                    <p>código</p>
                    <p>{transactionCode}</p>
                </div>
                <div className='Success__PaymentInfo__Column'>
                    <p>Fecha</p>
                    <p>{transactionDate}</p>
                </div>
                <div className='Success__PaymentInfo__Column'>
                    <p>Método de pago</p>
                    <div className='Success__PaymentInfo__Column__Master'>
                        <img src='/images/master.png' /><p>Master card *...123</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success
