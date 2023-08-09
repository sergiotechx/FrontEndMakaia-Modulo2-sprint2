import axios from 'axios';
const Url = 'http://localhost:3001/';

export async function getGenres(){
    
    let result = await axios.get(Url+'genres')
    return result.data
}