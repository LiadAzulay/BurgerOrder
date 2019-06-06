import * as actionType from '../actions/ActionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 1.0,
  cheese: 0.5,
  meat: 2.0,
}
const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  }
  return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      meat: action.ingredients.meat,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
    },
    error: false,
    totalPrice: 0,
    building: false,
  }
  )
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionType.SET_INGREDIENT: return setIngredient(state, action);
    case actionType.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    default: return state;
  }
}

export default reducer;