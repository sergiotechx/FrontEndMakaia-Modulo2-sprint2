'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { signal } from "@preact/signals-react";
import { useSearchParams } from 'next/navigation'
import { Button } from '@mantine/core';
import { getGenres } from '@/services/getGenres';
import './page.scss'
import { getTMDBMovieInfo } from '@/services/getTMDBMovieInfo';
import { getMovieById, insertMovie, updateMovie } from '@/services/movieInfo';
import Swal from 'sweetalert2'

const formData = {
  id: undefined,
  original_title: undefined,
  spanish_title: undefined,
  production_countries: undefined,
  languaje: undefined,
  overview: undefined,
  runtime: undefined,
  director: undefined,
  actor1: undefined,
  actor2: undefined,
  actor3: undefined,
  actor4: undefined,
  actor5: undefined,
  genre1: undefined,
  genre2: undefined,
  runtime: undefined,
  director: undefined,
  poster: undefined,
  trailer: undefined,
  poster_path: undefined,
  premiere: undefined,
  active: undefined,
}

const Page = () => {
  const SearchParams = useSearchParams()
  const { register, formState: { errors }, watch, handleSubmit, setValue } = useForm({});
  const [genres, SetGenres] = useState([])
  const [_id, setId] = useState()


  let _new = (SearchParams.get('new') == 'true')
  const id = SearchParams.get('id')

  const loadData = async () => {
    if (genres.length == 0) {
      let temp = await getGenres()
      SetGenres(temp);
    }
    if (!_new) {
      loadMovieDb(id)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const onSubmit = async (data) => {
     
    let casting = []
    casting.push(data.actor1)
    casting.push(data.actor2)
    casting.push(data.actor3)
    casting.push(data.actor4)
    casting.push(data.actor5)
    let genre1 = genres.find(genre => genre.id == data.genre1)
    let genre2 = genres.find(genre => genre.id == data.genre2)
    let genre = []
    genre.push(genre1)
    genre.push(genre2)
    let newData ={ 
        id: data.id,
        original_title: data.original_title,
        spanish_title: data.spanish_title,
        production_countries: data.production_countries,
        languaje: data.languaje,
        overview: data.overview,
        runtime: data.runtime,
        director: data.director,
        casting: casting,
        genre: genre,
        trailer: data.trailer,
        premiere: data.premiere,
        poster_path: data.poster,
        active: data.active
    }
    let operation;

    if(_new){

      operation = await insertMovie(newData)
      if(operation){
        _new= false
        Swal.fire(
          'Operación exitosa',
          'Nueva película ingresada al sistema',
          'success'
        )
      }
      else{
        Swal.fire(
          'Error en el sistema',
          'Favor volver a intentar',
          'error'
        )
      }
      
    }
    else{
      operation = await updateMovie(newData.id,newData )
      if(operation){
          Swal.fire(
          'Operación exitosa',
          'Película  actualizada en el sistema',
          'success'
        )
      }
      else{
        Swal.fire(
          'Error en el sistema',
          'Favor volver a intentar',
          'error'
        )
      }
    }
  }
  const loadMovieDb = async (__id) => {
    let tempData = await getMovieById(__id);
    console.log("desde la BD ", tempData)

    if (Object.keys(tempData).length > 0) {
      setId(tempData.id)
      let tempMovieInfo = {
        id: tempData.id,
        original_title: tempData.original_title,
        spanish_title: tempData.spanish_title,
        production_countries: tempData.production_countries,
        languaje: tempData.languaje,
        overview: tempData.overview,
        runtime: tempData.runtime,
        director: tempData.director,
        actor1: tempData.casting[0],
        actor2: tempData.casting[1],
        actor3: tempData.casting[2],
        actor4: tempData.casting[3],
        actor5: tempData.casting[4],
        genre1: tempData.genre[0].id,
        genre2: tempData.genre[1].id,
        runtime: tempData.runtime,
        director: tempData.director,
        trailer: tempData.trailer,
        premiere: tempData.premiere,
        poster_path: tempData.poster_path,
        active: tempData.active
      }
      setValue('id', tempMovieInfo.id)
      setValue('original_title', tempMovieInfo.original_title)
      setValue('spanish_title', tempMovieInfo.spanish_title)
      setValue('production_countries', tempMovieInfo.production_countries)
      setValue('languaje', tempMovieInfo.languaje)
      setValue('original_title', tempMovieInfo.original_title)
      setValue('overview', tempMovieInfo.overview)
      setValue('runtime', tempMovieInfo.runtime)
      setValue('director', tempMovieInfo.director)
      setValue('actor1', tempMovieInfo.actor1)
      setValue('actor2', tempMovieInfo.actor2)
      setValue('actor3', tempMovieInfo.actor3)
      setValue('actor4', tempMovieInfo.actor4)
      setValue('actor5', tempMovieInfo.actor5)
      setValue('genre1', tempMovieInfo.genre1)
      setValue('genre2', tempMovieInfo.genre2)
      setValue('poster', tempMovieInfo.poster_path)
      setValue('trailer', tempMovieInfo.trailer)
      setValue('premiere', tempMovieInfo.premiere)
      setValue('active', tempMovieInfo.active)

    }

  }
  const loadMovie = async (__id) => {

    let tempData = await getTMDBMovieInfo(__id);
    console.log("la movie", tempData);

    let tempMovieInfo = {
      id: tempData.id,
      original_title: tempData.original_title,
      spanish_title: tempData.title,
      production_countries: tempData.production_countries,
      languaje: tempData.languaje,
      overview: tempData.overview,
      runtime: tempData.runtime,
      director: tempData.director,
      actor1: tempData.casting[0],
      actor2: tempData.casting[1],
      actor3: tempData.casting[2],
      actor4: tempData.casting[3],
      actor5: tempData.casting[4],
      genre1: tempData.genre[0].id,
      genre2: tempData.genre[1].id,
      runtime: tempData.runtime,
      director: tempData.director,
      trailer: tempData.trailer,
      premiere: tempData.premiere,
      poster_path: tempData.poster_path,
      active: true
    }


    setValue('id', tempMovieInfo.id)
    setValue('original_title', tempMovieInfo.original_title)
    setValue('spanish_title', tempMovieInfo.spanish_title)
    setValue('production_countries', tempMovieInfo.production_countries)
    setValue('languaje', tempMovieInfo.languaje)
    setValue('original_title', tempMovieInfo.original_title)
    setValue('overview', tempMovieInfo.overview)
    setValue('runtime', tempMovieInfo.runtime)
    setValue('director', tempMovieInfo.director)
    setValue('actor1', tempMovieInfo.actor1)
    setValue('actor2', tempMovieInfo.actor2)
    setValue('actor3', tempMovieInfo.actor3)
    setValue('actor4', tempMovieInfo.actor4)
    setValue('actor5', tempMovieInfo.actor5)
    setValue('genre1', tempMovieInfo.genre1)
    setValue('genre2', tempMovieInfo.genre2)
    setValue('poster', tempMovieInfo.poster_path)
    setValue('trailer', tempMovieInfo.trailer)
    setValue('premiere', tempMovieInfo.premiere)



  }

  return (

    <div className='MovieC'>
      <h1>Editor de datos</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='MovieC__rowM'>
          <label>Id</label>
          <input type="text"   {...register('id', {
            required: false
          })} onChange={(event) => { setId(event.target.value) }} />

          <Button radius="md" compact onClick={() => loadMovie(_id)}>
            Buscar Película
          </Button>
        </div>

        <label>Título original</label>
        <input type="text" {...register('original_title', {
          required: false,
          maxLength: 50
        })} />


        <label>Título en español</label>
        <input type="text" {...register('spanish_title', {
          required: false,
          maxLength: 50
        })} />


        <label>Producida en</label>
        <input type="text" {...register('production_countries', {
          required: false,
          maxLength: 50
        })} />


        <label>Idioma</label>
        <input type="text" {...register('languaje', {
          required: false,
          maxLength: 50
        })} />


        <label>Sinopsis</label>
        <textarea type="text" {...register('overview', {
          required: false,
          maxLength: 500
        })} />


        <label>Duración minutos</label>
        <div className='MovieC__rowG'>
          <input type="number" {...register('runtime', {
            required: false,
            maxLength: 3
          })} />
        </div>

        <label>Director</label>
        <input type="text" {...register('director', {
          required: false,
          maxLength: 50
        })} />

        <label>Actor 1</label>
        <input type="text" {...register('actor1', {
          required: false,
          maxLength: 50
        })} />

        <label>Actor 2</label>
        <input type="text" {...register('actor2', {
          required: false,
          maxLength: 50
        })} />

        <label>Actor 3</label>
        <input type="text" {...register('actor3', {
          required: false,
          maxLength: 50
        })} />

        <label>Actor 4</label>
        <input type="text" {...register('actor4', {
          required: false,
          maxLength: 50
        })} />

        <label>Actor 5</label>
        <input type="text" {...register('actor5', {
          required: false,
          maxLength: 50
        })} />

        <label>Género 1</label>
        <div className='MovieC__rowG'>
          <select {...register("genre1")}>
            {genres.length > 0 && genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </div>
        <label>Género 2</label>
        <div className='MovieC__rowG'>
          <select {...register("genre2")}>
            {genres.length > 0 && genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
          </select>
        </div>
        <label>Poster</label>
        <input type="text" {...register('poster', {
          required: false,
          maxLength: 255
        })} />

        <label>Trailer</label>
        <input type="text" {...register('trailer', {
          required: false,
          maxLength: 255
        })} />

        <label>Estreno</label>
        <div className='MovieC__rowG'>
          <input type="text" {...register('premiere', {
            required: false,
            maxLength: 50
          })} />
        </div>

        <label>Activo</label>
        <div className='MovieC__rowG'>
          <input type="checkbox" {...register('active', {
            required: false,
            maxLength: 1
          })} />
        </div>
        <div className='MovieC__rowG'>
          <input type="submit" />
        </div>
      </form>







    </div>



  )
}

export default Page