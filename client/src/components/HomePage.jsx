import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; //hooks de react
import { useDispatch, useSelector } from 'react-redux'; //hooks de react-redux
import {
  getRecipes,
  filterRecipesByDiets,
  filterCreated,
  orderByName,
  orderByHealthScore,
} from '../actions'; //actions que voy a usar
import Card from './Card'; //componentes
import SearchBar from './SearchBar';
import Paginado from './Paginado';
import styles from "../styles/HomePage.module.css"

export default function HomePage() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // para el paginado
  const [recipesPerPage, setRecipesPerPage] = useState(9); // 9 recetas por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  ); //recetas que estan en la pagina actual. el slice agarra un arrgelo y toma una porcion dependiendo de los parametros

  const paginado = pageNumber => {
    //esta me ayuda en el renderizado
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRecipes()); //este dispatch, hace dispatch cuando el componente se monta
  }, [dispatch]); //este segundo parametro, es para que no me haga un loop infinito, es de lo que depende que se haga el use effect.

  const handleClick = e => {
    e.preventDefault();
    dispatch(getRecipes());
  };

  const handleFilterDiets = e => {
    //esta funcion es la que paso en el select, y le decimos,
    dispatch(filterRecipesByDiets(e.target.value)); // cuando vos te modifiques ejecutas esta funcion, esta funcion hace dispatch de la accion. y le paso como parametro el value (e.target.value)
  };

  const handleFilterCreated = e => {
    dispatch(filterCreated(e.target.value));
  };

  const handleSort = e => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //
    setOrder(`Ordenado ${e.target.value}`); //
  };

  const handleSort2 = (e) => {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado por health score ${e.target.value}`);
  };
  return (
    <div> 
      <Link  to="/recipes">Crear personaje</Link>
      <h1 >HOME DE FOOD</h1>
      <button
        
        onClick={e => {
          handleClick(e);
        }}
      >
        Volver a cagar todas las recetas
      </button>
      <div >
        <select onClick={e => handleSort2(e)}>
          <option value="des">Health Score/des</option>
          <option value="asc">Health Score/asc</option>
        </select>
        <select onClick={e => handleSort(e)}>
          <option value="asc">ACENDENTE/ABC</option>
          <option value="desc">DESCENDENTE/ABC</option>
        </select>
        <select onClick={e => handleFilterDiets(e)}>
          <option value="All">DIETAS TODAS</option>
          <option value="gluten free">gluten free 1</option>
          <option value="ketogenic">ketogenic 1</option>
          <option value="dairy free">dairy free 1</option>
          <option value="llacto ovo vegetarian">lacto ovo vegetarian 1</option>
          <option value="vegan">vegan 1</option>
          <option value="pescatarian">pescatarian 1</option>
          <option value="paleolithic">paleolithic 1</option>
          <option value="primal">primal 1</option>
          <option value="fodmap friendly">fodmap friendly 1</option>
          <option value="whole 30">whole 30 1</option>
        </select>
        <select onClick={e => handleFilterCreated(e)}>
          <option value="todos">Todos</option>
          <option value="created">Creado</option>
          <option value="api">Existentes</option>
        </select>

        <Paginado
          recipesPerPage={recipesPerPage} //props
          allRecipes={allRecipes.length} //props
          paginado={paginado} //props
        />
        <div >
        <SearchBar />
        </div>

        <div>
        {currentRecipes?.map(el => {
          //aca no tenemos que tomar a todos los personajes, tenemos que tomar los que nos devuelve el paginado
          if(el.createdInDb){
            return (
              <Link key={el.id} to={`/recipes/${el.id}`}>
                <Card
                  name={el.name}
                  img={el.img}
                  diets={el.Diets.map((e) => e.name)}
                  healthScore={el.healthScore}
                  key={el.id}
                />
              </Link>
          );
          }
          return (
              <Link key={el.id} to={`/recipes/${el.id}`}>
                <Card
                  name={el.name}
                  img={el.img}
                  diets={el.diets}
                  healthScore={el.healthScore}
                  key={el.id}
                />
              </Link>
          );
        })}
        </div>
       
      </div>
    </div>
  );

  //VAmos a hcer los filtrado dentro de el segundo div
  //orden alfabetico ascendente y descendente, y por helth score, tipo de dieta, por origen,
}
