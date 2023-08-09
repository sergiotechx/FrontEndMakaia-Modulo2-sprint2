'use client'
import './page.scss'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signal } from "@preact/signals-react";
import { getMovieInfo } from '@/services/activeMoviesData';
import MovieHeader from '../components/MovieHeader/MovieHeader';
import Trailer from '../components/Trailer/Trailer';
import Overview from '../components/Overview/Overview';
import { getMoviescheduleByRoom } from '@/services/moviescheduleByRoom';
import RoomHours from '../components/RoomHours/RoomHours';
import { Loader } from '@mantine/core';
import { getCinemaName } from '@/services/cinemaName';
const movieInfo = signal(undefined);
const roomsHours = signal(undefined);
const cinemaName = signal();

const Page = () => {
  const SearchParams = useSearchParams()
  const readonly = SearchParams.get('readonly')
  const movieId = SearchParams.get('movie')
  const cinemaId = SearchParams.get('cinema')
  const date = SearchParams.get('date')



  const loadData = async (movieId) => {
    movieInfo.value = await getMovieInfo(movieId);
    
  }

  const loadCinemaRooms = async (movieId, cinemaId, date) => {
    let temp = await getCinemaName(cinemaId)
    cinemaName.value = temp.name
    roomsHours.value = await getMoviescheduleByRoom(movieId, cinemaId, date)


  }

  useEffect(() => {

    loadData(movieId)
    if (readonly == 'false') {
      loadCinemaRooms(movieId, cinemaId, date)
    }
  }, [movieId,cinemaId, date,readonly])

  return (

    <div className='MovieOverviewContainer'>


      <div className='MovieOverviewContainer_left'>

        {
          movieInfo.value != undefined ?
            (
              <><MovieHeader image={movieInfo.value.poster_path}
                spanish_title={movieInfo.value.spanish_title}
                original_title={movieInfo.value.original_title}
                runtime={movieInfo.value.runtime}
                genre={movieInfo.value.genre} />
                <Trailer url={movieInfo.value.trailer} />
                <Overview overview={movieInfo.value.overview} />
              </>

            )
            :
            <>
              <h1>Cargando</h1>
              <Loader color="indigo" />
            </>

        }




      </div>
      <div className='MovieOverviewContainer_right'>
        {
          readonly == 'false' ?
            (
              <>
                {console.log(movieInfo.value)}
                {roomsHours.value != undefined ? (

                  <RoomHours movieId={movieId} cinemaId={cinemaId} cinemaName={cinemaName.value} date={date} roomHours={roomsHours.value} title={movieInfo.value.spanish_title} />

                ) : <>
                  <h1>Cargando</h1>
                  <Loader color="indigo" />
                </>
                }
              </>
            )
            :
            null
        }
      </div>
    </div>
  )
}

export default Page
