import React, { useEffect, useState } from 'react'
import { Badge } from '@mantine/core';


const MovieHeader = ({ image, spanish_title, original_title, runtime, genre }) => {
    const [genres, setGenres] = useState('')
    useEffect(() => {
        let temGenre = '';
        genre.map(oneGenre => temGenre = temGenre + ` ${oneGenre.name}`)
        setGenres(temGenre.trim())
    }, [image])

    return (
        <div className='MovieheaderContainer'>
            <div className='Movieheader__image'>
                <img src={image} />
            </div>
            <div className='Movieheader__info'>
                <h5>{spanish_title}</h5>
                <p>{original_title}</p>
                <div className='Movieheader__badge'>
                    <Badge color="gray" size="lg" radius="sm" variant="filled">{runtime} min</Badge>
                    <Badge size="lg" radius="sm" variant="filled">{genres} </Badge>
                </div>
            </div>
        </div>
    )
}

export default MovieHeader



