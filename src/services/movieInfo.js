import axios from 'axios';
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function getMovieById(movieId) {
    const movieInfo = await axios.get(Url + `movies/${movieId}`)
    return movieInfo.data

}

export async function insertMovie(data) {

    const movieInfo = await axios.post(Url + `movies`, JSON.stringify(data), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
    if (movieInfo.status == 201){
        return true
    }
    else{
        return false
    }
}

export async function updateMovie(movieId, data) {
    const movieInfo = await axios.patch(Url + `movies/${movieId}`, JSON.stringify(data), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
    if (movieInfo.status == 200){
        return true
    }
    else{
        return false
    }

}
