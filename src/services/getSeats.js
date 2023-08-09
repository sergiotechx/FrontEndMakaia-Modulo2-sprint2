import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function getSeats(cinemasId, roomsId, moviesId, daymonth, time) {
    let completeUrl = Url + `shedules?active=true&cinemasId=${cinemasId}&roomsId=${roomsId}&moviesId=${moviesId}&daymonth=${daymonth}&time=${time}`
    let result = await axios.get(completeUrl)

    let seats = [];
    let row = []
    let index = 0
    result.data[0].seats.forEach(element => {
        
        
        row.push({ id: element.id, number: element.number.toString(), isReserved: element.isReserved })
        if(index==4){
            row.push(null)
            row.push(null)
        } 
        index++
        if (index == 10) {
            seats.push(row)
            index = 0
            row = []
        }

    });
     return seats



}