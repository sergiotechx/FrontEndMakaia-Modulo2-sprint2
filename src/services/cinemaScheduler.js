import axios from 'axios';
import { getCinemaName } from './cinemaName';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function getCinemaSc(cinemaId, movieId, year, month, day) {
    let completeUrl = Url + `shedules?cinemasId=${cinemaId}&_expand=cinemas&moviesId=${movieId}&year=${year}&month=${month}&day=${day}`
    const cinemaInfo = await axios.get(completeUrl)
    let tempCinemadata = await getCinemaName(cinemaId)


    let room1 = []
    let room2 = []
    let room3 = []
    let room4 = []
    let room5 = []
    if (cinemaInfo.data.length > 0) {
        for (let index = 0; index < 5; index++) {
            let temp = cinemaInfo.data.filter((schedule) => schedule.roomsId == (index + 1))

            if (index == 0) {
                temp.forEach(schedule => room1.push(schedule.time))
                room1.sort(sortHours);
            }

            if (index == 1) {
                temp.forEach(schedule => room2.push(schedule.time))

                room2.sort(sortHours);
            }
            if (index == 2) {
                temp.forEach(schedule => room3.push(schedule.time))

                room3.sort(sortHours);
            }
            if (index == 3) {
                temp.forEach(schedule => room4.push(schedule.time))
                room4.sort(sortHours);
            }
            if (index == 4) {
                temp.forEach(schedule => room5.push(schedule.time))
                room5.sort(sortHours);
            }
        }


        return {
            cinemaId,
            cinemaName: tempCinemadata.name,
            movieId,
            year,
            month,
            day,
            room1,
            room2,
            room3,
            room4,
            room5
        }
    }
    else {

        return {
            cinemaId,
            cinemaName: tempCinemadata.name,
            movieId,
            year,
            month,
            day,
            room1,
            room2,
            room3,
            room4,
            room5
        }
    }


}

function sortHours(hora1, hora2) {
    // Convertimos las horas a números
    let hora1Number = parseInt(hora1.split(":")[0]) * 60 + parseInt(hora1.split(":")[1]);
    let hora2Number = parseInt(hora2.split(":")[0]) * 60 + parseInt(hora2.split(":")[1]);

    // Comparamos los números
    if (hora1Number < hora2Number) {
        return -1;
    } else if (hora1Number > hora2Number) {
        return 1;
    } else {
        return 0;
    }
}

export async function rescheduler(cinemascope) {
    let completeUrl = Url + `shedules?cinemasId=${cinemascope.cinemaId}&moviesId=${cinemascope.movieId}&year=${cinemascope.year}&month=${cinemascope.month}&day=${cinemascope.day}`
    
     let result = await axios.get(completeUrl)
    if (result.data.length) {
        for (let index = 0; index < result.data.length; index++) {
            completeUrl = Url + `shedules/${result.data[index].id}`
            let tempResult = await axios.delete(completeUrl)
         
        }
    }

   

    if (cinemascope.room1.length > 0) {
        await createSchedules(cinemascope.cinemaId, 1, cinemascope.movieId, cinemascope.year, cinemascope.month, cinemascope.day, cinemascope.room1)
    }
    if (cinemascope.room2.length > 0) {
        await createSchedules(cinemascope.cinemaId, 2, cinemascope.movieId, cinemascope.year, cinemascope.month, cinemascope.day, cinemascope.room2)
    }
    if (cinemascope.room3.length > 0) {
        await createSchedules(cinemascope.cinemaId, 3, cinemascope.movieId, cinemascope.year, cinemascope.month, cinemascope.day, cinemascope.room3)
    }
    if (cinemascope.room4.length > 0) {
        await createSchedules(cinemascope.cinemaId, 4, cinemascope.movieId, cinemascope.year, cinemascope.month, cinemascope.day, cinemascope.room4)
    }
    if (cinemascope.room5.length > 0) {
        await createSchedules(cinemascope.cinemaId, 5, cinemascope.movieId, cinemascope.year, cinemascope.month, cinemascope.day, cinemascope.room5)
    }
    return true
}

