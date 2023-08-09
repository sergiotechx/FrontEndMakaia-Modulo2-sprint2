import axios from 'axios';
const url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function updateSeats(movieId, cinemaId, room, daymonth, time, shedule) {

    let completeUrl = url + `shedules?active=true&moviesId=${movieId}&cinemasId=${cinemaId}&roomsId=${room}&daymonth=${daymonth}&time=${time}`
   
    let result = await axios.get(completeUrl)
    let data = result.data[0];
    
     shedule.forEach(element => {
        let index = element -1
        data.seats[index].isReserved = true;
     });
   
    let id = data.id 
    completeUrl = url + `shedules/${id}`
  

        result = await axios.patch(completeUrl, JSON.stringify(data), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
     
    
        if (result.status == 200) {
            return true;
        }
        else {
            return false;
        }
  
   
   
    return true;
}