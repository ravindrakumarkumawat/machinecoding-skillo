import React from 'react'

const Image = ({ Src, Alt, Width, Height }) => {
  return (
    <img src={Src} alt={Alt} width={Width} height={Height}/> 
  )
}

export default Image
