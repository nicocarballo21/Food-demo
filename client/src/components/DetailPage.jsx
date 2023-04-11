import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';

export default function DetailPage(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  console.log(id, 'id');

  useEffect(() => {
    const getDetails = async () => {
      console.log('ertmn');
      const data = await getDetail(id);
      console.log(data, 'data caaaaaa');

      dispatch({
        type: 'GET_DETAIL',
        payload: data,
      });
    };

    id && getDetails();
    // dispatch(getDetail(props.match.params.id)); //de esta forma accedo al id de este detalle}
  }, [dispatch, id]);

  const myRecipe = useSelector(state => state.detail);
  console.log(myRecipe, 'sstate');

  return (
    <div>
      {Object.keys(myRecipe).length ? (
        <div>
          <h1>{myRecipe.name}</h1>
          <img
            src={myRecipe.img ? myRecipe.img : myRecipe.image}
            alt=""
            width="500px"
            height="700px"
          />
          <h2>{myRecipe.summary}</h2>
          <h2>Healt Score: {myRecipe.healthScore}</h2>
          <h3>Instructions: {myRecipe.instructions}</h3>
          {myRecipe.createdInDb
            ? myRecipe.Diets.map(e => <h5>{e.name}</h5>)
            : myRecipe.diets.map(el => <h5>{el}</h5>)}
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
