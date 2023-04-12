import React from 'react';


export default function Card({ name, img, diets, healthScore }) {
  return (
    <div>
      <h1>{name}</h1>
      <h5>{diets}</h5>
      <img src={img} alt="image not found" width="200px" height="250px" />
      <h4>Health Score: {healthScore}</h4>
    </div>
  );
}
