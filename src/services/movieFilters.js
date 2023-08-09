import { signal } from "@preact/signals-react";
import axios from 'axios';
import { getGenreById } from "./getGenreById";
const Url = 'https://modulo-2-jsonserver-sprint2.onrender.com/';
export const genresFilter = signal();
export const cinemasFilter = signal();
export const dateFilter = signal();
export const scMovieFilter = signal(); 
export const scCinemasFilter= signal();

export async function scGetMovies(){
    let result = await axios.get( Url+ `movies` )
    let data =[];
    result.data.forEach(movie=>data.push({value:movie.id.toString(), label:movie.spanish_title}))
    return data;
}
export async function scGetCinemas(){
    let result = await axios.get( Url+ `cinemas` )
    let data =[];
    result.data.forEach(cinema=>data.push({value:cinema.id.toString(), label:cinema.name}))
    return data;
}