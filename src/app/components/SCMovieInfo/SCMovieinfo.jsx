import React, { useEffect, useState } from 'react'
import { scMovieFilter } from '@/services/movieFilters'
import { getMovieById } from '@/services/movieInfo'


const SCMovieinfo = () => {
    const [movieInfo, setMovieInfo] = useState({})

    const loadMovieData = async (movieId) => {
        if (movieId != null) {
            let temp = await getMovieById(movieId);
            setMovieInfo(temp)
        }
        else {
            setMovieInfo({})
        }
    }
    useEffect(() => {
        loadMovieData(scMovieFilter.value)

    }, [scMovieFilter.value])

    return (

        <div className='SCMovieInfoC'>
            {Object.keys(movieInfo).length > 0 ?
                (
                    <>
                        <p>{movieInfo?.overview}</p>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>Título original</h5>
                            <p>{movieInfo?.original_title}</p>
                        </div>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>País de origen</h5>
                            <p>{movieInfo?.production_countries}</p>
                        </div>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>Título original</h5>
                            <p>{movieInfo?.original_title}</p>
                        </div>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>Director</h5>
                            <p>{movieInfo?.director}</p>
                        </div>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>Actores</h5>
                            {movieInfo?.casting?.map(actor => <span key={actor}>{actor} </span>)}
                        </div>
                        <div className='SCMovieInfoC_Unit'>
                            <h5>Lenguaje</h5>
                            <p>{movieInfo?.languaje}</p>
                        </div>
                    </>
                )
                : null
            }


        </div>
    )
}

export default SCMovieinfo
