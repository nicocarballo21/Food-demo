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
import styles from "../styles/homePage.module.css"
import Loading from './Loading';

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
    dispatch(getRecipes()); //este dispatch, hace dispatch cuando el componente se monta, y muestre las recipes
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
    <div className={styles.totalContainer}> 
      <div class={styles.container}>
        
        <button
        onClick={e => {
          handleClick(e);
        }}
        class={styles.button}
      >
        Reload the recipes
      </button>
        <Link class={styles.Link} to="/recipes">Create a recipe</Link>
        <SearchBar class={styles.SearchBar} />
      </div>
      
      <h1>HOME FOODS</h1>
      
      <div >
        <select onClick={e => handleSort2(e)}>
          <option value="des">Health Score/des</option>
          <option value="asc">Health Score/asc</option>
        </select>
        <select onClick={e => handleSort(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select onClick={e => handleFilterDiets(e)}>
          <option value="All">All Diets</option>
          <option value="gluten free">Gluten free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="fodmap friendly">Fodmap friendly</option>
          <option value="whole 30">Whole 30</option>
        </select>
        <select onClick={e => handleFilterCreated(e)}>
          <option value="todos">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>

        <Paginado
          recipesPerPage={recipesPerPage} //props
          allRecipes={allRecipes.length} //props
          paginado={paginado} //props
        />
        

        <div className={styles.contenedor}>
          
        {currentRecipes === 0 ? (<Loading />) : (currentRecipes.map(el => {
          //aca no tenemos que tomar a todos los personajes, tenemos que tomar los que nos devuelve el paginado
          if(el.createdInDb){
            return (
              <a key={el.id} href={`/recipes/${el.id}`}>
                <div className={styles.card}>
                  <Card
                  name={el.name}
                  img={el.img}
                  diets={el.Diets.map((e) => e.name)}
                  healthScore={el.healthScore}
                  key={el.id}
                />
                </div>
              </a>
          );
          }
          return (
              <a key={el.id} href={`/recipes/${el.id}`}>
                <div className={styles.card}>
                <Card
                  name={el.name}
                  img={el.img}
                  diets={el.diets}
                  healthScore={el.healthScore}
                  key={el.id}
                />
                </div>
              </a>
          );
        }))}
        </div>
       
      </div>
    </div>
  );

  //VAmos a hcer los filtrado dentro de el segundo div
  //orden alfabetico ascendente y descendente, y por helth score, tipo de dieta, por origen,
}
