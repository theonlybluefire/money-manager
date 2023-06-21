import React from 'react'

export const renderArray = (arrayToRender) => {
    const array = arrayToRender
  return (array.map((object) => <li>{object}</li>) 
  )
}
