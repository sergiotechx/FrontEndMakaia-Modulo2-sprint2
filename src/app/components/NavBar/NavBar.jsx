'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Select, Avatar, Modal, TextInput, PasswordInput, Button, Menu } from '@mantine/core'
import { getGenres, genres, getNearbyCinemas, nearbyCinemas, getActiveDates, activeDates } from '@/services/navBarInitialData'
import { genresFilter, cinemasFilter, dateFilter } from '@/services/movieFilters'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks';
import Swal from 'sweetalert2';
import { login } from '@/services/login'
import { getSessionStorage, setSessionStorage, deleteSessionStorage } from '@/services/sessionStoraje'
import { signal } from "@preact/signals-react";




const LoadData = async () => {
  await getGenres();
  await getNearbyCinemas();
  await getActiveDates();

}

const setGenre = (event) => {
  genresFilter.value = event

}
const setCinema = (event) => {
  cinemasFilter.value = event

}
const setDate = (event) => {
  console.log(event);
  dateFilter.value = event

}
const session = signal([])
const NavBar = () => {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  useEffect(() => {
    LoadData();
    session.value = getSessionStorage('CineColombia')

  }, [])


  const goHome = () => {
    router.push('/')
  }
  const doLogin = async (event) => {
    event.preventDefault();
    let data = await login(email, password)

    if (data.length == undefined) {
      let response = await Swal.fire({
        title: 'Error!',
        text: 'Credenciales erroneas',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })

    }
    else {
      setSessionStorage("CineColombia", data)
      session.value= data;
      console.log("mongo ",session.value)
      let response = await Swal.fire({
        title: 'Bienvenido',
        text: 'Credenciales correctas',
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
      close()
    }
  }
  return (
    <div className="NavBar">


      <Modal opened={opened} onClose={close} title="Inicio de sesión">
        <TextInput placeholder="nombre@cinecolombia.com"
          label="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          withAsterisk
        />
        <PasswordInput
          placeholder="Ingresa tu contraseña"
          label="Contraseña"
          description="La clavve debe incluir almenos una letra,múmero y un caracter especial"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          withAsterisk
        />
        <Button color="indigo" radius="md" onClick={(event) => { doLogin(event) }}>
          Iniciar sesión
        </Button>
      </Modal>


      <div className="NavBar--slogan" onClick={() => { goHome() }}>
        <Image
          src="/images/logo.png"
          width={25}
          height={25}
          alt="Picture of the author"

        />
        <p>CINE COLOMBIA</p>
      </div>
      <div className="NavBar--operations">
        < Select
          clearable
          label="Género"
          placeholder="Seleccione un género"
          data={genres.value}
          value={genresFilter.value}
          onChange={(value) => { setGenre(value) }}
        />
        < Select
          clearable
          label="Cines cercanos"
          placeholder="Seleccione un cinema"
          data={nearbyCinemas.value}
          value={cinemasFilter.value}
          onChange={(value) => { setCinema(value) }}
        />
        < Select
          clearable
          label="Fecha (día-mes)"
          placeholder="Seleccione una fecha"
          data={activeDates.value}
          value={dateFilter.value}
          onChange={(value) => { setDate(value) }}
        />
       
        {Object.keys(session.value ).length == 0 ?
         (
         <Avatar src="/images/avatar.svg" alt="it's me" onClick={open} />
         )
         :
      <>
        
         <Menu shadow="md" width={200}>
         <Menu.Target>
           <Avatar src={session.value [0].image}  radius="xl" />
         </Menu.Target>
         <Menu.Dropdown>
           <Menu.Item onClick={()=>{router.push(`/admin/main`)}}>Admin</Menu.Item>
           <Menu.Item onClick={()=>{router.push(`/admin/scheduler`)}}>Programación</Menu.Item>
           <Menu.Item  onClick={()=>{deleteSessionStorage("CineColombia");session.value={};router.push(`/`)}}>Cerrar sesión</Menu.Item>
         </Menu.Dropdown>
       </Menu>
       </>
            
           
          

        }



      





      </div>
    </div>

  )
}

export default NavBar
