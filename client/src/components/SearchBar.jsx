import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../actions';
import styles from "../styles/searchbar.module.css"

export default function SearchBar( {setPage} ) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputChange = e => {
    e.preventDefault();
    setName(e.target.value);
    
  };



  const handleSubmit = async (e) => { //la hacemos async para poder decirle que espere que el dispatch termine su ejecucion
    e.preventDefault();
    dispatch(getNameRecipes(name));
    setName('');
    setPage(1)
  };
  //Guardamos lo que tipea el usuario en mi estado local, y le pasamo el valor del estdo local
  //a la funcion (action) geNameRecipes para que le pase el valor al endopoint y el back me devuelva el json.
  //con la data de la receta con ese nombre que le pasamos
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
        type="text"
        placeholder="Buscar..."
        value={name}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button type="submit">Search</button>
      </div>
      
    </form>
  );
}