async function createSchedules(cinemaId, room, movieId, year, month, day, roomhours) {
    let schedule = scheduleTemplate
    schedule.cinemasId = cinemaId
    schedule.roomsId = room
    schedule.moviesId = movieId
    schedule.year = year
    schedule.month = month
    schedule.day = day
    schedule.daymonth = day.toString() + '-' + month.toString()
    let completeUrl = Url + 'shedules'
    let result
    for (let index = 0; index < roomhours.length; index++) {
        schedule.time = roomhours[index]

        result = await axios.post(completeUrl, JSON.stringify(schedule), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
        console.log("la actualizacion es!",result)
    }
}

let scheduleTemplate = {
    cinemasId: undefined,
    roomsId: undefined,
    moviesId: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    time: undefined,
    daymonth: undefined,
    active: true,
    seats: [
        {
            "id": 1,
            "number": "1",
            "isReserved": false
        },
        {
            "id": 2,
            "number": "2",
            "isReserved": false
        },
        {
            "id": 3,
            "number": "3",
            "isReserved": false
        },
        {
            "id": 4,
            "number": "4",
            "isReserved": false
        },
        {
            "id": 5,
            "number": "5",
            "isReserved": false
        },
        {
            "id": 6,
            "number": "6",
            "isReserved": false
        },
        {
            "id": 7,
            "number": "7",
            "isReserved": false
        },
        {
            "id": 8,
            "number": "8",
            "isReserved": false
        },
        {
            "id": 9,
            "number": "9",
            "isReserved": false
        },
        {
            "id": 10,
            "number": "10",
            "isReserved": false
        },
        {
            "id": 11,
            "number": "11",
            "isReserved": false
        },
        {
            "id": 12,
            "number": "12",
            "isReserved": false
        },
        {
            "id": 13,
            "number": "13",
            "isReserved": false
        },
        {
            "id": 14,
            "number": "14",
            "isReserved": false
        },
        {
            "id": 15,
            "number": "15",
            "isReserved": false
        },
        {
            "id": 16,
            "number": "16",
            "isReserved": false
        },
        {
            "id": 17,
            "number": "17",
            "isReserved": false
        },
        {
            "id": 18,
            "number": "18",
            "isReserved": false
        },
        {
            "id": 19,
            "number": "19",
            "isReserved": false
        },
        {
            "id": 20,
            "number": "20",
            "isReserved": false
        },
        {
            "id": 21,
            "number": "21",
            "isReserved": false
        },
        {
            "id": 22,
            "number": "22",
            "isReserved": false
        },
        {
            "id": 23,
            "number": "23",
            "isReserved": false
        },
        {
            "id": 24,
            "number": "24",
            "isReserved": false
        },
        {
            "id": 25,
            "number": "25",
            "isReserved": false
        },
        {
            "id": 26,
            "number": "26",
            "isReserved": false
        },
        {
            "id": 27,
            "number": "27",
            "isReserved": false
        },
        {
            "id": 28,
            "number": "28",
            "isReserved": false
        },
        {
            "id": 29,
            "number": "29",
            "isReserved": false
        },
        {
            "id": 30,
            "number": "30",
            "isReserved": false
        },
        {
            "id": 31,
            "number": "31",
            "isReserved": false
        },
        {
            "id": 32,
            "number": "32",
            "isReserved": false
        },
        {
            "id": 33,
            "number": "33",
            "isReserved": false
        },
        {
            "id": 34,
            "number": "34",
            "isReserved": false
        },
        {
            "id": 35,
            "number": "35",
            "isReserved": false
        },
        {
            "id": 36,
            "number": "36",
            "isReserved": false
        },
        {
            "id": 37,
            "number": "37",
            "isReserved": false
        },
        {
            "id": 38,
            "number": "38",
            "isReserved": false
        },
        {
            "id": 39,
            "number": "39",
            "isReserved": false
        },
        {
            "id": 40,
            "number": "40",
            "isReserved": false
        },
        {
            "id": 41,
            "number": "41",
            "isReserved": false
        },
        {
            "id": 42,
            "number": "42",
            "isReserved": false
        },
        {
            "id": 43,
            "number": "43",
            "isReserved": false
        },
        {
            "id": 44,
            "number": "44",
            "isReserved": false
        },
        {
            "id": 45,
            "number": "45",
            "isReserved": false
        },
        {
            "id": 46,
            "number": "46",
            "isReserved": false
        },
        {
            "id": 47,
            "number": "47",
            "isReserved": false
        },
        {
            "id": 48,
            "number": "48",
            "isReserved": false
        },
        {
            "id": 49,
            "number": "49",
            "isReserved": false
        },
        {
            "id": 50,
            "number": "50",
            "isReserved": false
        }
    ]
}