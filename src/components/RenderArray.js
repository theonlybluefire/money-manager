import React, { lazy, Suspense , useState} from 'react';

function RenderArray(arrayToRender) {
  const array = arrayToRender
  console.log(array)
  return (
    <div>
      <h1>Meine App</h1>
      <Suspense fallback={<div>Lade...</div>}>
        
      </Suspense>
    </div>
  );
}

export default RenderArray;