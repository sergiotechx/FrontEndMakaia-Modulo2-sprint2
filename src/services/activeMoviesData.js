import { signal } from "@preact/signals-react";
import axios from 'axios';
import { getGenreById } from "./getGenreById";
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';
export const activeMoviesData = signal([]);
export const cardsInfo = signal([]);

export async function getActiveMoviesData() {
    const result = await axios.get(Url + `movies?active=true`);
    let data = [];

    result.data.forEach(element => {
        data.push(element);
    });

    activeMoviesData.value = data;


}



export async function getMoviesCardsInfo() {
    let data = [];
    activeMoviesData.value.forEach((movie, index) => {
        data.push({
            id: movie.id,
            spanish_title: movie.spanish_title,
            original_title: movie.original_title,
            premiere: movie.premiere,
            image: movie.poster_path,
            trailer: movie.trailer,
            genre: movie.genre,
            runtime: movie.runtime,
            overview: movie.overview
        });
    })
    cardsInfo.value = data;
}

export async function getMovieInfo(movieId) {
    const result = await axios.get(Url + `movies/${movieId}`);
    return result.data;
}



