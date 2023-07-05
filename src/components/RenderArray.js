import React from 'react'

function RenderArray(arrayToRender) {
  const array= arrayToRender
  const noten = Object.keys(array).map((key) => array[key].note);

  return (
    <div>
      <ul>
        {noten.map((note) => (
          <li>{note}</li>
        ))}
      </ul>
    </div>
  );
}
 export default RenderArray
