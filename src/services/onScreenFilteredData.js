import axios from 'axios';
const url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';

export async function onScreenFilteredData(urlParameters, genre) {
    let data = [];

    const result = await axios.get(url + urlParameters);
    if (genre == undefined) {
        data = result.data;
    }
    else {
        let filteredData = result.data.filter((data) => {
            for (const genreFor of data.movies.genre) {
                if (genreFor.id == genre) {
                    return true;
                }
            }
            return false;
        })
        data = filteredData;
    }

    if (data.length > 0) {
        data.sort((element1, element2) => { return element1.moviesId - element2.moviesId; });
        let tempMovies = []
        let tempData = []
        data.forEach(element => {
            tempMovies.push(element.moviesId)
        });
        let uniqueMovies = [...new Set(tempMovies)];
        uniqueMovies.forEach(movie => {
            tempMovies = data.find(item => {
                if (item.movies.id == movie) {
                    return true;
                }
                else {
                    return false;
                }
            })
            tempData.push(tempMovies.movies)
        })
        if (tempData.length > 0) {
            data = tempData
        }
    }

    return data;

}