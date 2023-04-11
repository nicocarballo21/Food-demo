import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../actions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  //tengo que guardar en mi estado local, lo que vaya llegando al input

  const handleInputChange = e => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getNameRecipes(name));
    setName('');
  };
  //Guardamos lo que tipea el usuario en mi estado local, y le pasamo el valor del estdo local
  //a la funcion (action) geNameRecipes para que le pase el valor al endopoint y el back me devuelva el json.
  //con la data de la receta con ese nombre que le pasamos

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={e => handleInputChange(e)}
      />
      <button type="submit" onClick={e => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
