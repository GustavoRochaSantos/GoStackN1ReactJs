import React from 'react'


export default function Repository({data, handleRemove}){

  return (
    
    <li >
      {data.title}-{data.id}
      <button onClick={() => handleRemove(data.id)}>
        Remover
      </button>
    </li>
  )
}