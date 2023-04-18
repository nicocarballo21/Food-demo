import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipes, getDiets } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/recipesCreate.module.css"


export default function RecipesCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector(state => state.diets);
  const allRecipes = useSelector(state => state.allRecipes) //me traigo las recetas para controlar que no hayan repetidas
  const [errors, setErrors] = useState({}) //me creo un estado error para guardar los errores

  const [input, setInput] = useState({
    name: '',
    img: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: [],
  });

  //VALIDATE FUNCTIONS
  const validateFunction = (input) =>{
    let errors = {};

    if(!input.name){
      errors.name = "Name is required"
    } else if(!/^[a-zA-Z]+$/.test(input.name)){
      errors.name = "The name can only contain letters"
    }

    if(!input.img){
      errors.img = "Url image is required"
    } else if(!/^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|png|gif)$/i.test(input.img)){
      errors.img = "You need to enter an image url"
    }

    if(!input.summary){
      errors.summary = "Summary is required"
    }

    if(!input.healthScore){
      errors.healthScore = "Health Score is required"
    } else if (isNaN(input.healthScore)){
      errors.healthScore = "Health Score has to be a number"
    } else if (input.healthScore < 0 || input.healthScore > 100){
      errors.healthScore = "Health Score has to be a number between 0 and 100"
    }
 
    if(!input.steps){
      errors.steps = "Steps is required"
    }

    return errors;
  }


  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

//------------------------------- ---------------------------------

//INPUTS HANDLERS
  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateFunction({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  };

 
  //------------------------- -----------------------------

  const handleSelect = e => {
    if(input.diets.includes(e.target.value)){ //controlamos que no hayan repetidos
      alert("You can't choose the same diets twice")
    } else {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value], //esto me va a ir guardando lo que yo seleccione en el select de las diets
      });
    }
  };

  const handleDelete = (e)=>{
    setInput({
      ...input,
      diets: input.diets.filter(p => p !== e)
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let repitedRecipes = allRecipes.filter((recipe)=> recipe.name === input.name) //guardamos ne la variable, alguna receta que tenga el mismo nombre que la que vamos a crear
    if(repitedRecipes.length !== 0){
      alert("There is already a recipe with that name, please choose another one");
    } else {
      let error = Object.keys(validateFunction(input));
      if(error.length !== 0 || !input.diets.length){
        alert("You must complete all fields correctly and select at least one recipe");
        return;
      } else {
        dispatch(postRecipes(input));
        alert('Recipe created successfully');
        setInput({
          name: '',
          img: '',
          summary: '',
          healthScore: '',
          steps: '',
          diets: [],
        });
        history.push('/home');
      }
    } 
   
  };

  



//------------------------------ ---------------------------

  //RETURN
  

  return (
    <div className={styles.formContainer}>
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
      <h1>Create your Recipe</h1>
      <form onSubmit={e => handleSubmit(e)} >
        <div className={styles.formField}>
          <label htmlFor="name" className={styles.formLabel}>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={e => handleChange(e)}
            placeholder='Name...'
            className={`${styles.formInput} ${errors.name && styles.error}`}
          /> 
          {errors.name && <div className="error">{errors.name}</div>}  

        </div>
        <div className={styles.formField}>
          <label htmlFor="img" className={styles.formLabel}>Image:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={e => handleChange(e)}
            placeholder='Url Image...'
            className={`${styles.formInput} ${errors.img && styles.error}`}
          />
          {errors.img && <div className="error">{errors.img}</div>}

        </div>
        <div className={styles.formField}>
          <label htmlFor="summary" className={styles.formLabel}>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={e => handleChange(e)}
            placeholder='Summary...'
            className={`${styles.formInput} ${errors.summary && styles.error}`}
          />
          {errors.summary && <div className="error">{errors.summary}</div>}

        </div>
        <div className={styles.formField}>
          <label htmlFor="healthScore" className={styles.formLabel}>HealthScore:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={e => handleChange(e)}
            placeholder='Health Score...'
            className={`${styles.formInput} ${errors.healthScore && styles.error}`}
          />
          {errors.healthScore && <div className="error">{errors.healthScore}</div>} 

        </div>
        <div className={styles.formField}>
          <label htmlFor="steps" className={styles.formLabel}>Steps:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={e => handleChange(e)}
            placeholder='Steps...'
            className={`${styles.formInput} ${errors.steps && styles.error}`}
          />
          {errors.steps && <div className="error">{errors.steps}</div>}

        </div>
        <h4>Choose your Diets:</h4>
        <select onChange={e => handleSelect(e)} className={styles.formSelect}>
          {diets?.map(diet => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>

        <br/>
        <button type="submit" className={styles.formButton}>Create Recipe</button>
      </form>
      {input.diets.map(el =>
        <div className='divOcc'>
          <p>{el}</p>
          <button className='botonX' onClick={()=>handleDelete(el)}>x</button>
        </div>)}
    </div>
  );
      }
