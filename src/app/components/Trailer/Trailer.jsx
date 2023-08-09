'use client'
import React from 'react'

import { AspectRatio } from '@mantine/core';
const Trailer = ({url}) => {
  return (
    
    <div className='Trailer'>
      <h5>Trailer</h5>
    
      <AspectRatio ratio={16 / 9}>
      <iframe
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
    </div>
  )
}

export default Trailer
