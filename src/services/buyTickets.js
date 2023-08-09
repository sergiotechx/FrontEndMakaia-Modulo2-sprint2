import { signal } from "@preact/signals-react";
export const tickets = signal();

let emptyStructure = {
    moviesId: undefined,
    cinema:undefined,
    cinemasId: undefined,
    room: undefined,
    roomId:undefined,
    spanish_title:undefined,
    hour: undefined,
    daymonth: undefined,
    numOfSeats:0,
    poster_path:undefined,
    seat: [],
    payed: false,
    readyToPay:false,
    dateDescription:undefined,
    qrMessage:undefined
}
export function clearTickets() {
    tickets.value = emptyStructure;
}


