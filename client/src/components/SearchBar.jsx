import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../actions';
import styles from "../styles/searchbar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  // const [hasResults, setHasResults] = useState(true); //seteamos un estado local para ver si existe o no la receta, lo seteamos en true

  //tengo que guardar en mi estado local, lo que vaya llegando al input

  const handleInputChange = e => {
    e.preventDefault();
    setName(e.target.value);
    
  };



  const handleSubmit = async (e) => { //la hacemos async para poder decirle que espere que el dispatch termine su ejecucion
    e.preventDefault();
    /* let resultado = await*/ dispatch(getNameRecipes(name));
    // if (resultado && resultado.length === 0) { //aca le preguntamos, si resultado tiene algo es porque encontro alguna receta con el name que le pasamos, si no tiene nada es porque no encontro nada
    //   setHasResults(false); //
    // } else {
    //   setHasResults(true);
    // }
    setName('');
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

