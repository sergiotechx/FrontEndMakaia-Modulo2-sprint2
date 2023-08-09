'use client'
import React, { useEffect, useState } from 'react'
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { Accordion, Button } from '@mantine/core';
import { scMovieFilter, scCinemasFilter } from '@/services/movieFilters'
import { getCinemaSc, rescheduler } from '@/services/cinemaScheduler';
import { ClockHour10, Plus, Database } from 'tabler-icons-react'
import { signal } from "@preact/signals-react";
import Swal from 'sweetalert2'

const data = signal({})

const Scheduler = () => {
    const [scDate, setScDate] = useState(null);
    const [modified, setModified] = useState(false)


    const loadData = async () => {
        if (scDate != null && scMovieFilter.value != null && scCinemasFilter.value != null) {
            let year = scDate.getFullYear()
            let month = scDate.getMonth() + 1
            let day = scDate.getDate()
            let temp = await getCinemaSc(scCinemasFilter.value, scMovieFilter.value, year, month, day)
            data.value = temp
        }
        else {
            data.value = {}
        }

    }
    const changeTime = (index, _data, room) => {
        switch (room) {
            case 'room1':
                data.value.room1[index] = _data
                break
            case 'room2':
                data.value.room2[index] = _data
                break
            case 'room3':
                data.value.room3[index] = _data
                break
            case 'room4':
                data.value.room4[index] = _data
                break
            case 'room5':
                data.value.room5[index] = _data
                break
        }

        setModified(!modified);
    }
    const addTime = (room) => {
        let newTime = '23:59'
        switch (room) {
            case 'room1':
                data.value.room1.push(newTime)
                break
            case 'room2':
                data.value.room2.push(newTime)
                break
            case 'room3':
                data.value.room3.push(newTime)
                break
            case 'room4':
                data.value.room4.push(newTime)
                break
            case 'room5':
                data.value.room5.push(newTime)
                break
        }

        setModified(!modified);


    }

    useEffect(() => {
        loadData()
    }, [scDate, scMovieFilter.value, scCinemasFilter.value])

    const updateSchedule = async () => {
        console.log("Antes de enviar",data.value)
        let result = await rescheduler(data.value)
        
        Swal.fire(
            'Programación exitosa!',
            'Programación de horario efectuado',
            'success'
          )

    }

    return (
        <div className='SCheduler_C'>
            <div className='SCheduler_C_Date'>
                <DatePickerInput
                    clearable
                    defaultValue={new Date()}
                    label="Elegir una fecha de programación"
                    placeholder="Elegir una fecha"
                    mx="auto"
                    maw={400}
                    valueFormat="YYYY MM DD"
                    value={scDate} onChange={setScDate}
                />
            </div>
            <div className='SCheduler_C_Header'>
                {scDate != null && scMovieFilter.value != null && scCinemasFilter.value != null ?
                    <>
                        <Accordion >
                            <Accordion.Item value="Content">
                                <Accordion.Control>Selecciones las funciones del cinema: <h3>{data.value?.cinemaName}</h3> </Accordion.Control>
                                <Accordion.Panel>
                                    <div className='SCheduler_C_Content'>
                                        <div className='SCheduler_C_Content_Row'>
                                            <h3>Sala 1</h3>
                                            <Button variant="outline" radius="xl" compact
                                                rightIcon={<Plus
                                                    size={28}
                                                    strokeWidth={2.5}
                                                    color={'#4088bf'}
                                                />}
                                                onClick={(event) => { addTime("room1") }}
                                            >
                                                Nueva Función
                                            </Button>
                                        </div>
                                        <div className='SCheduler_C_Content_Row2'>
                                            {data.value?.room1?.map((item, index) => {
                                                return (
                                                    <TimeInput

                                                        radius="xl"
                                                        size="xs"
                                                        value={data.value?.room1[index]}
                                                        key={index}
                                                        icon={<ClockHour10 size={16} strokeWidth={2} color={'#d2cc79'} />}
                                                        maw={100}
                                                        mx="16"
                                                        onChange={event => (changeTime(index, event.target.value, "room1"))}

                                                    />
                                                )
                                            })}
                                        </div>
                                        <hr />
                                        <div className='SCheduler_C_Content_Row'>
                                            <h3>Sala 2</h3>
                                            <Button variant="outline" radius="xl" compact
                                                rightIcon={<Plus
                                                    size={28}
                                                    strokeWidth={2.5}
                                                    color={'#4088bf'}
                                                />}
                                                onClick={(event) => { addTime("room2") }}
                                            >
                                                Nueva Función
                                            </Button>
                                        </div>
                                        <div className='SCheduler_C_Content_Row2'>
                                            {data.value?.room2?.map((item, index) => {
                                                return (
                                                    <TimeInput

                                                        radius="xl"
                                                        size="xs"
                                                        value={data.value?.room2[index]}
                                                        key={index}
                                                        icon={<ClockHour10 size={16} strokeWidth={2} color={'#d2cc79'} />}
                                                        maw={100}
                                                        mx="16"
                                                        onChange={event => (changeTime(index, event.target.value, "room2"))}

                                                    />
                                                )
                                            })}
                                        </div>
                                        <hr />
                                        <div className='SCheduler_C_Content_Row'>
                                            <h3>Sala 3</h3>
                                            <Button variant="outline" radius="xl" compact
                                                rightIcon={<Plus
                                                    size={28}
                                                    strokeWidth={2.5}
                                                    color={'#4088bf'}
                                                />}
                                                onClick={(event) => { addTime("room3") }}
                                            >
                                                Nueva Función
                                            </Button>
                                        </div>
                                        <div className='SCheduler_C_Content_Row2'>
                                            {data.value?.room3?.map((item, index) => {
                                                return (
                                                    <TimeInput

                                                        radius="xl"
                                                        size="xs"
                                                        value={data.value?.room3[index]}
                                                        key={index}
                                                        icon={<ClockHour10 size={16} strokeWidth={2} color={'#d2cc79'} />}
                                                        maw={100}
                                                        mx="16"
                                                        onChange={event => (changeTime(index, event.target.value, "room3"))}

                                                    />
                                                )
                                            })}
                                        </div>
                                        <hr />
                                        <div className='SCheduler_C_Content_Row'>
                                            <h3>Sala 4</h3>
                                            <Button variant="outline" radius="xl" compact
                                                rightIcon={<Plus
                                                    size={28}
                                                    strokeWidth={2.5}
                                                    color={'#4088bf'}
                                                />}
                                                onClick={(event) => { addTime("room4") }}
                                            >
                                                Nueva Función
                                            </Button>
                                        </div>
                                        <div className='SCheduler_C_Content_Row2'>
                                            {data.value?.room4?.map((item, index) => {
                                                return (
                                                    <TimeInput

                                                        radius="xl"
                                                        size="xs"
                                                        value={data.value?.room4[index]}
                                                        key={index}
                                                        icon={<ClockHour10 size={16} strokeWidth={2} color={'#d2cc79'} />}
                                                        maw={100}
                                                        mx="16"
                                                        onChange={event => (changeTime(index, event.target.value, "room4"))}

                                                    />
                                                )
                                            })}
                                        </div>
                                        <hr />
                                        <div className='SCheduler_C_Content_Row'>
                                            <h3>Sala 5</h3>
                                            <Button variant="outline" radius="xl" compact
                                                rightIcon={<Plus
                                                    size={28}
                                                    strokeWidth={2.5}
                                                    color={'#4088bf'}
                                                />}
                                                onClick={(event) => { addTime("room5") }}
                                            >
                                                Nueva Función
                                            </Button>
                                        </div>
                                        <div className='SCheduler_C_Content_Row2'>
                                            {data.value?.room5?.map((item, index) => {
                                                return (
                                                    <TimeInput

                                                        radius="xl"
                                                        size="xs"
                                                        value={data.value?.room5[index]}
                                                        key={index}
                                                        icon={<ClockHour10 size={16} strokeWidth={2} color={'#d2cc79'} />}
                                                        maw={100}
                                                        mx="16"
                                                        onChange={event => (changeTime(index, event.target.value, "room5"))}

                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>

                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                        <Button radius="xl" compact
                            leftIcon={<Database
                                size={28}
                                strokeWidth={2.5}
                                color={'#ffffff'}
                            />}
                            onClick={() => { updateSchedule() }}
                        >
                            Grabar cambios
                        </Button>
                    </>
                    : <h2>favor seleccionar un cinema, película y fecha para la programación</h2>}

            </div>
        </div>
    )
}

export default Scheduler
