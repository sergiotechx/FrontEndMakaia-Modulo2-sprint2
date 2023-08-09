import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function getCinemaName(cinemaId) {
    const cinemaInfo = await axios.get(Url + `cinemas/${cinemaId}`)
    return cinemaInfo.data
}