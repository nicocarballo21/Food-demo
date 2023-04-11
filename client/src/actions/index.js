import axios from 'axios';

export function getRecipes() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/recipes', {});
    return dispatch({
      type: 'GET_RECIPES',
      payload: json.data,
    });
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: 'GET_NAME_RECIPES',
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDiets() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/diets', {});
    return dispatch({ type: 'GET_DIETS', payload: json.data });
  };
}

export function postRecipes(payload) {
  return async function (dispatch) {
    let json = await axios.post('http://localhost:3001/recipes', payload);
    return json;
  };
}

export function filterRecipesByDiets(payload) {
  return {
    type: 'FILTER_BY_DIETS',
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: 'ORDER_BY_HEALTH_SCORE',
    payload,
  };
}

export async function getDetail(id) {
  try {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
}
