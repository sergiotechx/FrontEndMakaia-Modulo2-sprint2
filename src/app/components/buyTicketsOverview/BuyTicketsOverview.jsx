'use client'
import React, { useEffect, useState } from 'react'
import { signal } from "@preact/signals-react";
import { ticketsQTY } from '../BuyTicketsQty/BuyTicketsQty';
import { tickets } from '@/services/buyTickets';
import Swal from 'sweetalert2';
import { Button } from '@mantine/core';
import { useRouter, usePathname } from 'next/navigation'
import { selectedSeats } from '../buyBookingSeats/buyBookingSeats';
import { updateSeats } from '@/services/updateSeats';
const ticketPrice = signal(0)

const loadData = () => {
    ticketPrice.value = 10000 * ticketsQTY.value;

}


const BuyTicketsOverview = () => {
    const [buttonText, setButtonText] = useState('')
    const router = useRouter();
    const CurrentPath = usePathname()

    useEffect(() => {
        loadData()
    }, [ticketsQTY.value])

    useEffect(() => {
        switch (CurrentPath) {
            case '/buy/buy1':
            case '/buy/buy2':
                setButtonText('Continuar')
                break;
            case '/buy/buy3':
                setButtonText('Pagar ahora')
                break;
            case '/buy/buy4':
                setButtonText('Descargar boletos')
                break;
        }
    }, [])



    const operation = () => {
        switch (CurrentPath) {
            case '/buy/buy1':
                booking1();
                break;
            case '/buy/buy2':
                booking2();
                break;
            case '/buy/buy3':
                booking3();
                break;
            case '/buy/buy4':
                let seat = ''
                tickets.value.seat.forEach(_seat=>seat+=` ${_seat}`)
                tickets.value.qrMessage = `Cine bamba presenta: ${tickets.value.spanish_title} 
                Fecha: ${tickets.value.dateDescription} 
                Complejo: ${tickets.value.cinema}
                Sala: ${tickets.value.room}
                Asientos: ${seat}`
                router.push(`/buy/buy5`)
                break;
        }

    }
    const booking2 = async () => {
        if (ticketsQTY.value > 0) {
            let response = await Swal.fire({
                title: 'Confirmación de datos',
                text: `Esta seguro de su selección para proceder con el pago?`,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                }
            })
            if (response.isConfirmed) {


                tickets.value.numOfSeats = ticketsQTY.value
                tickets.value.seat = selectedSeats.value
                router.push(`/buy/buy3`)
            }
        }
    }
    const booking3 = async () => {
        if (tickets.value.readyToPay) {
            tickets.value.payed = true;
            let update = await updateSeats(tickets.value.moviesId, tickets.value.cinemasId, tickets.value.roomId, tickets.value.daymonth, tickets.value.hour, tickets.value.seat)
            router.push(`/buy/buy4`)
        }
    }





    const booking1 = async () => {
        if (ticketsQTY.value > 0) {
            let response = await Swal.fire({
                title: 'Confirmación de datos',
                text: `Desea comprar esta cantidad de tickets y seleccionar la ubicación en la sala?`,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                }
            })
            if (response.isConfirmed) {


                tickets.value.numOfSeats = ticketsQTY.value
                router.push(`/buy/buy2`)
            }
        }
    }

    return (
        <div className='BuyOverviewContainer'>
            <h3>Resumen de compra</h3>

            {tickets.value != undefined ? (
                <div className='BuyOverviewContainer__Info'>
                    <div className='BuyOverviewContainer__Info__Poster'>
                        <figure>
                            <img src={tickets.value.poster_path} />
                        </figure>
                    </div>
                    <div className='BuyOverviewContainer__Info__Data'>

                        <div className='BuyOverviewContainer__Info__Data__Row'>
                            <h4>Película: </h4>
                            <p>{tickets.value.spanish_title}</p>
                        </div>
                        <div className='BuyOverviewContainer__Info__Data__Row'>
                            <h4>Complejo: </h4>
                            <p>{tickets.value.cinema}</p>
                        </div>
                        <div className='BuyOverviewContainer__Info__Data__Row'>

                            <h4>Fecha: </h4>
                            <p>{tickets.value.dateDescription}</p>
                        </div>
                        <div className='BuyOverviewContainer__Info__Data__Row'>
                            <h4>Función: </h4>
                            <p>{tickets.value.hour}</p>
                        </div>
                        <div className='BuyOverviewContainer__Info__Data__Row'>
                            <h4>Sala: </h4>
                            <p>{tickets.value.room}</p>
                        </div>
                        <div className='BuyOverviewContainer__Info__Data__Row2'>
                            <h4>Asientos: </h4>
                            {selectedSeats.value != undefined ? (<>
                                {selectedSeats.value.map((item, index) => <p key={index}>{item}</p>)}
                            </>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}

            <p>Se realizará un cargo por servicio por cada boleto dentro de la orden</p>

            <div className='BuyOverviewContainer__Total'>
                <h3>Total (IVA incluido)</h3>
                <h2>{ticketPrice.value} COP</h2>
            </div>
            <Button color="indigo" size="md" radius="xl" onClick={() => { operation() }}>
                {buttonText}
            </Button>
        </div>
    )
}

export default BuyTicketsOverview
