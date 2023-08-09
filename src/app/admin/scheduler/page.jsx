'use client'
import React from 'react'
import { signal } from "@preact/signals-react";
import SCFilters from '@/app/components/SCFilters/SCFilters';
import './page.scss'
import SCHeader from '@/app/components/SCHeader/SCHeader';
import SCMovieinfo from './../../components/SCMovieInfo/SCMovieinfo';
import Scheduler from '@/app/components/SCheduler/Scheduler';
const page = () => {
  return (
    <div className='SchedulerC'>
      <SCFilters />
      <SCHeader />
      <div className='SchedulerC_Content'>
        <div className='SchedulerC_Content_Col1'>
          <SCMovieinfo />
        </div>
        <div className='SchedulerC_Content_Col2'>
          <Scheduler/>
        </div>
      </div>

    </div>
  )
}

export default page
