'use client'
import React from 'react'
import './OnScreenCard.scss'
import { genresFilter, cinemasFilter, dateFilter,scMovieFilter } from '@/services/movieFilters'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useRouter, usePathname } from 'next/navigation'
import { ActionIcon } from '@mantine/core';
import { Edit, Calendar } from 'tabler-icons-react';



const OnScreenCard = ({ card }) => {
  const router = useRouter();
  const currentPath = usePathname().split('/');
  const MovieDetails = () => {
    if (currentPath[1] != 'admin') {
      if (cinemasFilter.value == undefined || dateFilter.value == undefined) {
        Swal.fire({
          title: 'Favor completar datos',
          text: 'Ingresar cine cercano y fecha',
          icon: 'info',
          confirmButtonText: 'Continuar'
        })
      }
      else {
        router.push(`/movieInfo?readonly=false&movie=${card.id}&cinema=${cinemasFilter.value}&date=${dateFilter.value}`)
      }
    }
  }
  const prepareScheduler= ()=>{
    scMovieFilter.value = card.id
    router.push(`/admin/scheduler`)
  }

  return (
    <div className='OnScreenCard' onClick={() => MovieDetails()}>
      <img src={card.poster_path} />
      <div className='CardInfo'>
        <p>{card.spanish_title}</p>
        <p>Título en inglés: {card.original_title}</p>
        <p>Estreno: {card.premiere}</p>
        <p>Generos:  {card.genre.map(item => (<span key={item.id}> {item.name}</span>))}</p>
        <p>Duración: {card.runtime} minutos</p>
        {currentPath[1] == 'admin' &&
          <div className='CardInfo__Actions'>
            <ActionIcon color="dark" radius="md" variant="light" onClick={() => { router.push(`/admin/movie?new=false&id=${card.id}`) }}>
              <Edit size="1.125rem" />
            </ActionIcon>
            <ActionIcon color="dark" radius="md" variant="light" onClick={()=>{prepareScheduler()}}>
              <Calendar size="1.125rem" />
            </ActionIcon>
          </div>}
      </div>
    </div>
  )
}

export default OnScreenCard
