import axios from 'axios';
import { TemplateContext } from 'next/dist/shared/lib/app-router-context';
const key = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWFhNzE1MTkzMTQyNzE2YzE0NDBmOTc4MTIwNjIwNiIsInN1YiI6IjY0YjIxMzRlMGJiMDc2MDE0ZTRlNDA1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hpOXKWhZsuvuZA0z1jb_-Erq_n7C3PBt5_gWHJ0DeYA';
export async function getTMDBMovieInfo(id) {
   
    let result = await await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`,{
        headers: {
            accept: 'application/json',
            Authorization: key
          }
    })
  let data = result.data;
  let movie ={
    id:undefined,
    runtime:undefined,
    original_title:undefined,
    title:undefined,
    overview:undefined,
    production_countries: undefined,
    poster_path: undefined,
    genre:[],
    languaje: "Español",
    casting:[],
    director: undefined,
    premiere:undefined,
    trailer:undefined


  }
 
  if (Object.keys(data).length >0){
    movie.id = data.id
    movie.runtime = data.runtime
    movie.original_title= data.original_title
    movie.title = data.title
    movie.overview = data.overview
    movie.production_countries = data.production_countries[0].name
    movie.poster_path = `https://image.tmdb.org/t/p/original${data.poster_path}`
    data.genres.forEach(genre => {movie.genre.push(genre)})
    movie.premiere = data.release_date
  }
  

     result = await await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`,{
        headers: {
            accept: 'application/json',
            Authorization: key
          }
    })
    data = result.data
 
    if (Object.keys(data).length >0){
        for(let index = 0; index <data.cast.length;index++){
            movie.casting.push(data.cast[index].name)
            if(index == 4){
                break;
            }
        }
    }
    let director = data.crew.find(person=> person.known_for_department ==  "Directing")
  
    if (Object.keys(director).length >0){
        movie.director = director.name
    }
   
  

    result = await await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-ES`,{
        headers: {
            accept: 'application/json',
            Authorization: key
          }
    })


    let trailer = result.data.results.find(video=> video.type ==  "Trailer")
  
    if (Object.keys(trailer).length >0){
        movie.trailer = `https://www.youtube.com/embed/${trailer.key}`
    }

    return(movie)
}