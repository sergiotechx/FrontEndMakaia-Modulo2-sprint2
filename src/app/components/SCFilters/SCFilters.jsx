'use client'
import { scMovieFilter, scCinemasFilter, scGetMovies, scGetCinemas } from '@/services/movieFilters'
import { Select } from '@mantine/core';
import React, { useEffect, useState } from 'react'



const SCFilters = () => {

    const [movies, setMovies] = useState([])
    const [cinemas, setCinemas] = useState([])

    const loadFiltersData = async () => {

        if (movies.length == 0) {
            let temp = await scGetMovies()
            setMovies(temp)
        }
        if (cinemas.length == 0) {
            let temp = await scGetCinemas()
            setCinemas(temp)
        }
    }

    useEffect(() => {
        loadFiltersData();
    }, [scMovieFilter.value])
   
    useEffect(() => {
        loadFiltersData();
    }, [])

    const setCinema = (data) => {
        scCinemasFilter.value = data;
    }
    const setMovie = (data) => {
        scMovieFilter.value = data;
    }

    return (
        <div className='SCFilters'>
            <div className='SCFilters__Col1'>
                {
                    cinemas != undefined &&
                    <Select clearable
                        label="Seleccione un cinema"
                        placeholder="Centro comercial a elegir"
                        data={cinemas}
                        onChange={(value) => { setCinema(value) }}
                    />
                }
            </div>
            <div className='SCFilters__Col2'>
                {console.log("aja!",scMovieFilter.value)}
                {movies != undefined && <Select clearable
                    label="Seleccione una película"
                    placeholder="Pelicula a seleccionar"
                    data={movies}
                    value={scMovieFilter.value}
                    onChange={(value) => { setMovie(value) }}
                
                />}

            </div>
        </div>
    )
}

export default SCFilters
