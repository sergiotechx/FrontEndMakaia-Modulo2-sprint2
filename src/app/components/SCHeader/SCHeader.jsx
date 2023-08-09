import React, { useEffect, useState } from 'react'

import { scMovieFilter } from '@/services/movieFilters'
import { getMovieById } from '@/services/movieInfo'
import { AspectRatio, Image } from '@mantine/core'
import Trailer from '../Trailer/Trailer'
const SCHeader = () => {
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
        <div className='SCHeaderC'>
            {console.log(movieInfo)}
            {Object.keys(movieInfo).length != 0 ?
                (
                    <div className='SCHeaderC2'>
                        <div className='SCHeaderC2__Col1'>

                            <figure>
                                <img
                                    src={movieInfo?.poster_path}

                                />
                            </figure>

                        </div>
                        <div className='SCHeaderC2__Col2'>

                            <figure>
                                <iframe
                                    src={movieInfo?.trailer}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </figure>

                        </div>



                    </div>
                ) : <h1>Favor seleccionar una película y cinema</h1>}
        </div>
    )
}

export default SCHeader
