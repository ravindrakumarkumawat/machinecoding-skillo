import React from 'react'
import './input.css'

const Input = ({ value, onChange }) => {
  return (
    <input value={value} onChange={onChange} placeholder="Join the discussion..."/>
  )
}

export default Input
