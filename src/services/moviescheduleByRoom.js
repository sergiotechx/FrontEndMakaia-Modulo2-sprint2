import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';
export async function getMoviescheduleByRoom(movieId, cinemaId, date) {
    //información de los cinemas
    const cinemaInfo = await axios.get(Url + `cinemas/${cinemaId}`)


    //primero toda la info incluyendo todas las salas
    let result = await axios.get(Url + `shedules?active=true&moviesId=${movieId}&cinemasId=${cinemaId}&daymonth=${date}&_sort=roomsId&_order=asc`);

    let tempRooms = [];
    result.data.forEach(element => {
        tempRooms.push(element.roomsId)
    });
    let uniqueRooms = [...new Set(tempRooms)];

    let rooms = [];
    //segundo todos horarios por sala
    for (let i = 0; i < uniqueRooms.length; i++) {
        let roomId = uniqueRooms[i];
        let temproomID = roomId
        result = await axios.get(Url + `shedules?active=true&moviesId=${movieId}&cinemasId=${cinemaId}&roomsId=${roomId}&daymonth=${date}&_sort=time&_order=asc&_expand=cinemas`)
      
        let tempHours = []
        result.data.forEach(element => tempHours.push(element.time))
        let year = 0
        let month = 0
        let day = 0
        if(result.data.length>0){
            year = result.data[0].year
            month = result.data[0].month
            day = result.data[0].day
        }

        let roomInfo = cinemaInfo.data.rooms.find((room) => room.id == temproomID)
      
        let oneRoom = { id: roomId, room: roomInfo.room, hours: tempHours,year,month,day }
        rooms.push(oneRoom)
    }
    return rooms;
}