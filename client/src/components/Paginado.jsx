import React from 'react';
import styles from '../styles/paginado.module.css';

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  //decalro mi paginado y me traigo las propiedades del componente HomePage
  const pageNumbers = []; //declero arreglo vacio

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    //voy a recorrer un arreglo que resulta el numero redondo de dividir todos los personajes por los personajes por apgina que yo quiero
    pageNumbers.push(i); //ese numero lo pusheo, de aca resulta un arr de nuemros que tiene que ver con el resultado de arriba
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {pageNumbers &&
          pageNumbers.map(number => {
            //si tengo el arreglo pageNumber, lo mapeo y devolveme por ese arreglo, cada uno de los numeriotos que te devuelve el paginado
            return (
              <li className={styles.item} key={number}>
                <p className={styles.link} onClick={() => paginado(number)}>
                  {number}
                </p>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
