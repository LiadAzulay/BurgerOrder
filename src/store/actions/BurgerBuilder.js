import * as ActionTypes from './ActionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: ActionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: ActionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: ActionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: ActionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return dispatch => {
   axios.get('https://react-burger-1-1.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      }).catch(err => { 
        dispatch(fetchIngredientsFailed());
       });
  };
};
