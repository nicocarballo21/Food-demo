import React from 'react';
import styles from "../styles/card.module.css"


export default function Card({ name, img, diets, healthScore }) {
  return (
    <div className={styles.container} >
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{name}</h1>
      </div>
      <div className={styles.leftContainer}>
        <img src={img} alt="image not found" width="200px" height="250px" className={styles.image}  />
        <h4 className={styles.healthScore}>Health Score: {healthScore}</h4>
      </div>
      <div className={styles.rightContainer}>
          <h4  className={styles.diets}>Diets: </h4>
          <h5 className={styles.dietsList}>{diets.map(e =>(<ul><li>{e}</li></ul>))}</h5>
        </div>
      
    </div>
  );
}
