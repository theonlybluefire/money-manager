import React from "react";

function RenderArray({ arrayToRender }) {
  console.log(arrayToRender);
  return (
    <div>
      {arrayToRender.map((note) => (
        <div className="user">{note}</div>
      ))}
    </div>
  );
}

export default RenderArray;
