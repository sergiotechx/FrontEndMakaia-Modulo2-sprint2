'use client'
import React from 'react'
import './CarouselCard.scss'
import { useRouter } from 'next/navigation'


const CarouselCard = ({ cardInfo }) => {
    const router = useRouter();
    const imageUrl = cardInfo.image
    const divStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(${imageUrl})`,
    };
    const goToMovie = () => {

        router.push(`/movieInfo?readonly=true&movie=${cardInfo.id}`)
    }

    return (

        <div className='CarouselCard' style={divStyle} onClick={() => goToMovie()}>
            <p>{cardInfo.spanish_title}</p>
            <p>Título en inglés: {cardInfo.original_title}</p>
            <p>Estreno: {cardInfo.premiere}</p>
            <p>Género:
                {cardInfo.genre.map(genre => (<span key={genre.id}> {genre.name}</span>))}
            </p>
        </div>
    )
}

export default CarouselCard
