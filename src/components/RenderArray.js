import React from 'react'

function RenderArray(arrayToRender) {
 return (
  <div>
    {arrayToRender.map((note)=> (
      <div>{note}</div>
    ))}
  </div>
 )
}
export default RenderArray