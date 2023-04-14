import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import styles from '../styles/detailPage.module.css';


export default function DetailPage(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    const getDetails = async () => {
      const data = await getDetail(id);

      dispatch({
        type: 'GET_DETAIL',
        payload: data,
      });
    };

    id && getDetails();
  }, [dispatch, id]);

  const myRecipe = useSelector(state => state.detail);

  return (
    <div className={styles.container}>
      {Object.keys(myRecipe).length ? (
        <div className={styles.detailsContainer}>
          <div className={styles.titleImageContainer}>
            <h1>{myRecipe.name}</h1>
            <img
              src={myRecipe.img ? myRecipe.img : myRecipe.image}
              alt=""
              className={styles.recipeImage}
            />
            <h2>Healt Score: {myRecipe.healthScore}</h2>
          </div>
          <div className={styles.detailsRigth}>
            <h2>Summary: {myRecipe.summary?.replace(/<\/?[^>]+(>|$)/g, "").replace(/[^\w\s.,]/gi, "")}</h2>
            <h3>Instructions {myRecipe.steps} </h3>
            <div className={styles.dietsContainer}>
              <h3>Diets: {myRecipe.createdInDb
                ? myRecipe.Diets.map(e => <h5>{e.name}</h5>)
                : myRecipe.diets.map(el => <h5>{el}</h5>)}</h3>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
