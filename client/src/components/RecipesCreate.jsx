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
  

  const [input, setInput] = useState({
    name: '',
    img: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: [],
  });

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = e => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value], //esto me va a ir guardando lo que yo seleccione en el selct
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(input.healthScore)) {
      alert('En el healthScore debe agregar un valor numerico');
      return; 
    }
    if(input.healthScore < 0 || input.healthScore > 100){
      alert('El helthScore debe ser un numero entre 0 y 100');
      return
    }
    if (!input.name || !input.img || !input.summary || !input.healthScore || !input.steps || input.diets.length === 0) {
      alert('Debe completar todos los campos y seleccionar al menos una receta');
      return;
    }
    dispatch(postRecipes(input));
    alert('Receta creada exitosamente');
    setInput({
      name: '',
      img: '',
      summary: '',
      healthScore: '',
      steps: '',
      diets: [],
    });
    history.push('/home');
  };

  const handleDelete = (e)=>{
    setInput({
      ...input,
      diets: input.diets.filter(p => p !== e)
    })
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

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
            className={styles.formInput}
          />
          
        </div>
        <div className={styles.formField}>
          <label htmlFor="img" className={styles.formLabel}>Image:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={e => handleChange(e)}
            placeholder='Url Image...'
            className={styles.formInput}
          />
            
        </div>
        <div className={styles.formField}>
          <label htmlFor="summary" className={styles.formLabel}>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={e => handleChange(e)}
            placeholder='Summary...'
            className={styles.formInput}
          />
            
        </div>
        <div className={styles.formField}>
          <label htmlFor="healthScore" className={styles.formLabel}>HealthScore:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={e => handleChange(e)}
            placeholder='Health Score...'
            className={styles.formInput}
          />
            
        </div>
        <div className={styles.formField}>
          <label htmlFor="steps" className={styles.formLabel}>Steps:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={e => handleChange(e)}
            placeholder='Steps...'
            className={styles.formInput}
          />
            
        </div>
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
