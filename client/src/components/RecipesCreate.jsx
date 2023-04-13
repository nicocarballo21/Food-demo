import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipes, getDiets } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../styles/RecipesCreate.module.css"

const validate = input => {
    let error = {};
    if (!input.name) {
      error.name = 'Se requiere un nombre';
    } else if (!input.img) {
      error.img = 'Se requiere una imagen';
    } else if (!input.summary) {
      error.summary = 'Se requiere resumen de el plato';
    } else if (input.healthScore > 100 || input.healthScore < 0) {
      error.healthScore = 'El health Score debe ser un numero entre 0 y 100';
    } else if (!input.steps) {
      error.steps = 'Debe completar el campo steps';
    }
    return error;
  };

export default function RecipesCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector(state => state.diets);
  const [error, setError] = useState({}); //estado local para los errores

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
    setError(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
  };

  const handleSelect = e => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value], //esto me va a ir guardando lo que yo seleccione en el selct
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      alert('Complete todos los campos');
      setError(errors);
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
        <button>Volver</button>
      </Link>
      <h1>Crea tu receta</h1>
      <form onSubmit={e => handleSubmit(e)} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="name" className={styles.formLabel}>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={e => handleChange(e)}
            className={styles.formInput}
          />
          {error.name && (
            <p className='error'>{error.name}</p>
          )}
        </div>
        <div className={styles.formField}>
          <label htmlFor="img" className={styles.formLabel}>Image:</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={e => handleChange(e)}
            className={styles.formInput}
          />
            {error.name && (
            <p className='error'>{error.name}</p>
          )}
        </div>
        <div className={styles.formField}>
          <label htmlFor="summary" className={styles.formLabel}>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={e => handleChange(e)}
            className={styles.formInput}
          />
            {error.name && (
            <p className='error'>{error.name}</p>
          )}
        </div>
        <div className={styles.formField}>
          <label htmlFor="healthScore" className={styles.formLabel}>HealScore:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={e => handleChange(e)}
            className={styles.formInput}
          />
            {error.name && (
            <p className='error'>{error.name}</p>
          )}
        </div>
        <div className={styles.formField}>
          <label htmlFor="steps" className={styles.formLabel}>Steps:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={e => handleChange(e)}
            className={styles.formInput}
          />
            {error.name && (
            <p className='error'>{error.name}</p>
          )}
        </div>
        <select onChange={e => handleSelect(e)} className={styles.formSelect}>
          {diets?.map(diet => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select>

        <br/>
        <button type="submit" className={styles.formButton} >Crear Personaje</button>
      </form>
      {input.diets.map(el =>
        <div className='divOcc'>
          <p>{el}</p>
          <button className='botonX' onClick={()=>handleDelete(el)}>x</button>
        </div>)}
    </div>
  );
}
