'use client'
import React, { useEffect, useState } from 'react'
import { Carousel } from '@mantine/carousel';
import { getActiveMoviesData, getMoviesCardsInfo, cardsInfo } from '@/services/activeMoviesData';
import CarouselCard from '@/app/components/CarouselCard/CarouselCard';

const loadData = async () => {
  await getActiveMoviesData();
  await getMoviesCardsInfo();
}

const MoviesCarousel = () => {
  const [cardsInfoSt, setCardsInfoSt] = useState([]);

  useEffect(() => {
    loadData();
  }, [])

 
  return (

    <div className='MoviesCarousel'>


      <Carousel slideSize="10%" height={400} align="start" slideGap="sm" controlsOffset="xs" loop dragFree>
        {cardsInfo.value.length > 0 ?
          cardsInfo.value.map((cardInfo, index) => (<Carousel.Slide key={index} > <CarouselCard  key={index} cardInfo={cardInfo}/></Carousel.Slide>))
          : null
        }
      </Carousel>

    </div>
  )
}

export default MoviesCarousel
