import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function getGenres(){
    
    let result = await axios.get(Url+'genres')
    return result.data
}