import * as actionType from '../actions/ActionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
}

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
}

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
}

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_INIT: return purchaseInit(state, action);
    case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    case actionType.FETCH_ORDERS_START: return fetchOrderStart(state, action);
    case actionType.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    case actionType.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action);
    default: return state;
  }
}

export default reducer;