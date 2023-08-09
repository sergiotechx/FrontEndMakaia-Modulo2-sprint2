'use client'

import { Button } from '@mantine/core';
import { signal } from "@preact/signals-react";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import { tickets, clearTickets } from '../../../services/buyTickets'
import { useEffect } from 'react';
import { getCinemaName } from '@/services/cinemaName';
import { getMovieById } from '@/services/movieInfo';
import { dateDescription } from '@/services/dateDescription';
const selectedShowHour = signal();




const RoomHours = ({ movieId, cinemaId, cinemaName, date, roomHours, title }) => {
    const router = useRouter();
  

    let year = roomHours[0].year.toString();
    let month = roomHours[0].month.toString(); 
    let day = roomHours[0].day.toString();
    const _dateDescription = signal('')
    _dateDescription.value = dateDescription(`${year}-${month}-${day}`)
    
   
    
    const fillInitialTicket = async () => {
        clearTickets()
        tickets.value.cinemasId = cinemaId
        tickets.value.moviesId = movieId
        tickets.value.daymonth = date
        tickets.value.room = selectedShowHour.value.room
        tickets.value.hour = selectedShowHour.value.hour
        tickets.value.daymonth = date
        tickets.value.spanish_title = title
        let cinemaInfo = await getCinemaName(tickets.value.cinemasId)
        tickets.value.cinema = cinemaInfo.name
        tickets.value.dateDescription = _dateDescription.value
        
        let roomInfo = cinemaInfo.rooms.find(room => {
            if (room.room == tickets.value.room) {
                return true
            }

        }
        )
        tickets.value.roomId = roomInfo.id
        let movieInfo = await getMovieById(tickets.value.moviesId)
        tickets.value.poster_path = movieInfo.poster_path
        

    }


    const handleSelectTickets = async () => {

        if (selectedShowHour.value != undefined) {
            let response = await Swal.fire({
                title: 'Confirmación de datos',
                text: `Pelicula: ${title} Sala: ${selectedShowHour.value.room} Hora: ${selectedShowHour.value.hour}`,
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                }
            });
            if (response.isConfirmed) {
                await fillInitialTicket()
                router.push(`/buy/buy1`)
            }
        }
    };

    const handleRadioChange = (event) => {
        let temp = event.target.value.split("-");
        let room = roomHours[temp[0]].room
        let hour = roomHours[temp[0]].hours[temp[1]]
        selectedShowHour.value = { room: room, hour: hour }
    };

    return (
        <div className='RoomHours'>
            <h4>Horarios disponible: {_dateDescription.value} Cinema: {cinemaName}</h4>
            <p>Elige el horario que quieras</p>
            {
                roomHours.map((room, indexRoom) =>

                    <div className='RoomHours__OneRoomContainer' key={`${indexRoom}-`}>
                        <h5>{room.room}</h5>
                        <div className='RoomHours__Hours'>
                            {room.hours.map((reroom, indexHour) => <>

                                <input
                                    key={`${indexRoom}-${indexHour}`}
                                    type="radio"
                                    name="opcion"
                                    id={`${indexRoom}-${indexHour}`}
                                    value={`${indexRoom}-${indexHour}`}
                                    onChange={handleRadioChange}
                                />
                                <label key={`${indexRoom}-${indexHour}-`} htmlFor={`${indexRoom}-${indexHour}`}>{reroom}</label></>)
                            }
                        </div >
                    </div>

                )
            }
            <Button onClick={handleSelectTickets}>Seleccionar boletos</Button>

        </div>
    )
}

export default RoomHours
